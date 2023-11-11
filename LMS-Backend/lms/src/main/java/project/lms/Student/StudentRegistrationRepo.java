package project.lms.Student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import project.lms.Student.dto.StudentRegistration;

public interface StudentRegistrationRepo  extends JpaRepository<StudentRegistration,Integer>, JpaSpecificationExecutor<StudentRegistration> {
}
