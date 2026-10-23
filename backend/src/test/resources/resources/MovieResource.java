package ru.ifmo.is.backend.resources;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import ru.ifmo.is.backend.dto.MovieDto;
import ru.ifmo.is.backend.entities.Movie;
import ru.ifmo.is.backend.services.MovieService;

@Path("/movies")
@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MovieResource {
    @Inject
    MovieService movieService;

    @GET
    @Path("{id}")
    public MovieDto get(@PathParam("id") long id) {
        return movieService.get(id);
    }

    @POST
    public Response create(Movie movie, @Context UriInfo uriInfo) {
        MovieDto created = movieService.create(movie);
        return Response.created(uriInfo.getAbsolutePathBuilder().path(String.valueOf(created.id())).build())
                .entity(created)
                .build();
    }
}
