FROM maven:3.8.4-openjdk-17 AS build

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-alpine
MAINTAINER io.github.felipeemerson
COPY --from=build /app/target/openmu-api-0.0.1-SNAPSHOT.jar openmu-api-0.0.1.jar
ENTRYPOINT ["java","-jar","/openmu-api-0.0.1.jar"]