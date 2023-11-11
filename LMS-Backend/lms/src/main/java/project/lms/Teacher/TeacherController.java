package project.lms.Teacher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.lms.Student.dto.StudentRegistration;
import project.lms.Teacher.dto.TeacherRegistration;
import project.lms.Teacher.dto.TeacherDto;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TeacherController {

    @Autowired
    TeacherService teacherService;

    @PostMapping("/assignCoursesForTeacher")
    private void AddCourse(@RequestBody TeacherDto teacherDto){teacherService.addCourses(teacherDto);}

    @GetMapping("/registeredTeachers")
    private List<TeacherRegistration> getAllRegisteredTeachers(){
        return teacherService.getAllRegisteredTeachers();
    }


    @PostMapping("/registerTeacher")
    private void registerTeacher(@RequestBody TeacherRegistration teacherRegistration){
        teacherService.registerTeacher(teacherRegistration);
    }

    @GetMapping("/teacher")
    private List<Teacher> getTeacher(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String grade

    ) {
        return teacherService.getTeacher( name, email,grade );
    }
    @GetMapping("/teacher/{id}")
    private Optional<Teacher> getTeacher(@PathVariable("id") int id){
        return teacherService.getTeacherById(id);
    }

    @GetMapping("/getTeacher/{teacherId}")
    private List<TeacherRegistration> getTeacherByTeacherId(@PathVariable("teacherId") String teacherId){
        return teacherService.getTeacherByTeacherId(teacherId);
    }

    @GetMapping("/getTeacherCourses/{teacherId}")
    private List<Teacher> getTeacherCourses(@PathVariable("teacherId") String teacherId){
        return teacherService.getTeacherCourses(teacherId);
    }

    @DeleteMapping("/deleteTeacher/{id}")
    private ResponseEntity<Object> deleteRequest(@PathVariable("id") int id){
        return teacherService.deleteTeacherById(id);
    }

}
