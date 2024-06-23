package Webserver.com.myserver.Controller;
import Webserver.com.myserver.Config.ServerProperties;
import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.HelperObject.BasicReponse;
import Webserver.com.myserver.HelperObject.UserInfo;
import Webserver.com.myserver.Util.DataBaseService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/Bill")
@CrossOrigin(origins = "*")
public class BillController {
    private final DataBaseService dataBaseService;
    private final ServerProperties serverProperties;
    private static final Logger logger = LoggerFactory.getLogger(BillController.class);
    public BillController(DataBaseService dataBaseService,ServerProperties serverProperties) {
        this.dataBaseService = dataBaseService;
        this.serverProperties = serverProperties;
    }

    @PostMapping("/Add")
    public String AddNewBill(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
        BasicReponse basicReponse = new BasicReponse();
        try {
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()) {
                throw new RuntimeException("AccessToken is null");
            }
            String RootId = RequestBody.get("RootId");
            if (RootId.length() < serverProperties.getMinLengthUserId() || RootId.length() > serverProperties.getMaxLengthUserId()) {
                throw new RuntimeException("RootId is null");
            }
            String FeeId = RequestBody.get("FeeId");
            if (FeeId.isEmpty()) {
                throw new RuntimeException("FeeId is null");
            }
            String date = RequestBody.get("Date");
            if (date.isEmpty()) {
                throw new RuntimeException("date is null");
            }
            String detail = RequestBody.get("Detail");
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()){
                throw new RuntimeException("UserId is null");
            }
            String money = RequestBody.get("Money");
            if(money.isEmpty()){
                throw new RuntimeException("Money is null");
            }
            if (!dataBaseService.IsNomalUser(UserId)){
                throw new RuntimeException("Invalid UserId");
            }
            if (!dataBaseService.IsExistedFee(FeeId)){
                throw new RuntimeException("Invalid FeeId");
            }
            if (!dataBaseService.IsRoot(RootId)){
                throw new RuntimeException("Invalid RootId");
            }
            String FamilyId = RequestBody.get("FamilyId");
            if(FamilyId.isEmpty()){
                throw new RuntimeException("FamilyId is null");
            }
            if (!dataBaseService.IsExistedFamily(FamilyId)){
                throw new RuntimeException("Invalid FamilyId");
            }
            String BillId = FeeId+"_"+FamilyId;
            if (dataBaseService.IsExistedBill(BillId)){
                throw new RuntimeException("Invalid BillId");
            }
            if (JWTFactory.VerifyJWT(RootId,AccessToken)) {
                dataBaseService.InsertNewBill(BillId,FeeId,FamilyId,UserId,Integer.valueOf(money),date,detail);
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
    @PostMapping("/GetListAll")
    public String GetListAllBill(@RequestBody HashMap<String,String> RequestBody){
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
            if (JWTFactory.VerifyJWT(RootId,AccessToken)) {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("code","200");
                jsonObject.put("message","Success");
                jsonObject.put("data",dataBaseService.GetListBill());
                logger.info(jsonObject.toString());
                return jsonObject.toString();
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
    @PostMapping("/GetListByFeeId")
    public String GetListBillByFeeId(@RequestBody HashMap<String,String> RequestBody){
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
            if (FeeId.isEmpty()){
                throw new RuntimeException("FeeId is null");
            }
            if(!dataBaseService.IsExistedFee(FeeId)){
                throw new RuntimeException("Invalid FeeId");
            }
            if (JWTFactory.VerifyJWT(RootId,AccessToken)) {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("code","200");
                jsonObject.put("message","Success");
                jsonObject.put("data",dataBaseService.GetListBillByFeeId(FeeId));
                logger.info(jsonObject.toString());
                return jsonObject.toString();
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

    @PostMapping("/GetListByUserId/User")
    public String GetListBillByUserIdUser(@RequestBody HashMap<String,String> RequestBody){
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
            if(!dataBaseService.IsNomalUser(UserId)){
                throw new RuntimeException("Invalid UserId");
            }

            if (JWTFactory.VerifyJWT(UserId,AccessToken)) {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("code","200");
                jsonObject.put("message","Success");
                jsonObject.put("data",dataBaseService.GetListBillByUserId(UserId));
                logger.info(jsonObject.toString());
                return jsonObject.toString();
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
    @PostMapping("/GetListByUserId/Root")
    public String GetListBillByUserIdRoot(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
        BasicReponse basicReponse = new BasicReponse();
        try {
            String RootId = RequestBody.get("RootId");
            if(RootId.isEmpty()){
                throw new RuntimeException("RootId is null");
            }
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()) {
                throw new RuntimeException("AccessToken is null");
            }
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()) {
                throw new RuntimeException("UserId is null");
            }
            if(!dataBaseService.IsNomalUser(UserId)){
                throw new RuntimeException("Invalid UserId");
            }
            if(!dataBaseService.IsRoot(RootId)){
                throw new RuntimeException("Invalid RootId");
            }
            if (JWTFactory.VerifyJWT(RootId,AccessToken)) {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("code","200");
                jsonObject.put("message","Success");
                jsonObject.put("data",dataBaseService.GetListBillByUserId(UserId));
                logger.info(jsonObject.toString());
                return jsonObject.toString();
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

    @PostMapping("/GetListByFamilyId/User")
    public String GetListBillByFamilyIUser(@RequestBody HashMap<String,String> RequestBody){
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
            if(!dataBaseService.IsNomalUser(UserId)){
                throw new RuntimeException("Invalid UserId");
            }
            List<UserInfo> listUser = dataBaseService.GetListUserInfoById(UserId);
            if (listUser.size()==1){
                String FamilyId= listUser.get(0).getFamilyId();
                if(!dataBaseService.IsExistedFamily(FamilyId)){
                    throw new RuntimeException("Database Error");
                }
                if (JWTFactory.VerifyJWT(UserId,AccessToken)) {
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("code","200");
                    jsonObject.put("message","Success");
                    jsonObject.put("data",dataBaseService.GetListBillByFamilyId(FamilyId));
                    logger.info(jsonObject.toString());
                    return jsonObject.toString();
                } else {
                    throw new RuntimeException("Invalid JWT");
                }
            }else {
                throw new RuntimeException("Invalid User Info");
            }

        } catch (Exception exception) {
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
    }

    @PostMapping("/GetListByFamilyId/Root")
    public String GetListBillByFamilyIdRoot(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
        BasicReponse basicReponse = new BasicReponse();
        try {
            String RootId = RequestBody.get("RootId");
            if(RootId.isEmpty()){
                throw new RuntimeException("RootId is null");
            }
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()) {
                throw new RuntimeException("AccessToken is null");
            }
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()) {
                throw new RuntimeException("UserId is null");
            }
            if(!dataBaseService.IsNomalUser(UserId)){
                throw new RuntimeException("Invalid UserId");
            }
            if(!dataBaseService.IsRoot(RootId)){
                throw new RuntimeException("Invalid RootId");
            }
            List<UserInfo> listUser = dataBaseService.GetListUserInfoById(UserId);
            if (listUser.size()==1){
                String FamilyId= listUser.get(0).getFamilyId();
                if(!dataBaseService.IsExistedFamily(FamilyId)){
                    throw new RuntimeException("Database Error");
                }
                if (JWTFactory.VerifyJWT(RootId,AccessToken)) {
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("code","200");
                    jsonObject.put("message","Success");
                    jsonObject.put("data",dataBaseService.GetListBillByFamilyId(FamilyId));
                    logger.info(jsonObject.toString());
                    return jsonObject.toString();
                } else {
                    throw new RuntimeException("Invalid JWT");
                }
            }else {
                throw new RuntimeException("Invalid User Info");
            }

        } catch (Exception exception) {
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
    }
    @PostMapping("/Delete")
    public String DeleteBillById(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
        BasicReponse basicReponse = new BasicReponse();
        try {
            String RootId = RequestBody.get("RootId");
            if(RootId.isEmpty()){
                throw new RuntimeException("RootId is null");
            }
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()) {
                throw new RuntimeException("AccessToken is null");
            }
            if(!dataBaseService.IsRoot(RootId)){
                throw new RuntimeException("Invalid RootId");
            }
            String BillId = RequestBody.get("BillId");
            if(!dataBaseService.IsExistedBill(BillId)){
                throw new RuntimeException("BillId is not exist");
            }

            if (JWTFactory.VerifyJWT(RootId,AccessToken)) {
                  dataBaseService.DeleteBillById(BillId);
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
}
