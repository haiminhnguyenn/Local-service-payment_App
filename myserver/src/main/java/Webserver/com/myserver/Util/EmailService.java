package Webserver.com.myserver.Util;
import java.io.File;

import jakarta.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private static String sender;

    public  String sendSimpleMail(String receiver, String MsgBody, String subject) {

        try {

            SimpleMailMessage mailMessage
                    = new SimpleMailMessage();

            mailMessage.setFrom(sender);
            mailMessage.setTo(receiver);
            mailMessage.setText(MsgBody);
            mailMessage.setSubject(subject);

            javaMailSender.send(mailMessage);
            return "200";
        } catch (Exception e) {
            return "500";
        }
    }



}

