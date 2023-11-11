package project.lms.Courses.dto;// PdfFile.java - Entity Class

import jakarta.persistence.*;


@Entity
public class PdfFile {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String filePath;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private long fileSize;

    private String courseId;

    private String unitName;

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public String getUnitName() {
        return unitName;
    }

    public String getCourseId() {
        return courseId;
    }



    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public PdfFile() {
    }

    public void setId(Long id) {
        this.id = id;
    }



    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public void setFileSize(long fileSize) {
        this.fileSize = fileSize;
    }

    public long getFileSize() {
        return fileSize;
    }

    public Long getId() {
        return id;
    }



    public String getFileName() {
        return fileName;
    }

    public String getFilePath() {
        return filePath;
    }

}
