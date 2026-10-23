package ru.ifmo.is.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static ru.ifmo.is.backend.utility.ValidationMessages.*;

@Entity
@Table(name = "coordinates")
@Getter
@Setter
@NoArgsConstructor
public class Coordinates {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @NotNull(message = REQUIRED)
    @Min(value = -403, message = COORDINATES_X_MIN)
    @Column(name = "x", nullable = false)
    private Integer x;

    @Max(value = 851, message = COORDINATES_Y_MAX)
    @Column(name = "y", nullable = false)
    private int y;
}

