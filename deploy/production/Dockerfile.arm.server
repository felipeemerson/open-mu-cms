FROM maven:3.8.5-openjdk-17@sha256:68e34d126d784409db9a20f660fe932cc35451c9815f6491e15b08c1abf79ae0 AS build

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:23-ea-17-jdk@sha256:b3d62fa46b8f12cfb938df32d96240df7e473b4d29677ad35566cb7e82f2674a
LABEL mantainer=io.github.felipeemerson
COPY --from=build /app/target/openmu-api-0.0.1-SNAPSHOT.jar openmu-api-0.0.1.jar
ENTRYPOINT ["java","-jar","/openmu-api-0.0.1.jar"]