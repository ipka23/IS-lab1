package ru.ifmo.is.backend.entity;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class Coordinates {

    @NotNull
    @Min(-403)
    private Integer x;

    @Max(851)
    private int y;
}
