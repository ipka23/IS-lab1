package ru.ifmo.is.backend.dto;

import ru.ifmo.is.backend.entities.MovieGenre;
import ru.ifmo.is.backend.entities.MpaaRating;

import java.time.Instant;

public record MovieDto(Long id,
                       String name,
                       CoordinatesDto coordinates,
                       Instant creationDate,
                       int oscarsCount,
                       int budget,
                       float totalBoxOffice,
                       MpaaRating mpaaRating,
                       PersonDto director,
                       PersonDto screenwriter,
                       PersonDto operator,
                       int length,
                       int goldenPalmCount,
                       int usaBoxOffice,
                       String tagline,
                       MovieGenre genre) {
}


