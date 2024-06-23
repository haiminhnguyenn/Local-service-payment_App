package Webserver.com.myserver.HelperFunction;
import Webserver.com.myserver.Config.ServerProperties;
import org.springframework.beans.factory.annotation.Autowired;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class TOTPGenerator {

    private static String secretKey = "HanoiUniversityOfScienceAndTechnology";
    public static String generateTOTP( String stringInput) {
        long timeStep = 180;
        int totpLength = 6;

        try {
            byte[] keyBytes = secretKey.getBytes();
            SecretKeySpec secretKeySpec = new SecretKeySpec(keyBytes, "HmacSHA1");

            long currentTime = Instant.now().getEpochSecond() / timeStep;
            String timeString = Long.toHexString(currentTime).toUpperCase();

            while (timeString.length() < 16) {
                timeString = "0" + timeString;
            }

            byte[] msgBytes = hexStrToBytes(timeString);
            byte[] hashBytes = hmacSha1(secretKeySpec, msgBytes);
            int offset = hashBytes[hashBytes.length - 1] & 0x0F;

            int binary = ((hashBytes[offset] & 0x7F) << 24) |
                    ((hashBytes[offset + 1] & 0xFF) << 16) |
                    ((hashBytes[offset + 2] & 0xFF) << 8) |
                    (hashBytes[offset + 3] & 0xFF);

            int otp = binary % (int) Math.pow(10, totpLength);
            String totp = Integer.toString(otp);

            while (totp.length() < totpLength) {
                totp = "0" + totp;
            }

            return totp;

        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            e.printStackTrace();
        }

        return null;
    }
    public static boolean verifyTOTP( String stringInput, String userProvidedTOTP) {
        String generatedTOTP = generateTOTP(stringInput);
        return generatedTOTP != null && generatedTOTP.equals(userProvidedTOTP);
    }

    private static byte[] hexStrToBytes(String hexString) {
        int len = hexString.length();
        byte[] bytes = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            bytes[i / 2] = (byte) ((Character.digit(hexString.charAt(i), 16) << 4)
                    + Character.digit(hexString.charAt(i + 1), 16));
        }
        return bytes;
    }

    private static byte[] hmacSha1(SecretKeySpec keySpec, byte[] data) throws NoSuchAlgorithmException, InvalidKeyException {
        Mac mac = Mac.getInstance("HmacSHA1");
        mac.init(keySpec);
        return mac.doFinal(data);
    }


}
