package project.lms.Student.dto;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentRegistration {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String studentName;

    private String studentId;

    private String email;

    private String password;

    private String role;

    private String phonenumber;

}
