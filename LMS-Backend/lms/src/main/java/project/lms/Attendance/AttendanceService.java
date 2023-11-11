package project.lms.Attendance;

import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import project.lms.Student.dto.StudentRegistration;
import project.lms.Teacher.Teacher;

import java.util.ArrayList;
import java.util.List;


@Service
public class AttendanceService {

    @Autowired
    AttendanceRepository attendanceRepository;
    public void markAttendance(AttendanceDto attendanceDto) {
        List<Attendance> attendances = new ArrayList<>();
        attendanceDto.getStudents().forEach(e->{
            Attendance attendanceObj = new Attendance();
            attendanceObj.setCourseId(attendanceDto.getCourseId());
            attendanceObj.setDate(attendanceDto.getDate());
            attendanceObj.setStudentId(e.getStudentId());
            attendances.add(attendanceObj);
        });
        attendanceRepository.saveAll(attendances);
    }

    public List<Attendance> getAttendance(String studentId, String courseId) {
        List<Attendance> attendances = new ArrayList<>();
        attendanceRepository.findAll(Specification.where(studentIdEquals(studentId)).and(courseIdEquals(courseId))).forEach(updated -> attendances.add((Attendance) updated));
        return attendances;
    }

    private Specification<Attendance> studentIdEquals(final String studentId) {
        return StringUtils.isEmpty(studentId) ? null : (root, query, builder) -> builder.equal(root.get("studentId"), studentId);
    }
    private Specification<Attendance> courseIdEquals(final String courseID) {
        return StringUtils.isEmpty(courseID) ? null : (root, query, builder) -> builder.equal(root.get("courseID"), courseID);
    }
}
