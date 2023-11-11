package project.lms.Registration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class RegistrationController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationDTO userRegistrationDTO) {
        try {
            userService.registerUser(userRegistrationDTO);
            return ResponseEntity.ok("Confirmation email sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to register user");
        }
    }
    @GetMapping("/confirm-email/{email}")
    public ResponseEntity<String> confirmEmail(@PathVariable String email) {
        if (userService.confirmEmail(email)) {
            return ResponseEntity.ok("Email confirmed successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}