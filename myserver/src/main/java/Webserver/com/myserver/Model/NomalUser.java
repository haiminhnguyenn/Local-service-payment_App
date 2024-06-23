package Webserver.com.myserver.Model;

import org.json.JSONObject;

public class NomalUser extends User{
     private String FamilyId;
     private  String DateOfBirth;
     private String PhoneNumber;

     public void setFamilyId(String familyId) {
          FamilyId = familyId;
     }

     public String getDateOfBirth() {
          return DateOfBirth;
     }

     public String getPhoneNumber() {
          return PhoneNumber;
     }

     public void setDateOfBirth(String dateOfBirth) {
          DateOfBirth = dateOfBirth;
     }

     public void setPhoneNumber(String phoneNumber) {
          PhoneNumber = phoneNumber;
     }

     public String getFamilyId() {
          return FamilyId;
     }


     @Override
     public String toString() {
          JSONObject jsonObject =  new JSONObject();
          jsonObject.put("UserName",this.getUserName());
          jsonObject.put("UserPassWord",this.getUserPassword());
          jsonObject.put("UserId", this.getUserId());
          return  jsonObject.toString();
     }
}
