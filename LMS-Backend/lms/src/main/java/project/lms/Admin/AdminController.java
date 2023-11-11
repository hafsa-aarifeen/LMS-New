package project.lms.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.lms.Teacher.Teacher;
import project.lms.Teacher.dto.TeacherRegistration;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AdminController {

    @Autowired
    AdminService adminService;

    @PostMapping("/registerAdmin")
    private void registerAdmin(@RequestBody Admin registerAdmin){
        adminService.registerAdmin(registerAdmin);
    }

    @GetMapping("/registeredAdmins")
    private List<Admin> getAllRegisteredAdmins(){
        return adminService.getAllRegisteredAdmins();
    }

    @DeleteMapping("/deleteAdmin/{id}")
    private ResponseEntity<Object> deleteRequest(@PathVariable("id") int id){
        return adminService.deleteAdminById(id);
    }

    @GetMapping("/filteradmin")
    private List<Admin> getAdminByName(
            @RequestParam(required = false) String name

    ) {
        return adminService.getAdminByName( name );
    }
}
