package Webserver.com.myserver.Util;
import Webserver.com.myserver.HelperObject.UserInfo;
import Webserver.com.myserver.Model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Component
public class DataBaseConnect {
    private final JdbcTemplate jdbcTemplate;
    public DataBaseConnect(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    String  insertUser = "INSERT INTO login (UserName, UserPassword, UserId) VALUES (?, ?,?)";
    private static final String SEARCH_USER_BY_ID_SQL = "SELECT * FROM login WHERE UserId = ?";
    private static final String DELETE_USER_BY_ID_SQL_LOGIN = "DELETE FROM login WHERE UserId = ?";
    private static final String DELETE_FEE_BY_ID = "DELETE FROM fee WHERE FeeId = ?";
    private static final String DELETE_FAMILY_BY_ID_SQL = "DELETE FROM family WHERE FamilyId = ?";
    private static final String UPDATE_PASS_USER_BY_ID_SQL = "UPDATE login SET UserPassword = ? WHERE UserId = ?";
    private static final String UPDATE_PASS_ROOT_BY_ID_SQL = "UPDATE admin SET UserPassword = ? WHERE UserId = ?";
    private static final String SEARCH_ROOT_BY_ID_SQL = "SELECT * FROM admin WHERE UserId = ?";
    private static final String INSERT_FEE_BY_ID_SQL = "INSERT INTO fee (FeeName, FeeId, DateCreate, Detail, IsRequired) VALUES (?,?,?,?,?)";
    private static final String INSERT_BILL_BY_ID_SQL = "INSERT INTO bill (BillId,FeeId,FamilyId,UserId,Money,Date, Detail) VALUES (?,?,?,?,?,?,?)";
    private static final String SEARCH_FEE_BY_ID_SQL = "SELECT * FROM fee WHERE FeeId = ?";
    private static final String GET_lIST_FEE_SQL = "SELECT * FROM fee";

    private static final String GET_lIST_BILL_BY_ID_SQL = "SELECT * FROM bill WHERE BillId = ?";
    private static final String GET_lIST_BILL_SQL = "SELECT * FROM bill";
    private static final String GET_lIST_BILL_BY_FEE_ID_SQL = "SELECT * FROM bill WHERE feeId = ?";
    private static final String GET_lIST_BILL_BY_FAMILY_ID_SQL = "SELECT * FROM bill WHERE FamilyId = ?";
    private static final String DELETE_BILL_BY_ID = "DELETE FROM bill WHERE BillId = ?";
    private static final String GET_lIST_BILL_BY_USER_ID_SQL = "SELECT * FROM bill WHERE UserId = ?";

    private static final String GET_lIST_FEE_BY_FAMILY_COMPLETE_ID_SQL = "select * from fee where FeeId in (select f.FeeId from fee f, bill b where f.FeeId = b.FeeId  and b.FamilyId = ?)";
    private static final String GET_lIST_FEE_BY_FAMILY_NOT_COMPLETE_ID_SQL = "select * from fee where FeeId not in (select f.FeeId from fee f, bill b where f.FeeId = b.FeeId  and b.FamilyId = ?)";
    private static final String GET_lIST_FAMILY_SQL = "SELECT * FROM family";
    private static final String GET_lIST_FAMILY_BY_ID_SQL = "SELECT * FROM family WHERE FamilyId = ?";

    private static final String UPDATE_FAMILY_BY_ID = "UPDATE family SET OwnerName = ? , Address = ? WHERE FamilyId = ?";


    private static final String GET_LIST_FEE_NOT_Required_SQL =
            "SELECT * FROM fee WHERE  isRequired = 0";
    private static final String GET_LIST_FEE_Required_SQL =
            "SELECT * FROM fee WHERE  isRequired = 1";

    private static final String GET_lIST_USER_SQL = "SELECT * FROM nomal_user_info";

    private static final String GET_lIST_USER_BY_ID_SQL = "SELECT * FROM nomal_user_info WHERE UserId = ?";
    private static final String GET_lIST_USER_BY_FAMILY_ID_SQL = "SELECT * FROM nomal_user_info WHERE FamilyId = ?";
    private static final String DELETE_USER_BY_ID_SQL_INFO = "DELETE FROM nomal_user_info WHERE UserId = ?";
    private  static  final  String INSERT_USER_INFO_NAME_ID = "INSERT INTO nomal_user_info (UserName, UserId) VALUES (?, ?)";

    private  static  final  String INSERT_NEW_FAMILY = "INSERT INTO family (FamilyId , OwnerName, Address) VALUES ( ?, ?, ?)";
    private  static  final  String UPDATE_USER_INFO_BY_ID = "UPDATE nomal_user_info SET FamilyId = ?, PhoneNumber = ? , DateOfBirth = ?  WHERE UserId = ?";
    public  void insertUserData(String UserName, String UserPassword , String UserId) {
        jdbcTemplate.update(insertUser, UserName, UserPassword,UserId);
        jdbcTemplate.update(INSERT_USER_INFO_NAME_ID,UserName,UserId);
    }
    public void DeleteNomalUserById(String UserId){
        jdbcTemplate.update(DELETE_USER_BY_ID_SQL_LOGIN,UserId);
        jdbcTemplate.update(DELETE_USER_BY_ID_SQL_INFO,UserId);
    }
    public void DeleteFeeById(String FeeId){
        jdbcTemplate.update(DELETE_FEE_BY_ID,FeeId);
    }
    public void DeleteFamilyById(String FamilyId){
        jdbcTemplate.update(DELETE_FAMILY_BY_ID_SQL,FamilyId);
    }
    public void UpdateRootPass(String NewPass, String UserId){
        jdbcTemplate.update(UPDATE_PASS_ROOT_BY_ID_SQL,NewPass,UserId);
    }
    public void UpdateFamilyById(String OwnerName,String Address, String FamilyId){
        jdbcTemplate.update(UPDATE_FAMILY_BY_ID,OwnerName,Address,FamilyId);
    }
    public void InsertNewFamily(String FammilyId, String OwnerName, String Address){
        jdbcTemplate.update(INSERT_NEW_FAMILY,FammilyId,OwnerName,Address);
    }
    public List<Family> getListFamily(){
        return jdbcTemplate.query(GET_lIST_FAMILY_SQL,new BeanPropertyRowMapper<>(Family.class));
    }
    public List<Bill> GetListBillById(String BillId){
        return jdbcTemplate.query(GET_lIST_BILL_BY_ID_SQL,new Object[]{BillId},new BeanPropertyRowMapper<>(Bill.class));
    }
    public List<Bill> GetListBill(){
        return jdbcTemplate.query(GET_lIST_BILL_SQL,new BeanPropertyRowMapper<>(Bill.class));
    }
    public List<Bill> GetListBillByFamilyId(String FamilyId){
        return jdbcTemplate.query(GET_lIST_BILL_BY_FAMILY_ID_SQL,new Object[]{FamilyId},new BeanPropertyRowMapper<>(Bill.class));
    }
    public List<Bill> GetListBillByUserId(String UserId){
        return jdbcTemplate.query(GET_lIST_BILL_BY_USER_ID_SQL,new Object[]{UserId},new BeanPropertyRowMapper<>(Bill.class));
    }
    public List<Bill> GetListBillByFeeId(String FeeId){
        return jdbcTemplate.query(GET_lIST_BILL_BY_FEE_ID_SQL,new Object[]{FeeId},new BeanPropertyRowMapper<>(Bill.class));
    }
    public void DeleteBillById(String BillId){
        jdbcTemplate.update(DELETE_BILL_BY_ID,BillId);
    }
    public List<Family> getListFamilyById(String FamilyId){
        return jdbcTemplate.query(GET_lIST_FAMILY_BY_ID_SQL,new Object[]{FamilyId},new BeanPropertyRowMapper<>(Family.class));
    }




    public void  updateUserInfor(String UserId, String FalimyId, String PhoneNumber, String DateOfbirth){
        jdbcTemplate.update(UPDATE_USER_INFO_BY_ID,FalimyId,PhoneNumber,DateOfbirth,UserId);
    }
    public void insertNewFee(String FeeName, String FeeId , String DateCreate ,String Detail, int IsRequired){
        jdbcTemplate.update(INSERT_FEE_BY_ID_SQL,FeeName,FeeId,DateCreate,Detail,IsRequired);

    }

    public void insertNewBill(String BillId,String FeeId ,String FamilyId,String UserId ,int Money,String Date,String Detail){
        jdbcTemplate.update(INSERT_BILL_BY_ID_SQL,BillId,FeeId,FamilyId,UserId,Money,Date,Detail);
        //BillId,FeeId,FamilyId,UserId,Money,Date, Detail
    }
    public List<Fee> searchFeeById(String feeId){
        return jdbcTemplate.query(SEARCH_FEE_BY_ID_SQL,new Object[]{feeId},new BeanPropertyRowMapper<>(Fee.class));
    }
    public List<Fee> GetListFeeCompleteByFamilyId(String FamilyId){
        return jdbcTemplate.query(GET_lIST_FEE_BY_FAMILY_COMPLETE_ID_SQL,new Object[]{FamilyId},new BeanPropertyRowMapper<>(Fee.class));
    }
    public List<Fee> GetListFeeNotCompleteByFamilyId(String FamilyId){
        return jdbcTemplate.query(GET_lIST_FEE_BY_FAMILY_NOT_COMPLETE_ID_SQL,new Object[]{FamilyId},new BeanPropertyRowMapper<>(Fee.class));
    }
    public List<UserInfo> ListUserInfor(){
        return  jdbcTemplate.query(GET_lIST_USER_SQL,new BeanPropertyRowMapper<>(UserInfo.class));
    }

    public List<UserInfo> ListUserInforById(String UserId){
        return  jdbcTemplate.query(GET_lIST_USER_BY_ID_SQL,new Object[]{UserId},new BeanPropertyRowMapper<>(UserInfo.class));
    }
    public List<UserInfo> ListUserInforByFamilyId(String FamilyId){
        return  jdbcTemplate.query(GET_lIST_USER_BY_FAMILY_ID_SQL,new Object[]{FamilyId},new BeanPropertyRowMapper<>(UserInfo.class));
    }
    public List<Fee> GetListFee(){
       return  jdbcTemplate.query(GET_lIST_FEE_SQL,new BeanPropertyRowMapper<>(Fee.class));
    }
    public List<Fee> GetListFeeRequired(){
        return  jdbcTemplate.query(GET_LIST_FEE_Required_SQL,new BeanPropertyRowMapper<>(Fee.class));
    }
    public List<Fee> GetListFeeNotRequired(){
        return  jdbcTemplate.query(GET_LIST_FEE_NOT_Required_SQL,new BeanPropertyRowMapper<>(Fee.class));
    }



    public List<User> searchNomalUserById(String UserId){
        return jdbcTemplate.query(SEARCH_USER_BY_ID_SQL,new Object[]{UserId}, new BeanPropertyRowMapper<>(User.class));
    }
    public List<Admin> searchRootById(String UserId){
        return jdbcTemplate.query(SEARCH_ROOT_BY_ID_SQL,new Object[]{UserId}, new BeanPropertyRowMapper<>(Admin.class));
    }
    public void UpdateNomalUserPass(String UserId, String newPass){
        jdbcTemplate.update(UPDATE_PASS_USER_BY_ID_SQL,newPass,UserId);
    }
}
