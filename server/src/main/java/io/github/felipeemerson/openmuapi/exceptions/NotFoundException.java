package io.github.felipeemerson.openmuapi.exceptions;

public class NotFoundException extends RuntimeException {

    public NotFoundException() {
        super("Object not found.");
    }

    public NotFoundException(String message) {
        super(message);
    }
    public NotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotFoundException(Throwable cause) {
        super(cause);
    }

}
