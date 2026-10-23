package ru.ifmo.is.backend.rest;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import ru.ifmo.is.backend.service.ConflictException;

@Provider
public class ConflictExceptionMapper implements ExceptionMapper<ConflictException> {

    @Override
    public Response toResponse(ConflictException exception) {
        return ValidationExceptionMapper.jsonError(Response.Status.CONFLICT, exception.getMessage());
    }
}
