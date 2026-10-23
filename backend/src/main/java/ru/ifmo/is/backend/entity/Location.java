package ru.ifmo.is.backend.entity;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class Location {

    private double x;

    @NotNull
    private Long y;

    @Size(min = 1)
    private String name;
}
