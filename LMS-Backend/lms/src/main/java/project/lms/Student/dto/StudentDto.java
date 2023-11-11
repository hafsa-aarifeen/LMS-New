package project.lms.Student.dto;

import project.lms.Courses.Courses;
import project.lms.Courses.dto.CoursesDto;

import java.util.ArrayList;
import java.util.List;

public class StudentDto {
    private String studentName;

    private String studentId;

    private String email;

    private String password;

    private List<CoursesDto> courses = new ArrayList<>();

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCourses(List<CoursesDto> courses) {
        this.courses = courses;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentId() {
        return studentId;
    }

    public List<CoursesDto> getCourses() {
        return courses;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getStudentName() {
        return studentName;
    }
}
