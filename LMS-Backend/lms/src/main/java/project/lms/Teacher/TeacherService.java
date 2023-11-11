package project.lms.Teacher;

import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import project.lms.Student.dto.StudentRegistration;
import project.lms.Teacher.dto.TeacherRegistration;
import project.lms.Teacher.dto.RegistrationRepository;
import project.lms.Teacher.dto.TeacherDto;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class TeacherService {
    @Autowired
    TeacherRepository teacherRepository;

    @Autowired
    RegistrationRepository registrationRepository;

    public void addCourses(TeacherDto teacherDto) {
        List<Teacher> newList = new ArrayList<>();
        teacherDto.getCourses().forEach(c->{
                    Teacher teacherobj = new Teacher();
                    teacherobj.setName(teacherDto.getName());
                    teacherobj.setPassword(teacherDto.getPassword());
                    teacherobj.setTeacherId(teacherDto.getTeacherId());
                    teacherobj.setEmail(teacherDto.getEmail());
                    teacherobj.setGrade(c.getGrade());
                    teacherobj.setCourseName(c.getCourseName());
                    teacherobj.setCourseDescription(c.getCourseDescription());
                    teacherobj.setGrade(c.getGrade());
                    teacherobj.setCourseId(c.getCourseId());
                    newList.add(teacherobj);
        });
        teacherRepository.saveAll(newList);
    }

    public List<Teacher> getTeacher(String name, String email, String grade) {
        List<Teacher> teacher = new ArrayList<>();
        teacherRepository.findAll(Specification.where(teacherNameEquals(name)).and(teacherEmailEquals(email)).and(teacherGradeEquals(grade))).forEach(updated -> teacher.add((Teacher) updated));
        return teacher;
    }


    public Optional<Teacher> getTeacherById(int id) {
        Optional<Teacher> teacher = teacherRepository.findById(id);
        return teacher;
    }

    private Specification<Teacher> teacherNameEquals(final String name) {
        return StringUtils.isEmpty(name) ? null : (root, query, builder) -> builder.equal(root.get("name"), name);
    }
    private Specification<Teacher> teacherEmailEquals(final String email) {
        return StringUtils.isEmpty(email) ? null : (root, query, builder) -> builder.equal(root.get("email"), email);
    }
    private Specification<Teacher> teacherGradeEquals(final String grade) {
        return StringUtils.isEmpty(grade) ? null : (root, query, builder) -> builder.equal(root.get("grade"), grade);
    }

    public void registerTeacher(TeacherRegistration teacherRegistration) {
         registrationRepository.save(teacherRegistration);
    }



    public List<TeacherRegistration> getTeacherByTeacherId(String teacherId) {
        List<TeacherRegistration> teacher = new ArrayList<>();
        registrationRepository.findAll(Specification.where(teacherIdEqualsForRegistration(teacherId))).forEach(updated -> teacher.add((TeacherRegistration) updated));
        return teacher;
    }

    private Specification<Teacher> teacherIdEquals(final String teacherId) {
        return StringUtils.isEmpty(teacherId) ? null : (root, query, builder) -> builder.equal(root.get("teacherId"), teacherId);
    }

    private Specification<TeacherRegistration> teacherIdEqualsForRegistration(final String teacherId) {
        return StringUtils.isEmpty(teacherId) ? null : (root, query, builder) -> builder.equal(root.get("teacherId"), teacherId);
    }

    public List<Teacher> getTeacherCourses(String teacherId) {
        List<Teacher> teacher = new ArrayList<>();
        teacherRepository.findAll(Specification.where(teacherIdEquals(teacherId))).forEach(updated -> teacher.add((Teacher) updated));
        return teacher;
    }

    public List<TeacherRegistration> getAllRegisteredTeachers() {
        return registrationRepository.findAll();
    }

    public ResponseEntity<Object> deleteTeacherById(int id) {
        try {
            //check if employee exist in database
            Optional<TeacherRegistration> teacher= registrationRepository.findById(id);
            if (teacher != null) {
                registrationRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}