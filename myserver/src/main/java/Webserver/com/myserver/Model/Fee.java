package Webserver.com.myserver.Model;

public class Fee {

    private String FeeId;
    private  String FeeName;
    private String DateCreate;
    private String Detail;
    private  int IsRequired;

    public void setDateCreate(String dateCreate) {
        DateCreate = dateCreate;
    }

    public String getDateCreate() {
        return DateCreate;
    }


    public String getFeeId() {
        return FeeId;
    }

    public String getDetail() {
        return Detail;
    }

    public String getFeeName() {
        return FeeName;
    }

    public void setFeeId(String feeId) {
        FeeId = feeId;
    }

    public void setDetail(String detail) {
        Detail = detail;
    }

    public void setFeeName(String feeName) {
        FeeName = feeName;
    }

    public int getIsRequired() {
        return IsRequired;
    }

    public void setIsRequired(int isRequired) {
        IsRequired = isRequired;
    }
}
