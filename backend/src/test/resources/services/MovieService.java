package ru.ifmo.is.backend.services;

import jakarta.ws.rs.POST;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import ru.ifmo.is.backend.dto.MovieDto;
import ru.ifmo.is.backend.entities.Movie;

public class MovieService {

    public MovieDto create(Movie movie) {
        DtoMapper.applyScalars(input, movie);
        relations.applyTo(movie);
        movieRepository.persist(movie);
        movieRepository.flush();

        notifier.fireAll(context.createdEvents());
        notifier.created(EntityType.MOVIE, movie.getId());
        return DtoMapper.toDto(movie);
    }
}
