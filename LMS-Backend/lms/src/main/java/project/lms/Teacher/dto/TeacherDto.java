package project.lms.Teacher.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import project.lms.Courses.Courses;
import project.lms.Courses.dto.CoursesDto;

import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeacherDto {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column
    private String name;

    @Column
    private String teacherId;

    @Column
    private String email;

    @Column
    private String qualification;

    private String password;

    private String grade;



    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }


        private List<CoursesDto> courses = new ArrayList<>();


    public void setId(int id) {
        this.id = id;
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public void setName(String name) {
        this.name = name;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public int getId() {
        return id;
    }

    public List<CoursesDto> getCourses() {
        return courses;
    }

    public void setCourses(List<CoursesDto> courses) {
        this.courses = courses;
    }


    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getQualification() {
        return qualification;
    }
}
