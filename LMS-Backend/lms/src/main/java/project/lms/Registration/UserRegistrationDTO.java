package project.lms.Registration;

import jakarta.persistence.*;
import lombok.*;


public class UserRegistrationDTO {


    private String email;

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }
}
