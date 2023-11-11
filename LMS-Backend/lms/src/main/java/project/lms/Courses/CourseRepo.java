package project.lms.Courses;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CourseRepo extends JpaRepository<Courses,Integer>, JpaSpecificationExecutor<Courses> {
}
