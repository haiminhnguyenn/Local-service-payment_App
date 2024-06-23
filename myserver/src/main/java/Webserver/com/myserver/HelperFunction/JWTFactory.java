package Webserver.com.myserver.HelperFunction;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

public class JWTFactory {
    private static final String privateKey = "-----BEGIN PRIVATE KEY-----\n" +
            "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7TcOaklqLRkjG\n" +
            "9H8LvXGxSbmrCT9rtewIlb40TbG2AfPmm85Sb8y4wrllw/05FGuC67MtSkqwUyon\n" +
            "PwDFvzrLhJtlkPWT8uNOaO4Q5IIDdTf3sJPA8XENKoKTdPbWH/0DS6aaC4zGsoPn\n" +
            "MChNE44gkrUaYobne16XNeg0W+ABJIE16krBN23fOjkHixeEQfTP5PgQw0uvqdpZ\n" +
            "3GhF/kOgJ2F/yrYuDvbs2t4zoqxwMFGHUjGcNAJhei1IvpndTVd4KlZ2KeiQ3apW\n" +
            "YNNBT93p2rr2/zLhxAr02DpFJaEYPXiXTbRmfkIyDKlce0bPzPgfbuPtukUH+u6J\n" +
            "Hz5khGbJAgMBAAECggEAC4vXqweqnTtP8TPRQSAEijFJSMnhJvqn+j+A4iiH8/ha\n" +
            "2LRyG5LYw+r9EtDqI0Km/gMZoIkb4ZK+3nx7x7TqIvGhwrkU6nHmoUbGpjPv79ai\n" +
            "BJrWAObhWTZtpjlnnfuK1VEsjAJ6QyVuDCpj0ZyK/mcM0vuP5WUth5TDI7cmL+u9\n" +
            "D6DWFqT47yilij2HJyATwrh/TK1sPZz8zJbVDtDrDkWYgqJb4AaOcaiTjm+vWnIp\n" +
            "X12OiMFzMvZ8YDIC9u+7IbUESn8TSQZW+ucP+pw8bmKcC4uIEQ47YNrvbqr14N7+\n" +
            "l5AeRvjZ7vI/e7SQPD4as4iSVQaq+3oW+WsvRIecAQKBgQDvuwB7HkuWAoDXeQwm\n" +
            "k2Mv38rFRRcnUSwbi0QPHmC0GaR9Oh/0e4E9/Dr6qcucuM3ogxMZ6eF/rtdJ0NeI\n" +
            "VyC+tgmYua3qqZoGI6B+NoKwvZwjUNOYs0LKlemvX5C41y8Yl00tSv2xCdAa8sSL\n" +
            "9ADjsQwK45t7a5CXEHGoA3UFkQKBgQDIA+r4OUklKSumUPZ9ENsJtAPD9PEGxlWL\n" +
            "gdGG7XJaWVpqFlc1IGdK7B/P1KkSHbA8T1cNKHArOeFIbl+EiY1KF8ou0AqUdJhM\n" +
            "a6bNlfC462sMXC9tybvGQiTEFBFS+UUoVDv5uz2YRFwV5KQ7D5v9AjPWqDgiMB4l\n" +
            "keNHUOjRuQKBgQDVLW+CDDCe1t8HvQaHDy12lwVTYtryBYa5f6An6ZWI0fyptxRP\n" +
            "bbxCCJfR60e6t8Oy7UwBES+LQUkExQfEn+XocSwbeZIkSGlE6E2BrquMyy+bX/ap\n" +
            "pU7Ro3nIj6y8Ee45aeIhUrxBwD4kmJka8wIPd5MD496RY9eR3feTtm9LYQKBgB6I\n" +
            "GpIRjIzToAofScEFlaoBhKGg/jnehKhrBKToEhCgmyCekGlXrOzO5nw/Jh/R0Fkk\n" +
            "c1Fa3uR6TV1VG9eLd7nbr809jJ/kvGrN9ARl4v0XUpvsZoEHzlYROrODrLFRw7DI\n" +
            "Su9wGZLovHXLFRa+5zzT3T3jJ85wMeniPyNfwmphAoGACRD5+xVZUw67WInaiQuZ\n" +
            "g+TesApsM5uRQW9jciZmEc0vqttDsEJ3dpq8su9ZSNh8jiD2E9AuWwz0dN23qbnG\n" +
            "wmNbSjEWKP4PbWylDPBod+VEn8ViziBuBekmOCrg3Zheu0B+hAivl5QU9/dt9BJf\n" +
            "32tDDGRrMKFsFvw25ZpDSHY=\n" +
            "-----END PRIVATE KEY-----";
    public static String GenJWT(String UserId){
        try {

            SecretKey secretKey = convertStringToKey(privateKey);
            long nowMillis = System.currentTimeMillis();
            Date now = new Date(nowMillis);
            Date expriration = new Date(nowMillis + 3600000);
            return Jwts.builder()
                    .setSubject(UserId)
                    .setIssuedAt(now)
                    .setExpiration(expriration)
                    .signWith(secretKey,SignatureAlgorithm.HS256)
                    .compact();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    public static boolean VerifyJWT(String UserId,String JWT){
        try {

            Claims claims = verifyJwt(JWT, privateKey);
            String curId = claims.getSubject();
            if (curId.equals(UserId)){
                return true;
            }
        } catch (Exception e) {
           e.printStackTrace();
        }
        return  false;
    }
    private static Claims verifyJwt(String jwt, String privateKey) {
        SecretKey secretKey = convertStringToKey(privateKey);
        try {
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(jwt);

            return claimsJws.getBody();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    private static SecretKey convertStringToKey(String keyString) {
        // Convert the string to bytes using UTF-8 encoding
        byte[] keyBytes = keyString.getBytes(StandardCharsets.UTF_8);

        // Create a SecretKeySpec object using the byte array and the algorithm (e.g., HMAC-SHA-256)
        return new javax.crypto.spec.SecretKeySpec(keyBytes, "HmacSHA256");
    }

}




