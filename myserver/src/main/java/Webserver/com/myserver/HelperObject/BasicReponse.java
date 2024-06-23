package Webserver.com.myserver.HelperObject;

import org.json.JSONObject;

public class BasicReponse {
    private  String code;
    private String message;

    public void setCode(String code) {
        this.code = code;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public JSONObject ToJson(){
        JSONObject jsonObject  = new JSONObject();
        jsonObject.put("code",this.getCode());
        jsonObject.put("message",this.getMessage());
        return jsonObject;
    }
    public String toString(){
        return this.ToJson().toString();
    }

}
