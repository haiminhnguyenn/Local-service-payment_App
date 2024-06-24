# Local Service Payment Application

Overview

Local Service Payment Application is a project for our major assignment in the Introduction to Software Engineering (IT3180) module at HUST. It is an application provided to local officials and residents in the area to facilitate the management and collection of fees within the local community.

Setting up:

For server environment:
- maven: https://maven.apache.org/download.cgi (download binary archive)
- jdk 17: https://bell-sw.com/pages/downloads/#jdk-17-lts

For windows:
Search environment -> "Edit the system environment variables" -> "Environment Variables.." -> System variables -> Path
Add 2 path to jdk17/bin and maven/bin from above

Run server:
- First, build using: mvn install
- Second, run the .jar file in target folder: java -jar myserver-0.0.1-SNAPSHOT.jar

For frontend web:
- nodejs & npm: https://nodejs.org/en
- Run using 'npm start' in with myweb folder as base
