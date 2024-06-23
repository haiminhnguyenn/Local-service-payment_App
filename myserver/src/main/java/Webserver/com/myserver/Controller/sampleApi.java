package Webserver.com.myserver.Controller;
import Webserver.com.myserver.Util.EmailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class sampleApi {
    private final EmailService emailService;
    public sampleApi(EmailService emailService){
        this.emailService= emailService;
    }
    @GetMapping("/hello")
    public String hello()
    {
        return emailService.sendSimpleMail("trankhiem2003@gmail.com","hello","Support");
    }
}