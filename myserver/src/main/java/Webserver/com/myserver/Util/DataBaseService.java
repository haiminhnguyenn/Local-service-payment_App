package Webserver.com.myserver.Util;

import Webserver.com.myserver.HelperFunction.HashFuntion;
import Webserver.com.myserver.HelperObject.UserInfo;
import Webserver.com.myserver.Model.*;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Component
public class DataBaseService {
   private final  DataBaseConnect dataBaseConnect;
    public DataBaseService(DataBaseConnect dataBaseConnect) {
        this.dataBaseConnect = dataBaseConnect;
    }
    public void addUserToDataBase(String UserName, String UserPass, String UserId){
        dataBaseConnect.insertUserData(UserName,UserPass,UserId);
    }
    public List<User> SearchNomalUserById(String UserId){
        return  dataBaseConnect.searchNomalUserById(UserId);
    }
    public List<Admin> SearchRootById(String UserId){
        return dataBaseConnect.searchRootById(UserId);
    }
    public boolean IsRoot(String UserId){
        List<Admin> Admins = dataBaseConnect.searchRootById(UserId);
        if(Admins.size()==1){
            return  true;
        }
        return false;
    }
    public List<Fee> GetListFee(){
        return dataBaseConnect.GetListFee();
    }
    public List<Fee> GetListFeeRequired(){
        return dataBaseConnect.GetListFeeRequired();
    }
    public List<Fee> GetListFeeNotRequired(){
        return dataBaseConnect.GetListFeeNotRequired();
    }

    public boolean IsExistedBill(String BillId){
        List<Bill> bills = dataBaseConnect.GetListBillById(BillId);
        if (bills.size()>0){
            return true;
        }
        return false;
    }
    public List<Bill> GetListBillById(String BillId){
        return dataBaseConnect.GetListBillById(BillId);
    }
    public List<Bill> GetListBill(){
        return dataBaseConnect.GetListBill();
    }
    public void DeleteBillById(String BillId){
        dataBaseConnect.DeleteBillById(BillId);
    }
    public List<Bill> GetListBillByUserId(String UserId){
        return dataBaseConnect.GetListBillByUserId(UserId);
    }
    public List<Bill> GetListBillByFamilyId(String FamilyId){
        return dataBaseConnect.GetListBillByFamilyId(FamilyId);
    }
    public List<Bill> GetListBillByFeeId(String FeeId){
        return dataBaseConnect.GetListBillByFeeId(FeeId);
    }
    public void UpdatePassRoot(String UserId,String NewPass){
        dataBaseConnect.UpdateRootPass(NewPass,UserId);
    }
    public boolean IsNomalUser(String UserId){
        List<User> uses = dataBaseConnect.searchNomalUserById(UserId);
        if (uses.size()==1){
            return  true;
        }
        return false;
    }
    public void DeleteFamilyById(String FamilyId){
        dataBaseConnect.DeleteFamilyById(FamilyId);
    }
    public void UpdateFamilyById(String OwnerName,String Address,String FamilyId){
        dataBaseConnect.UpdateFamilyById(OwnerName,Address,FamilyId);
    }
    public List<UserInfo> GetListUserInfoByFamilyId(String familyId){
        return dataBaseConnect.ListUserInforByFamilyId(familyId);
    }
    public void updateUserInfo(String UserId, String FamilyId, String PhoneNumber, String DateOfbirth){
        dataBaseConnect.updateUserInfor(UserId,FamilyId,PhoneNumber,DateOfbirth);
    }
    public  boolean IsExistedFee(String feeId){
        List<Fee> fees = dataBaseConnect.searchFeeById(feeId);
        if (fees.size()>0){
            return true;
        }
        return false;
    }
    public void DeleteFeeById(String FeeId){
        dataBaseConnect.DeleteFeeById(FeeId);
    }
    public List<Family> GetListFamily(){
        return dataBaseConnect.getListFamily();
    }
    public List<Family> GetListFamilyById(String FalimyId) {
        return dataBaseConnect.getListFamilyById(FalimyId);
    }
    public void InsertNewFamily(String FamilyId, String OwnerName, String Address){
        dataBaseConnect.InsertNewFamily(FamilyId,OwnerName,Address);
    }
    public boolean IsExistedFamily(String FamilyId){
        List<Family> families= dataBaseConnect.getListFamilyById(FamilyId);
        if (families.size() > 0){
            return true;
        }
        return false;
    }
    public List<Fee> GetFeeById(String feeId){
        return dataBaseConnect.searchFeeById(feeId);
    }
    public List<UserInfo> GetListUserInfo(){
        return dataBaseConnect.ListUserInfor();
    }
    public List<UserInfo> GetListUserInfoById(String UserId){
        return dataBaseConnect.ListUserInforById(UserId);
    }
    public void UpdateNomalUserPass(String newPass, String UseId){
        dataBaseConnect.UpdateNomalUserPass(UseId,newPass);
    }
    public void InsertNewFee(String FeeName,String FeeId,String dateCreate,String detail,int IsRequired){
        dataBaseConnect.insertNewFee(FeeName,FeeId,dateCreate,detail,IsRequired);
    }
    public void InsertNewBill(String BillId,String FeeId,String FamilyId,String UserId,int Money,String date,String detail){
        dataBaseConnect.insertNewBill(BillId,FeeId,FamilyId,UserId,Money, date,detail);
        //BillId,FeeId,FamilyId,UserId,Money,Date, Detail
    }
    public boolean CheckValidRootPass(String RootId,String Password){
        List<Admin> ListRoot = dataBaseConnect.searchRootById(RootId);
        if (ListRoot.size()==1){
            if (ListRoot.get(0).getUserPassword().equals(HashFuntion.hash256(Password))){
                  return true;
            }
        }
        return false;
    }
    public List<Fee> GetListFeeCompleteUser(String UserId){
        List<UserInfo> nomalUserList = dataBaseConnect.ListUserInforById(UserId);
        return dataBaseConnect.GetListFeeCompleteByFamilyId(nomalUserList.get(0).getFamilyId());
    }
    public List<Fee> GetListFeeNotCompleteUser(String UserId){
        List<UserInfo> nomalUserList = dataBaseConnect.ListUserInforById(UserId);
        return dataBaseConnect.GetListFeeNotCompleteByFamilyId(nomalUserList.get(0).getFamilyId());
    }
    public boolean CheckIfFeeCanDelete(String FeeId){
        List<Bill> bills = dataBaseConnect.GetListBillByFeeId(FeeId);
        if(bills.size()==0){
            return true;
        }
        return false;
    }
    public void DeleteUserById(String UserId){
        dataBaseConnect.DeleteNomalUserById(UserId);
    }
}
