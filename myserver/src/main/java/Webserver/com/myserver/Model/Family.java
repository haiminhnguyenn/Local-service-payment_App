package Webserver.com.myserver.Model;
public class Family {
    private  String FamilyId;
    private String Address;
    private String OwnerName;

    public String getAddress() {
        return Address;
    }

    public void setFamilyId(String familyId) {
        FamilyId = familyId;
    }

    public String getFamilyId() {
        return FamilyId;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public String getOwnerName() {
        return OwnerName;
    }

    public void setOwnerName(String ownerName) {
        OwnerName = ownerName;
    }
}
