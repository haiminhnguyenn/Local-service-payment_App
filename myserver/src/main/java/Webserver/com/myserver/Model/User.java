package Webserver.com.myserver.Model;

public  class User {
    private String UserId;
    private String UserName;
    private String UserPassword;


    public String getUserId() {
        return UserId;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserId(String userId) {
        UserId = userId;
    }



    public String getUserPassword() {
        return UserPassword;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public void setUserPassword(String userPassword) {
        UserPassword = userPassword;
    }
}
