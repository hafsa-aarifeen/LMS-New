package project.lms.Attendance;

import com.fasterxml.jackson.annotation.JsonFormat;
import project.lms.Attendance.Dto.AttendedStudent;
import project.lms.Courses.dto.CoursesDto;
import project.lms.Courses.dto.Units;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class AttendanceDto {

    private String courseId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate date;

    private List<AttendedStudent> students = new ArrayList<>();
    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }


    public String getCourseId() {
        return courseId;
    }


    public LocalDate getDate() {
        return date;
    }

    public List<AttendedStudent> getStudents() {
        return students;
    }

    public void setStudents(List<AttendedStudent> students) {
        this.students = students;
    }
}
