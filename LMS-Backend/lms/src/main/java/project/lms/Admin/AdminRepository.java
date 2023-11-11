package project.lms.Admin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import project.lms.Teacher.Teacher;

public interface AdminRepository extends JpaRepository<Admin,Integer>, JpaSpecificationExecutor<Admin> {
}
