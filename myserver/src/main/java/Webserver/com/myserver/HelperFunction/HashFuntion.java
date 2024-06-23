package Webserver.com.myserver.HelperFunction;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class HashFuntion {
    public static String hash256(String input) {
        try {

            MessageDigest md = MessageDigest.getInstance("SHA-256");

            // Add input bytes to digest
            md.update(input.getBytes());

            // Get the hash's bytes
            byte[] bytes = md.digest();


            StringBuilder stringBuilder = new StringBuilder();
            for (byte b : bytes) {
                stringBuilder.append(String.format("%02x", b));
            }


            return stringBuilder.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();

            return null;
        }
    }


}
