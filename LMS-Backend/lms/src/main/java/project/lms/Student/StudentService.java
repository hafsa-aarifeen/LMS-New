package project.lms.Student;

import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import project.lms.Student.dto.StudentDto;
import project.lms.Student.dto.StudentRegistration;
import project.lms.Teacher.Teacher;
import project.lms.Teacher.dto.TeacherRegistration;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    StudentRegistrationRepo studentRegistrationRepo;
    @Autowired
    private StudentRepo studentRepo;


    public void registerStudent(StudentRegistration student) {
        studentRegistrationRepo.save(student);
    }

    public List<StudentRegistration> getAllRegisteredStudents() {
//        List<StudentRegistration> poRequests = new ArrayList<>();
//        studentRegistrationRepo.findAll(Specification.<StudentRegistration>where(studentNameEquals(studentName))).forEach(updated -> poRequests.add((StudentRegistration) updated));
//        return poRequests;
       return studentRegistrationRepo.findAll();
    }
    private Specification<StudentRegistration> studentNameEquals(final String studentName) {
        return StringUtils.isEmpty(studentName) ? null : (root, query, builder) -> builder.equal(root.get("studentName"), studentName);
    }

    public List<Student> getStudentDetails(String studentId, String courseId, String courseName) {
        List<Student> student = new ArrayList<>();
        studentRepo.findAll(Specification.where(studentIdEquals(studentId)).and(courseIdEquals(courseId)).and(courseNamEquals(courseName))).forEach(updated -> student.add((Student) updated));
        return student;
    }

    private Specification<Student> studentIdEquals(final String studentId) {
        return StringUtils.isEmpty(studentId) ? null : (root, query, builder) -> builder.equal(root.get("studentId"), studentId);
    }
    private Specification<Student> courseIdEquals(final String courseId) {
        return StringUtils.isEmpty(courseId) ? null : (root, query, builder) -> builder.equal(root.get("courseId"), courseId);
    }
    private Specification<Student> courseNamEquals(final String courseName) {
        return StringUtils.isEmpty(courseName) ? null : (root, query, builder) -> builder.equal(root.get("courseName"), courseName);
    }

    public List<StudentRegistration> getStudentByStudentId(String studentId) {
        List<StudentRegistration> student = new ArrayList<>();
        studentRegistrationRepo.findAll(Specification.where(studentIdEqualsForRegistration(studentId))).forEach(updated -> student.add((StudentRegistration) updated));
        return student;
    }

    private Specification<StudentRegistration> studentIdEqualsForRegistration(final String studentId) {
        return StringUtils.isEmpty(studentId) ? null : (root, query, builder) -> builder.equal(root.get("studentId"), studentId);
    }

    public void addCourses(StudentDto studentDto) {
        List<Student> newList = new ArrayList<>();
        studentDto.getCourses().forEach(c->{
            Student studentObj = new Student();
            studentObj.setStudentId(studentDto.getStudentId());
            studentObj.setPassword(studentDto.getPassword());
            studentObj.setStudentName(studentDto.getStudentName());
            studentObj.setEmail(studentDto.getEmail());
            studentObj.setCourseId(c.getCourseId());
            studentObj.setCourseName(c.getCourseName());
            studentObj.setCourseDescription(c.getCourseDescription());
            newList.add(studentObj);
        });
        studentRepo.saveAll(newList);
    }

    public ResponseEntity<Object> deleteStudentById(int id,String studentId) {
        try {
            List<Student> studentCourseDetails = new ArrayList<>();
            studentRepo.findAll(Specification.where(studentIdEquals(studentId))).forEach(updated -> studentCourseDetails.add((Student) updated));
            studentCourseDetails.forEach((s)->{
                studentRepo.deleteById(s.getId());
            });

            //check if student exist in database
            Optional<StudentRegistration> student = studentRegistrationRepo.findById(id);
            if (student != null) {
                studentRegistrationRepo.deleteById(id);
                return new ResponseEntity<>(HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
