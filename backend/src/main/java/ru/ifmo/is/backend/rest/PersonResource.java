package ru.ifmo.is.backend.rest;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import ru.ifmo.is.backend.entity.Person;
import ru.ifmo.is.backend.service.PersonService;

import java.util.List;

@Path("/persons")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PersonResource {

    @Inject
    private PersonService personService;

    @GET
    public List<Person> list() {
        return personService.list();
    }

    @POST
    public Response create(@Valid Person person) {
        Person saved = personService.create(person);
        return Response.status(Response.Status.CREATED).entity(saved).build();
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") Long id) {
        if (!personService.delete(id)) {
            throw new NotFoundException("person not found");
        }
        return Response.noContent().build();
    }
}
