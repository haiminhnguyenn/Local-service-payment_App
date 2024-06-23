package Webserver.com.myserver.Controller;

import Webserver.com.myserver.HelperFunction.HashFuntion;
import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.HelperObject.BasicReponse;
import Webserver.com.myserver.Model.Admin;
import Webserver.com.myserver.Model.NomalUser;
import Webserver.com.myserver.Model.User;
import Webserver.com.myserver.Util.DataBaseService;
import org.apache.juli.logging.Log;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "*")
public class LoginController {
    private final DataBaseService dataBaseService;
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
    public  LoginController(DataBaseService dataBaseService){
        this.dataBaseService = dataBaseService;
    }
    @PostMapping("/nomalUser")
    String Login(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
        try {
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()){
                throw new RuntimeException("UserId is null");
            }
            String UserPass = RequestBody.get("UserPassword");
            if (UserPass.isEmpty()){
                throw new RuntimeException("UserPass is null");
            }
            List<User> LisUser = dataBaseService.SearchNomalUserById(UserId);
            if (LisUser.size()==1){
                User currentUser =LisUser.get(0);
                if (currentUser.getUserPassword().equals(HashFuntion.hash256(UserPass))){
                    JSONObject LoginResponse = new JSONObject();
                    LoginResponse.put("code","200");
                    LoginResponse.put("message","Success");
                    LoginResponse.put("accessToken", JWTFactory.GenJWT(UserId));
                    logger.info(LoginResponse.toString());
                    return LoginResponse.toString();
                }else{
                    throw new RuntimeException("Invalid Password");
                }
            }else{
                throw new RuntimeException("Invalid UserId");
            }
        }catch (Exception exception){
            BasicReponse basicReponse = new BasicReponse();
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
    }
    @PostMapping("/Root")
    String LoginRoot(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
        try {
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()){
                throw new RuntimeException("UserId is null");
            }
            String UserPass = RequestBody.get("UserPassword");
            if (UserPass.isEmpty()){
                throw new RuntimeException("UserPass is null");
            }
            List<Admin> ListRoot = dataBaseService.SearchRootById(UserId);
            if (ListRoot.size()==1){
                User currentUser =ListRoot.get(0);
                if (currentUser.getUserPassword().equals(HashFuntion.hash256(UserPass))){
                    JSONObject LoginResponse = new JSONObject();
                    LoginResponse.put("code","200");
                    LoginResponse.put("message","Success");
                    LoginResponse.put("accessToken", JWTFactory.GenJWT(UserId));
                    logger.info(LoginResponse.toString());
                    return LoginResponse.toString();
                }else{
                    throw new RuntimeException("Invalid Password");
                }
            }else{
                throw new RuntimeException("Invalid UserId");
            }
        }catch (Exception exception){
            BasicReponse basicReponse = new BasicReponse();
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
    }
}
