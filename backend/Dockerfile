FROM maven:3.9.2-eclipse-temurin-20-alpine
WORKDIR /usr/src/mymaven
COPY ./pom.xml .
COPY ./src ./src
EXPOSE 5000
CMD ["mvn", "spring-boot:run"]