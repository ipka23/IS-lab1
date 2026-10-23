package ru.ifmo.is.backend.dto;

import ru.ifmo.is.backend.entities.Color;
import ru.ifmo.is.backend.entities.Country;

public record PersonDto(Long id, String name, Color eyeColor, Color hairColor,
                        LocationDto location, Integer weight, Country nationality) {
}