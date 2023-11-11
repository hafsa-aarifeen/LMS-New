package project.lms.Student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.lms.Student.dto.StudentDto;
import project.lms.Student.dto.StudentRegistration;
import project.lms.Teacher.Teacher;
import project.lms.Teacher.dto.TeacherDto;
import project.lms.Teacher.dto.TeacherRegistration;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class StudentController {

    @Autowired
    StudentService studentService;

    @PostMapping("/registerStudent")
    private StudentRegistration saveStudent(@RequestBody StudentRegistration student){
        studentService.registerStudent(student);
        return student;
    }
    @GetMapping("/registeredStudents")
    private List<StudentRegistration> getAllStudents(){
        return studentService.getAllRegisteredStudents();
    }

    @GetMapping("/getStudentDetails")
    private List<Student> getStudentCourses(@RequestParam(required = false) String studentId,
                                              @RequestParam(required = false) String courseId, @RequestParam(required = false) String courseName){
        return studentService.getStudentDetails(studentId,courseId,courseName);
    }

    @GetMapping("/getStudent/{studentId}")
    private List<StudentRegistration> getStudentByStudentId(@PathVariable("studentId") String studentId){
        return studentService.getStudentByStudentId(studentId);
    }
    @DeleteMapping("/deleteStudent/{id}/{studentId}")
    private ResponseEntity<Object> deleteRequest(@PathVariable("id") int id,@PathVariable("studentId") String studentId){
        return studentService.deleteStudentById(id,studentId);
    }


    @PostMapping("/assignCoursesForStudents")
    private void AddCourse(@RequestBody StudentDto studentDto){
        studentService.addCourses(studentDto);
    }


}
