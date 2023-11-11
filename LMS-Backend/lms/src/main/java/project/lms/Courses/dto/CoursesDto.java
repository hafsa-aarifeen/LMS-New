package project.lms.Courses.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.ArrayList;
import java.util.List;

public class CoursesDto {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String courseName;

    private String courseDescription;

    private String grade;

    private String courseId;

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourseId() {
        return courseId;
    }

    private List<Units> units = new ArrayList<>();

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public void setUnits(List<Units> units) {
        this.units = units;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCourseName() {
        return courseName;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public String getGrade() {
        return grade;
    }

    public int getId() {
        return id;
    }

    public List<Units> getUnits() {
        return units;
    }

}
