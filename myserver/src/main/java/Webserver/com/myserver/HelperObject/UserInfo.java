package Webserver.com.myserver.HelperObject;

public class UserInfo {
    private String UserId;
    private String UserName;
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
    public String getUserId() {
        return UserId;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserId(String userId) {
        UserId = userId;
    }
    public void setUserName(String userName) {
        UserName = userName;
    }
}
