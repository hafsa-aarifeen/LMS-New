package project.lms.Teacher.dto;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeacherRegistration {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column
    private String name;

    private String teacherId;

    @Column
    private String email;

    @Column
    private String qualification;

    private String password;

    private String role;

    private String location;

    public void setId(int id) {
        this.id = id;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTeacherId() {
        return teacherId;
    }

    public String getPassword() {
        return password;
    }

    public int getId() {
        return id;
    }

    public String getQualification() {
        return qualification;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

}
