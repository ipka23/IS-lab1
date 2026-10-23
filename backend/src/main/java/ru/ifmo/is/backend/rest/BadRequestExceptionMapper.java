package ru.ifmo.is.backend.rest;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class BadRequestExceptionMapper implements ExceptionMapper<IllegalArgumentException> {

    @Override
    public Response toResponse(IllegalArgumentException exception) {
        return ValidationExceptionMapper.jsonError(Response.Status.BAD_REQUEST, exception.getMessage());
    }
}
