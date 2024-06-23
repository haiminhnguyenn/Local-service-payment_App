package Webserver.com.myserver.Controller;

import Webserver.com.myserver.HelperFunction.HashFuntion;
import Webserver.com.myserver.HelperFunction.IDgenerator;
import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.HelperFunction.TOTPGenerator;
import Webserver.com.myserver.HelperObject.BasicReponse;
import Webserver.com.myserver.Util.DataBaseService;
import Webserver.com.myserver.Util.EmailService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/api/ForgetPass")
@CrossOrigin(origins = "*")
public class ForgetPassController {
    private final DataBaseService dataBaseService;
    private final EmailService emailService;
    private static final Logger logger = LoggerFactory.getLogger(ForgetPassController.class);
    public ForgetPassController(DataBaseService dataBaseService, EmailService emailService) {
        this.dataBaseService = dataBaseService;
        this.emailService = emailService;
    }
    @PostMapping("/RequestOTP")
    public String RequestOTP(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
        BasicReponse basicReponse = new BasicReponse();
        try {

            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()) {
                throw new RuntimeException("UserId is null");
            }
            if (dataBaseService.IsNomalUser(UserId)) {
                String otp = TOTPGenerator.generateTOTP(UserId);
                String EmailStatus = emailService.sendSimpleMail("trankhiem2003@gmail.com","your otp is : "+ otp,"Forget Password Support");
                if (EmailStatus.equals("500")){
                    throw new RuntimeException("Fail to send email");
                }
                basicReponse.setMessage("Success");
                basicReponse.setCode("200");
                logger.info(basicReponse.toString());
                return basicReponse.toString();
            } else {
                throw new RuntimeException("Invalid UserId");
            }
        } catch (Exception exception) {

            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
    }
    @PostMapping("/VerifyOTP")
    public String VerifyOTPRequest(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
        BasicReponse basicReponse = new BasicReponse();
        try {
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()) {
                throw new RuntimeException("UserId is null");
            }
            String Otp= RequestBody.get("Otp");
            if(Otp.isEmpty()){
                throw new RuntimeException("Otp is null");
            }
            if (dataBaseService.IsNomalUser(UserId)) {
                if (TOTPGenerator.verifyTOTP(UserId,Otp)){
                    basicReponse.setCode("200");
                    basicReponse.setMessage("Success");
                    String newPass = IDgenerator.GenPass(6);
                    dataBaseService.UpdateNomalUserPass(HashFuntion.hash256(newPass),UserId);
                    String EmailStatus = emailService.sendSimpleMail("trankhiem2003@gmail.com","your password is : "+ newPass,"Forget Password Support");
                    if (EmailStatus.equals("500")){
                        throw new RuntimeException("Error Sending Email");
                    }
                    logger.info(basicReponse.toString());
                    return basicReponse.toString();
                }else {

                    throw new RuntimeException("Invalid Otp");
                }
            } else {
                throw new RuntimeException("Invalid UserId");
            }
        } catch (Exception exception) {
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
    }

}
