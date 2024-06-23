package Webserver.com.myserver.Config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "server")
public class ServerProperties {
     private int MaxLengthPassWord;
     private int MinLengthPassWord;
     private int MaxLengthUserId;
     private int MinLengthUserId;
     private int MaxLengthFamilyId;
     private int MinLengthFamilyId;
     private int MinLengthBillId;
     private int MaxLengthBillId;
     private int MinLengthFeeId;
     private int MaxLengthFeeId;
     private int OtpLength;
     private int OtpTimeStep;

    public int getOtpTimeStep() {
        return OtpTimeStep;
    }

    public void setOtpTimeStep(int otpTimeStep) {
        OtpTimeStep = otpTimeStep;
    }

    public int getOtpLength() {
        return OtpLength;
    }

    public void setOtpLength(int otpLength) {
        OtpLength = otpLength;
    }

    public int getMaxLengthBillId() {
        return MaxLengthBillId;
    }

    public int getMaxLengthFamilyId() {
        return MaxLengthFamilyId;
    }

    public int getMaxLengthFeeId() {
        return MaxLengthFeeId;
    }

    public int getMaxLengthPassWord() {
        return MaxLengthPassWord;
    }

    public int getMaxLengthUserId() {
        return MaxLengthUserId;
    }

    public int getMinLengthBillId() {
        return MinLengthBillId;
    }

    public int getMinLengthFamilyId() {
        return MinLengthFamilyId;
    }

    public int getMinLengthFeeId() {
        return MinLengthFeeId;
    }

    public int getMinLengthPassWord() {
        return MinLengthPassWord;
    }

    public int getMinLengthUserId() {
        return MinLengthUserId;
    }

    public void setMaxLengthBillId(int maxLengthBillId) {
        MaxLengthBillId = maxLengthBillId;
    }

    public void setMaxLengthFamilyId(int maxLengthFamilyId) {
        MaxLengthFamilyId = maxLengthFamilyId;
    }

    public void setMaxLengthFeeId(int maxLengthFeeId) {
        MaxLengthFeeId = maxLengthFeeId;
    }

    public void setMaxLengthPassWord(int maxLengthPassWord) {
        MaxLengthPassWord = maxLengthPassWord;
    }

    public void setMaxLengthUserId(int maxLengthUserId) {
        MaxLengthUserId = maxLengthUserId;
    }

    public void setMinLengthBillId(int minLengthBillId) {
        MinLengthBillId = minLengthBillId;
    }

    public void setMinLengthFamilyId(int minLengthFamilyId) {
        MinLengthFamilyId = minLengthFamilyId;
    }

    public void setMinLengthFeeId(int minLengthFeeId) {
        MinLengthFeeId = minLengthFeeId;
    }

    public void setMinLengthPassWord(int minLengthPassWord) {
        MinLengthPassWord = minLengthPassWord;
    }

    public void setMinLengthUserId(int minLengthUserId) {
        MinLengthUserId = minLengthUserId;
    }
}
