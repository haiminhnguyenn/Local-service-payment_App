package Webserver.com.myserver.Controller;
import Webserver.com.myserver.HelperFunction.HashFuntion;
import Webserver.com.myserver.HelperFunction.IDgenerator;
import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.HelperObject.BasicReponse;
import Webserver.com.myserver.Model.Admin;
import Webserver.com.myserver.Model.Bill;
import Webserver.com.myserver.Util.DataBaseService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/api/Fee")
@CrossOrigin(origins = "*")
public class FeeController {
    private final DataBaseService dataBaseService;
    private static final Logger logger = LoggerFactory.getLogger(FeeController.class);

    public FeeController(DataBaseService dataBaseService) {
        this.dataBaseService = dataBaseService;
    }

    @PostMapping("/addNewFee")
    String AddNewFee(@RequestBody HashMap<String, String> RequestBody) {
        logger.info(RequestBody.toString());
        BasicReponse basicReponse = new BasicReponse();
        try {
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()) {
                throw new RuntimeException("AccessToken is null");
            }
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()) {
                throw new RuntimeException("UserId is null");
            }

            String isRequired = RequestBody.get("isRequired");
            if(isRequired.isEmpty()){
                throw new RuntimeException("IsRequired is null");
            }
            String FeeName = RequestBody.get("FeeName");
            if (FeeName.isEmpty()) {
                throw new RuntimeException("FeeName is null");
            }
            String FeeId = RequestBody.get("FeeId");
            if (FeeId.isEmpty()) {
                FeeId = IDgenerator.GenId(FeeName);
                while (dataBaseService.IsExistedFee(FeeId)){
                    FeeId = IDgenerator.GenId(FeeName);
                }
            }
            if (dataBaseService.IsExistedFee(FeeId)){
                throw new RuntimeException("Invalid FeeId");
            }
            String dateCreate = RequestBody.get("DateCreate");
            if (dateCreate.isEmpty()) {
                throw new RuntimeException("dateCreate is null");
            }
            String detail = RequestBody.get("Detail");

