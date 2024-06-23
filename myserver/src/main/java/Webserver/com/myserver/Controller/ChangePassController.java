package Webserver.com.myserver.Controller;
import Webserver.com.myserver.HelperFunction.HashFuntion;
import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.HelperObject.BasicReponse;
import Webserver.com.myserver.Model.Admin;
import Webserver.com.myserver.Model.User;
import Webserver.com.myserver.Util.DataBaseService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/changePass")
@CrossOrigin(origins = "*")
public class ChangePassController {
    private final DataBaseService dataBaseService;
    private static final Logger logger = LoggerFactory.getLogger(ChangePassController.class);
    public  ChangePassController(DataBaseService dataBaseService){
        this.dataBaseService=dataBaseService;
    }
    @PostMapping("/nomalUser")
    String Login(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
        BasicReponse basicReponse = new BasicReponse();
        try {
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()){
                throw  new RuntimeException("UserId is null");
            }
            String NewUserPass = RequestBody.get("NewPassword");
            if (NewUserPass.isEmpty()){
                throw  new RuntimeException("NewPassword is null");
            }
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()){
                throw  new RuntimeException("AccessToken is null");
            }
            String OldUserPass = RequestBody.get("OldPassword");
            if (OldUserPass.isEmpty()){
                throw new RuntimeException("OldPassword is null");
            }
            if (OldUserPass.equals(NewUserPass)){
                throw new RuntimeException("Invalid NewPassword");
            }
            List<User> LisUser = dataBaseService.SearchNomalUserById(UserId);
            if (LisUser.size()==1 && JWTFactory.VerifyJWT(UserId, AccessToken)){
                User currentUser =LisUser.get(0);
                if (currentUser.getUserPassword().equals(HashFuntion.hash256(OldUserPass))){
                    dataBaseService.UpdateNomalUserPass(HashFuntion.hash256(NewUserPass),UserId);
                    basicReponse.setCode("200");
                    basicReponse.setMessage("Success");
                    logger.info(basicReponse.toString());
                    return basicReponse.toString();
                }else{
                    throw new RuntimeException("Invalid Password");
                }
            }else {
                throw new RuntimeException("Invalid JWT");
            }
        }catch (Exception e){
            basicReponse.setCode("500");
            basicReponse.setMessage(e.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
    }
    @PostMapping("/Root")
    public String ChangeRootPass(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
        BasicReponse basicReponse = new BasicReponse();
        try {
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()){
                throw  new RuntimeException("UserId is null");
            }
            String NewUserPass = RequestBody.get("NewPassword");
            if (NewUserPass.isEmpty()){
                throw  new RuntimeException("NewPassword is null");
            }
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()){
                throw  new RuntimeException("AccessToken is null");
            }
            String OldUserPass = RequestBody.get("OldPassword");
            if (OldUserPass.isEmpty()){
                throw new RuntimeException("OldPassword is null");
            }
            if (OldUserPass.equals(NewUserPass)){
                throw new RuntimeException("Invalid NewPassword");
            }
            List<Admin> ListRoot = dataBaseService.SearchRootById(UserId);
            if (ListRoot.size()==1 && JWTFactory.VerifyJWT(UserId, AccessToken)){
                Admin currentRoot = ListRoot.get(0);
                if (currentRoot.getUserPassword().equals(HashFuntion.hash256(OldUserPass))){
                    dataBaseService.UpdatePassRoot(UserId,HashFuntion.hash256(NewUserPass));
                    basicReponse.setCode("200");
                    basicReponse.setMessage("Success");
                    logger.info(basicReponse.toString());
                    return basicReponse.toString();
                }else{
                    throw new RuntimeException("Invalid Password");
                }
            }else {
                throw new RuntimeException("Invalid JWT");
            }
        }catch (Exception e){
            basicReponse.setCode("500");
            basicReponse.setMessage(e.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }

    }

}
