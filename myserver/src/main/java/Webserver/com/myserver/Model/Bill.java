package Webserver.com.myserver.Model;

import org.json.JSONObject;

public class Bill {
    private String BillId;
    private String FeeId;
    private int Money;
    private String FamilyId;
    private String UserId;
    private String Date;
    private String Detail;

    public String getBillId() {
        return BillId;
    }

    public int getMoney() {
        return Money;
    }

    public String getDate() {
        return Date;
    }

    public String getDetail() {
        return Detail;
    }

    public String getFamilyId() {
        return FamilyId;
    }

    public String getFeeId() {
        return FeeId;
    }

    public void setBillId(String billId) {
        BillId = billId;
    }

    public String getUserId() {
        return UserId;
    }

    public void setDate(String date) {
        Date = date;
    }

    public void setDetail(String detail) {
        Detail = detail;
    }

    public void setFamilyId(String familyId) {
        FamilyId = familyId;
    }

    public void setFeeId(String feeId) {
        FeeId = feeId;
    }

    public void setMoney(int money) {
        Money = money;
    }

    public void setUserId(String userId) {
        UserId = userId;
    }
    public JSONObject toJson(){
        JSONObject jsonObject =  new JSONObject();
        jsonObject.put("Money",this.getMoney());
        jsonObject.put("Detail",this.getDetail());
        jsonObject.put("FeeId",this.getFeeId());
        jsonObject.put("UserId",this.getUserId());
        jsonObject.put("Date",this.getDate());
        jsonObject.put("FamilyId",this.getFamilyId());
        jsonObject.put("BillId",this.getBillId());
        return  jsonObject;
    }

    @Override
    public String toString() {
        return this.toJson().toString();
    }
    public void SetDefaultBillId(){
        this.setBillId(this.getFeeId()+"_"+this.getFamilyId());
    }
}
