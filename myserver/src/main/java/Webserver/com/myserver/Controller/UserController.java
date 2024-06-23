package Webserver.com.myserver.Controller;
import Webserver.com.myserver.HelperFunction.HashFuntion;
import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.HelperObject.BasicReponse;
import Webserver.com.myserver.HelperObject.UserInfo;
import Webserver.com.myserver.Model.Admin;
import Webserver.com.myserver.Util.DataBaseService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {
    private final  DataBaseService dataBaseService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    public UserController(DataBaseService dataBaseService){
        this.dataBaseService=dataBaseService;
    }
    @PostMapping ("/addUser")
    String AddNewUser(@RequestBody HashMap<String,String> RequestBody){

        logger.info(RequestBody.toString());
        BasicReponse basicReponse = new BasicReponse();
        try {
            String rootId = RequestBody.get("RootId");
            if (rootId.isEmpty()){
                throw new RuntimeException("RootId is null");
            }
            String accessToken = RequestBody.get("accessToken");
            if (accessToken.isEmpty()){
                throw new RuntimeException("AccessToken is null");
            }
            String UserName = RequestBody.get("UserName");
            if (UserName.isEmpty()){
                throw new RuntimeException("UserName is null");
            }
            String UserId =RequestBody.get("UserId");
            if (UserId.isEmpty()){
                throw new RuntimeException("UserId is null");
            }
            if (dataBaseService.IsNomalUser(UserId)){
                throw new RuntimeException("UserId is existed");
            }
            String FamilyId = RequestBody.get("FamilyId");
            if (FamilyId.isEmpty()){
                throw new RuntimeException("FamilyId is null");
            }
            if(!dataBaseService.IsExistedFamily(FamilyId)){
                throw new RuntimeException("Invalid FamilyId");
            }
            if (!dataBaseService.IsRoot(rootId)){
                throw new RuntimeException("Invalid RootId");
            }
            String PhoneNumber = RequestBody.get("PhoneNumber");
            String dateofBirth = RequestBody.get("dateOfBirth");
            if (dateofBirth.isEmpty()){
                throw new RuntimeException("datofBirth is null");
            }
            if (PhoneNumber.isEmpty()){
                throw new RuntimeException("PhoneNumner is null");
            }
            if (JWTFactory.VerifyJWT(rootId,accessToken)){
                dataBaseService.addUserToDataBase(UserName, HashFuntion.hash256("mypass"), UserId);
                dataBaseService.updateUserInfo(UserId,FamilyId,PhoneNumber,dateofBirth);
                basicReponse.setMessage("Success");
                basicReponse.setCode("200");
                logger.info(basicReponse.toString());
                return basicReponse.toString();
        }else{
                throw new RuntimeException("Invalid JWT");
            }
    }catch (Exception exception){
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
}
   @PostMapping("/GetListUser")
    String GetListUser(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
       try {
           String UserId = RequestBody.get("UserId");
           if (UserId.isEmpty()){
               throw new RuntimeException("UserId is null");
           }
           String AccessToken = RequestBody.get("accessToken");
           if (AccessToken.isEmpty()){
               throw new RuntimeException("AccessToken is null");
           }
           if (!dataBaseService.IsRoot(UserId)){
               throw new RuntimeException("Invalid RootId");
           }
           if (JWTFactory.VerifyJWT(UserId,AccessToken) ){
               JSONObject jsonReponse = new JSONObject();
               jsonReponse.put("code","200");
               jsonReponse.put("message","Success");
               jsonReponse.put("data",dataBaseService.GetListUserInfo());
               return jsonReponse.toString();
           }else {
               throw new RuntimeException("Invalid JWT");
           }

       }catch (Exception exception){
           BasicReponse basicReponse= new BasicReponse();
           basicReponse.setCode("500");
           basicReponse.setMessage(exception.getMessage());
           logger.info(basicReponse.toString());
           return basicReponse.toString();
       }

   }
    @PostMapping("/GetUserInfo")
    String GetUserInfo(@RequestBody HashMap<String,String> RequestBody){
       try {
           String UserId = RequestBody.get("UserId");
           if (UserId.isEmpty()){
               throw new RuntimeException("UserId is null");
           }
           if (!dataBaseService.IsNomalUser(UserId)){
               throw new RuntimeException("Invalid UserId");
           }
           String AccessToken = RequestBody.get("accessToken");
           if (AccessToken.isEmpty()){
               throw new RuntimeException("AccessToken is null");
           }
           if (JWTFactory.VerifyJWT(UserId,AccessToken)){
                    JSONObject jsonReponse = new JSONObject();
                    jsonReponse.put("code","200");
                    jsonReponse.put("message","Success");
                    jsonReponse.put("data",dataBaseService.GetListUserInfoById(UserId));
                    logger.info(jsonReponse.toString());
                    return jsonReponse.toString();

           }else{
               throw new RuntimeException("Invalid JWT");
           }
       }catch (Exception exception){
           BasicReponse basicReponse = new BasicReponse();
           basicReponse.setCode("500");
           basicReponse.setMessage(exception.getMessage());
           return basicReponse.toString();
       }
    }

    @PostMapping("/GetUserInfoByFamilyId")
    String GetUserInfoById(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
        try {
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()){
                throw new RuntimeException("UserId is null");
            }
            if (!dataBaseService.IsNomalUser(UserId)){
                throw new RuntimeException("Invalid UserId");
            }
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()){
                throw new RuntimeException("AccessToken is null");
            }
            List<UserInfo> userInfos = dataBaseService.GetListUserInfoById(UserId);
            if (JWTFactory.VerifyJWT(UserId,AccessToken)  && userInfos.size()==1){
                String familyId = userInfos.get(0).getFamilyId();
                if (!dataBaseService.IsExistedFamily(familyId)){
                    throw new RuntimeException("Error in database");
                }
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("code","200");
                jsonResponse.put("message","Success");
                jsonResponse.put("data",dataBaseService.GetListUserInfoByFamilyId(familyId));
                logger.info(jsonResponse.toString());
                return jsonResponse.toString();
            }else{
                throw new RuntimeException("Invalid JWT");
            }
        }catch (Exception exception){
            BasicReponse basicReponse = new BasicReponse();
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            return basicReponse.toString();
        }

    }
    @PostMapping("/UpdateUserInfo")
    String UpdateNomalUserInfo(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
        BasicReponse basicReponse = new BasicReponse();
        try{
            String RootId = RequestBody.get("RootId");
            if (RootId.isEmpty()){
                throw new RuntimeException("RootId is null");
            }
            if (!dataBaseService.IsRoot(RootId)){
                throw new RuntimeException("Invalid RootId");
            }
            String RootPassword = RequestBody.get("RootPassword");
            if (RootPassword.isEmpty()){
                throw  new RuntimeException("RootPassword is null");
            }
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()){
                throw new RuntimeException("UserId is null");
            }
            if (!dataBaseService.IsNomalUser(UserId)){
                throw new RuntimeException("Invalid UserId");
            }
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()){
                throw new RuntimeException("AccessToken is null");
            }

            String FamilyId = RequestBody.get("FamilyId");
            if (FamilyId.isEmpty()){
                throw new RuntimeException("FamilyId is null");
            }
            if (!dataBaseService.IsExistedFamily(FamilyId)){
                throw new RuntimeException("Invalid FamilyId");
            }
            String PhoneNumber = RequestBody.get("PhoneNumber");
            if (PhoneNumber.isEmpty()){
                throw new RuntimeException("PhoneNumber is null");
            }
            String dateOfBirth = RequestBody.get("dateOfBirth");
            if (dateOfBirth.isEmpty()){
                throw new RuntimeException("dateOfBirth is null");
            }
            List<Admin> ListRoot = dataBaseService.SearchRootById(RootId);
            if (ListRoot.size()==1){
                if (!ListRoot.get(0).getUserPassword().equals(HashFuntion.hash256(RootPassword))){
                    throw new RuntimeException("Invalid RootPassword");
                }
            }else{
                throw new RuntimeException("Invalid RootId");
            }
            if (JWTFactory.VerifyJWT(RootId,AccessToken)){
                dataBaseService.updateUserInfo(UserId,FamilyId,PhoneNumber,dateOfBirth);
                basicReponse.setCode("200");
                basicReponse.setMessage("Success");
                logger.info(basicReponse.toString());

                return basicReponse.toString();
            }else{
                throw new RuntimeException("Invalid JWT");
            }
        }catch (Exception exception){
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return  basicReponse.toString();
        }
    }
    @PostMapping("/DeleteUser")
    String DeleteUser(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
        BasicReponse basicReponse = new BasicReponse();
        try{
            String RootId = RequestBody.get("RootId");
            if (RootId.isEmpty()){
                throw new RuntimeException("RootId is null");
            }
            if (!dataBaseService.IsRoot(RootId)){
                throw new RuntimeException("Invalid RootId");
            }
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()){
                throw new RuntimeException("UserId is null");
            }
            if (!dataBaseService.IsNomalUser(UserId)){
                throw new RuntimeException("Invalid UserId");
            }
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()){
                throw new RuntimeException("AccessToken is null");
            }
            String RootPassword = RequestBody.get("RootPassword");
            if (RootPassword.isEmpty()){
                throw  new RuntimeException("RootPassword is null");
            }
            List<Admin> ListRoot = dataBaseService.SearchRootById(RootId);
            if (ListRoot.size()==1){
                if (!ListRoot.get(0).getUserPassword().equals(HashFuntion.hash256(RootPassword))){
                    throw new RuntimeException("Invalid RootPassword");
                }
            }else{
                throw new RuntimeException("Invalid RootId");
            }
            if (JWTFactory.VerifyJWT(RootId,AccessToken)){
                dataBaseService.DeleteUserById(UserId);
                basicReponse.setCode("200");
                basicReponse.setMessage("Success");
                logger.info(basicReponse.toString());
                return basicReponse.toString();
            }else{
                throw new RuntimeException("Invalid JWT");
            }
        }catch (Exception exception){
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return  basicReponse.toString();
        }
    }

}
