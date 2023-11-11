package project.lms.Teacher;


import jakarta.persistence.*;
import lombok.*;
import project.lms.Courses.Courses;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Teacher {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column
    private String name;

    @Column
    private String email;

    @Column
    private String qualification;

    private String password;

    private String courseName;

    private String courseId;

    private String courseDescription;

    private String grade;

    private String unitName;

    private String teacherId;

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public String getTeacherId() {
        return teacherId;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getCourseName() {
        return courseName;
    }

    public String getGrade() {
        return grade;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }



    public String getQualification() {
        return qualification;
    }

    public String getEmail() {
        return email;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }



    public void setEmail(String email) {
            this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

}
