package project.lms.Admin;

import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import project.lms.Teacher.Teacher;
import project.lms.Teacher.TeacherRepository;
import project.lms.Teacher.dto.TeacherRegistration;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    AdminRepository adminRepository;
    public void registerAdmin(Admin registerAdmin) {
        adminRepository.save(registerAdmin);
    }

    public List<Admin> getAllRegisteredAdmins() {
        return adminRepository.findAll();
    }


    public ResponseEntity<Object> deleteAdminById(int id) {
        try {
            //check if employee exist in database
            Optional<Admin> teacher= adminRepository.findById(id);
            if (teacher != null) {
                adminRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public List<Admin> getAdminByName(String name) {
        List<Admin> teacher = new ArrayList<>();
        adminRepository.findAll(Specification.where(adminNameEquals(name))).forEach(updated -> teacher.add((Admin) updated));
        return teacher;
    }

    private Specification<Admin> adminNameEquals(final String name) {
        return StringUtils.isEmpty(name) ? null : (root, query, builder) -> builder.equal(root.get("name"), name);
    }
}
