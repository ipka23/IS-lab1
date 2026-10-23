package ru.ifmo.is.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static ru.ifmo.is.backend.utility.ValidationMessages.*;

@Entity
@Table(name = "location")
@Getter
@Setter
@NoArgsConstructor
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "x", nullable = false)
    private double x;

    @NotNull(message = REQUIRED)
    @Column(name = "y", nullable = false)
    private Long y;

    @Pattern(regexp = NOT_BLANK_REGEX, message = NOT_BLANK)
    @Size(max = 255, message = MAX_LENGTH_255)
    @Column(name = "name")
    private String name;
}
