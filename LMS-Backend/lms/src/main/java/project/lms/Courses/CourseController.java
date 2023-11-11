package project.lms.Courses;


import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project.lms.Courses.dto.CoursesDto;
import project.lms.Courses.dto.PdfFile;
import project.lms.Courses.dto.PdfFileRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CourseController {

    @Autowired
    CourseService courseService;
    @Autowired
    private PdfFileRepository pdfFileRepository;

    @PostMapping("/saveCourse")
    private CoursesDto saveCourse(@RequestBody CoursesDto coursesDto){
        courseService.saveCourse(coursesDto);
        return coursesDto;
    }

    @GetMapping("/getCourse")
    private List<Courses> getAllCourse(@RequestParam(required = false) String courseId){
        return courseService.getAllCourse(courseId);
    }
    @PostMapping("/api/upload")
    public PdfFile handleFileUpload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("courseId") String courseId,@RequestParam("unitName") String unitName) {return courseService.savePdf(file,courseId, unitName);
    }

    @GetMapping("/api/download/{id}")
    public ResponseEntity<Resource> downloadPdf(@PathVariable Long id) {
        return courseService.downloadPdfWithId(id);
        // Retrieve the PdfFile entity from the database using the provided ID

    }

    @GetMapping("/api/files/course/{courseId}")
    public ResponseEntity<Object> getFilesByCourseId(@PathVariable String courseId) {
        return courseService.getPdfWithCourseId(courseId);
    }
}
