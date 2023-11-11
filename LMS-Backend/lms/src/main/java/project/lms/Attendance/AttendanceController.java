package project.lms.Attendance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.lms.Student.dto.StudentRegistration;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AttendanceController {


    @Autowired
    AttendanceService attendanceService;

    @PostMapping("/markAttendance")
    private void markAttendance(@RequestBody AttendanceDto attendanceDto){
        attendanceService.markAttendance(attendanceDto);
    }

    @GetMapping("/getAttendance")
    private List<Attendance> getAttendance(@RequestParam(required = false) String studentId,@RequestParam(required = false) String courseId){
        return attendanceService.getAttendance(studentId,courseId);
    }

}