            if (JWTFactory.VerifyJWT(UserId, AccessToken) && dataBaseService.IsRoot(UserId) && !dataBaseService.IsExistedFee(FeeId)) {
                dataBaseService.InsertNewFee(FeeName,FeeId,dateCreate,detail,Integer.valueOf(isRequired));
                basicReponse.setMessage("Success");
                basicReponse.setCode("200");
                logger.info(basicReponse.toString());
                return basicReponse.toString();
            } else {
                throw new RuntimeException("Invalid JWT");
            }
        } catch (Exception exception) {

            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
    }
    @PostMapping("/Delete")
    public String DeleteFeeById(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
        BasicReponse basicReponse = new BasicReponse();
        try {
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()) {
                throw new RuntimeException("AccessToken is null");
            }
            String RootId = RequestBody.get("RootId");
            if (RootId.isEmpty()) {
                throw new RuntimeException("RootId is null");
            }
            if (!dataBaseService.IsRoot(RootId)){
                throw new RuntimeException("Invalid RootId");
            }
            String FeeId = RequestBody.get("FeeId");
            if (FeeId.isEmpty()) {
                throw new RuntimeException("FeeId is null");
            }
            if(!dataBaseService.IsExistedFee(FeeId)){
                throw new RuntimeException("FeeId is not exist");
            }
            String RootPassword = RequestBody.get("RootPassword");
            if (RootPassword.isEmpty()){
                throw  new RuntimeException("RootPassword is null");
            }
            if (!dataBaseService.CheckValidRootPass(RootId,RootPassword)){
                throw new RuntimeException("Invalid Password");
            }
            if (!dataBaseService.CheckIfFeeCanDelete(FeeId)){
                throw new RuntimeException("Cannot delete this fee");
            }
            if (JWTFactory.VerifyJWT(RootId, AccessToken)) {
                dataBaseService.DeleteFeeById(FeeId);
                basicReponse.setCode("200");
                basicReponse.setMessage("Success");
                logger.info(basicReponse.toString());
                return basicReponse.toString();
            } else {
                throw new RuntimeException("Invalid JWT");
            }
        } catch (Exception exception) {

            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }

    }

    @PostMapping("/getListFee")
    String GetListFee(@RequestBody HashMap<String, String> RequestBody) {
        logger.info(RequestBody.toString());
        try {
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()) {
                throw new RuntimeException("AccessToken is null");
            }
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()) {
                throw new RuntimeException("UserId is null");
            }
            if (JWTFactory.VerifyJWT(UserId, AccessToken) && (dataBaseService.IsRoot(UserId))|| dataBaseService.IsNomalUser(UserId)) {
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("code", "200");
                jsonResponse.put("message", "Success");
                jsonResponse.put("data", dataBaseService.GetListFee());
                logger.info(jsonResponse.toString());
                return jsonResponse.toString();
            } else {
                throw new RuntimeException("Invalid JWT");
            }

        } catch (Exception exception) {
            BasicReponse basicReponse = new BasicReponse();
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
    }

    @PostMapping("/getListFee/Complete")
    String GetListFeeComplete(@RequestBody HashMap<String, String> RequestBody) {
        logger.info(RequestBody.toString());
        try {
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()) {
                throw new RuntimeException("AccessToken is null");
            }
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()) {
                throw new RuntimeException("UserId is null");
            }
            if (!dataBaseService.IsNomalUser(UserId)){
                throw new RuntimeException("Invalid UserId");
            }
            if (JWTFactory.VerifyJWT(UserId, AccessToken)) {
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("code", "200");
                jsonResponse.put("message", "Success");
                jsonResponse.put("data", dataBaseService.GetListFeeCompleteUser(UserId));
                logger.info(jsonResponse.toString());
                return jsonResponse.toString();
            } else {
                throw new RuntimeException("Invalid JWT");
            }

        } catch (Exception exception) {
            BasicReponse basicReponse = new BasicReponse();
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
    }
    @PostMapping("/getListFee/NotComplete")
    String GetListFeeNotComplete(@RequestBody HashMap<String, String> RequestBody) {
        logger.info(RequestBody.toString());
        try {
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()) {
                throw new RuntimeException("AccessToken is null");
            }
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()) {
                throw new RuntimeException("UserId is null");
            }
            if (!dataBaseService.IsNomalUser(UserId)){
                throw new RuntimeException("Invalid UserId");
            }
            if (JWTFactory.VerifyJWT(UserId, AccessToken)) {
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("code", "200");
                jsonResponse.put("message", "Success");
                jsonResponse.put("data", dataBaseService.GetListFeeNotCompleteUser(UserId));
                logger.info(jsonResponse.toString());
                return jsonResponse.toString();
            } else {
                throw new RuntimeException("Invalid JWT");
            }

        } catch (Exception exception) {
            BasicReponse basicReponse = new BasicReponse();
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
    }

    @PostMapping("/getListFee/Required")
    String GetListFeeRequired(@RequestBody HashMap<String, String> RequestBody) {
        logger.info(RequestBody.toString());
        try {
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()) {
                throw new RuntimeException("AccessToken is null");
            }
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()) {
                throw new RuntimeException("UserId is null");
            }
            if (JWTFactory.VerifyJWT(UserId, AccessToken) && ((dataBaseService.IsRoot(UserId))|| dataBaseService.IsNomalUser(UserId))) {
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("code", "200");
                jsonResponse.put("message", "Success");
                jsonResponse.put("data", dataBaseService.GetListFeeRequired());
                logger.info(jsonResponse.toString());
                return jsonResponse.toString();
            } else {
                throw new RuntimeException("Invalid JWT");
            }

        } catch (Exception exception) {
            BasicReponse basicReponse = new BasicReponse();
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
    }

    @PostMapping("/getListFee/NotRequired")
    String GetListFeeNotRequired(@RequestBody HashMap<String, String> RequestBody) {
        logger.info(RequestBody.toString());
        try {
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()) {
                throw new RuntimeException("AccessToken is null");
            }
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()) {
                throw new RuntimeException("UserId is null");
            }
            if (JWTFactory.VerifyJWT(UserId, AccessToken) && (dataBaseService.IsRoot(UserId) || dataBaseService.IsNomalUser(UserId))) {
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("code", "200");
                jsonResponse.put("message", "Success");
                jsonResponse.put("data", dataBaseService.GetListFeeNotRequired());
                logger.info(jsonResponse.toString());
                return jsonResponse.toString();
            } else {
                throw new RuntimeException("Invalid JWT");
            }

        } catch (Exception exception) {
            BasicReponse basicReponse = new BasicReponse();
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
    }





}