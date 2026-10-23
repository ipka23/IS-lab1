package ru.ifmo.is.backend.rest;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import ru.ifmo.is.backend.entity.Movie;
import ru.ifmo.is.backend.service.MovieService;
import ru.ifmo.is.backend.ws.MovieSocket;

import java.util.Map;

@Path("/movies")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MovieResource {

    @Inject
    private MovieService movieService;

    @GET
    public Map<String, Object> list(@QueryParam("page") @DefaultValue("0") int page,
                                    @QueryParam("size") @DefaultValue("10") int size,
                                    @QueryParam("filterField") String filterField,
                                    @QueryParam("filterText") String filterText,
                                    @QueryParam("sortField") @DefaultValue("id") String sortField,
                                    @QueryParam("sortDir") @DefaultValue("asc") String sortDir) {
        return Map.of(
                "items", movieService.list(page, size, filterField, filterText, sortField, sortDir),
                "total", movieService.count(filterField, filterText));
    }

    @GET
    @Path("{id}")
    public Movie get(@PathParam("id") Long id) {
        Movie movie = movieService.find(id);
        if (movie == null) {
            throw new NotFoundException("movie not found");
        }
        return movie;
    }

    @POST
    public Response create(@Valid Movie movie) {
        Movie saved = movieService.create(movie);
        MovieSocket.broadcast("{\"event\":\"changed\"}");
        return Response.status(Response.Status.CREATED).entity(saved).build();
    }

    @PUT
    @Path("{id}")
    public Movie update(@PathParam("id") Long id, @Valid Movie movie) {
        Movie saved = movieService.update(id, movie);
        if (saved == null) {
            throw new NotFoundException("movie not found");
        }
        MovieSocket.broadcast("{\"event\":\"changed\"}");
        return saved;
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") Long id) {
        if (!movieService.delete(id)) {
            throw new NotFoundException("movie not found");
        }
        MovieSocket.broadcast("{\"event\":\"changed\"}");
        return Response.noContent().build();
    }
}
