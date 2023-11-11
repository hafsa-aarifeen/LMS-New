package project.lms.Courses.dto;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PdfFileRepository extends JpaRepository<PdfFile, Long> {
    List<PdfFile> findByCourseId(String courseId);
}
