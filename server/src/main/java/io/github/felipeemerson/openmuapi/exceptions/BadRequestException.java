package io.github.felipeemerson.openmuapi.exceptions;

public class BadRequestException extends RuntimeException {

    public BadRequestException() {
        super("Object not found.");
    }

    public BadRequestException(String message) {
        super(message);
    }
    public BadRequestException(String message, Throwable cause) {
        super(message, cause);
    }

    public BadRequestException(Throwable cause) {
        super(cause);
    }

}
