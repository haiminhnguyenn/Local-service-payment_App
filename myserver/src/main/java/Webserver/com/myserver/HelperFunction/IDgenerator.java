package Webserver.com.myserver.HelperFunction;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Random;

public class IDgenerator {
    public static String GenId(String input){
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String formattedDate = currentDate.format(formatter);
        return formattedDate+"_"+input+"_"+getAutoIncrementedNumber();
    }
    private static int callCounter = 0;

    public static synchronized int getAutoIncrementedNumber() {
        return ++callCounter;
    }
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    public static String GenPass(int length){
        Random random = new Random();
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            char randomChar = CHARACTERS.charAt(randomIndex);
            sb.append(randomChar);
        }

        return sb.toString();
    }

}
