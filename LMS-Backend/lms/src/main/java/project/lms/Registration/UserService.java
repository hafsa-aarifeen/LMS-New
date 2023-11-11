package project.lms.Registration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    private JavaMailSender javaMailSender;

    public void registerUser(UserRegistrationDTO userRegistrationDTO) {
        // Create a new user entity and save it to the database with the "confirmed" flag set to false
        People people = new People();
        people.setEmail(userRegistrationDTO.getEmail());
        people.setConfirmed(false);
        userRepo.save(people);

        // Send the confirmation email
        sendConfirmationEmail(people.getEmail());
    }

    private void sendConfirmationEmail(String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Confirm Your Email Address");
        message.setText("Click the following link to confirm your email: http://your-frontend-url/confirm-email/" + email);
        javaMailSender.send(message);
    }

    public boolean confirmEmail(String email) {
        People people = userRepo.findByEmail(email);
        if (people != null) {
            people.setConfirmed(true);
            userRepo.save(people);
            return true;
        }
        return false;
    }
}