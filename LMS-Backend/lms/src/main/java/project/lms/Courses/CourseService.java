package project.lms.Courses;

import io.micrometer.common.util.StringUtils;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import project.lms.Courses.dto.CoursesDto;
import project.lms.Courses.dto.PdfFile;
import project.lms.Courses.dto.PdfFileRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class CourseService {
    @Autowired
    CourseRepo courseRepo;

    @Autowired
    PdfFileRepository pdfFileRepository;
    public void saveCourse(CoursesDto coursesDto) {
//        courseRepo.save(courses);
        List<Courses> newList = new ArrayList<>();
        coursesDto.getUnits().forEach(u->{
            u.getPdfFile().forEach(p->{
                Courses coursesObj = new Courses();
                coursesObj.setCourseId(coursesDto.getCourseId());
                coursesObj.setCourseDescription(coursesDto.getCourseDescription());
                coursesObj.setCourseName(coursesDto.getCourseName());
                coursesObj.setGrade(coursesDto.getGrade());
                coursesObj.setUnitName(u.getUnitName());
                coursesObj.setFileName(p.getFileName());
                coursesObj.setFilePath(p.getFilePath());
                coursesObj.setFileSize(p.getFileSize());
                coursesObj.setCourseId(coursesDto.getCourseId());
                newList.add(coursesObj);
            });
        });
        courseRepo.saveAll(newList);
    }


    public List<Courses> getAllCourse(String courseId) {
        List<Courses> poRequests = new ArrayList<Courses>();
        courseRepo.findAll(Specification.where(courseIdEquals(courseId))).forEach(updated -> poRequests.add((Courses) updated));
        return poRequests;
    }
    private Specification<Courses> courseIdEquals(final String courseId) {
        return StringUtils.isEmpty(courseId) ? null : (root, query, builder) -> builder.equal(root.get("courseId"), courseId);
    }

    private Specification<Courses> courseNameEquals(final String courseName) {
        return StringUtils.isEmpty(courseName) ? null : (root, query, builder) -> builder.equal(root.get("courseName"), courseName);
    }

    public PdfFile savePdf(MultipartFile file, String courseId, String unitName) {
        // Save the file to a directory on the server's file system
        String filePath = "/home/althaf/Desktop/" + file.getOriginalFilename();
        try {
            file.transferTo(new File(filePath));
        } catch (IOException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving the file.");
        }

        // Create and save the PdfFile entity to the database
        PdfFile pdfFile = new PdfFile();
        pdfFile.setFilePath(filePath);
        pdfFile.setFileName(file.getOriginalFilename());
        pdfFile.setFileSize(file.getSize());
        pdfFile.setCourseId(courseId);
        pdfFile.setUnitName(unitName);
       return  pdfFileRepository.save(pdfFile);
    }

    public ResponseEntity<Resource> downloadPdfWithId(Long id) {
        PdfFile pdfFile = pdfFileRepository.findById(id).orElse(null);
        if (pdfFile == null) {
            return ResponseEntity.notFound().build();
        }

        // Get the file path from the PdfFile entity
        String filePath = pdfFile.getFilePath();

        // Create a Resource representing the PDF file
        Resource resource;
        try {
            Path path = Paths.get(filePath);
            resource = (Resource) new UrlResource(path.toUri());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        // Set the Content-Disposition header to "attachment" to trigger a download
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + pdfFile.getFileName() + "\"")
                .body(resource);
    }

    public ResponseEntity<Object> getPdfWithCourseId(String courseId) {
        // Retrieve the PdfFiles from the database that match the provided courseId
        List<PdfFile> pdfFiles = pdfFileRepository.findByCourseId(courseId);
        if (pdfFiles.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(pdfFiles);
    }
}
