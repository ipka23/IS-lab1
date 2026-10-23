package ru.ifmo.is.backend.rest;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import ru.ifmo.is.backend.entity.Movie;
import ru.ifmo.is.backend.entity.Person;
import ru.ifmo.is.backend.service.SpecialService;
import ru.ifmo.is.backend.ws.MovieSocket;

import java.util.List;
import java.util.Map;

@Path("/special")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SpecialResource {

    @Inject
    private SpecialService specialService;

    @GET
    @Path("/golden-palm-sum")
    public Map<String, Object> goldenPalmSum() {
        return Map.of("sum", specialService.goldenPalmSum());
    }

    @GET
    @Path("/latest")
    public Movie latest() {
        Movie movie = specialService.latestMovie();
        if (movie == null) {
            throw new NotFoundException("no movies");
        }
        return movie;
    }

    @GET
    @Path("/usa-box-office-greater")
    public List<Movie> usaBoxOfficeGreater(@QueryParam("value") int value) {
        return specialService.usaBoxOfficeGreater(value);
    }

    @GET
    @Path("/screenwriters-without-oscars")
    public List<Person> screenwritersWithoutOscars() {
        return specialService.screenwritersWithoutOscars();
    }

    @POST
    @Path("/award-long-movies")
    public Map<String, Object> awardLongMovies(@QueryParam("minLength") int minLength,
                                               @QueryParam("oscars") int oscars) {
        int updated = specialService.awardLongMovies(minLength, oscars);
        MovieSocket.broadcast("{\"event\":\"changed\"}");
        return Map.of("updated", updated);
    }
}
