package ru.ifmo.is.backend.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static ru.ifmo.is.backend.utility.ValidationMessages.*;


@Entity
@Table(name = "person")
@Getter
@Setter
@NoArgsConstructor
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @NotBlank(message = NOT_BLANK)
    @Size(max = 255, message = MAX_LENGTH_255)
    @Column(name = "name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "eye_color", length = 16)
    private Color eyeColor;

    @NotNull(message = REQUIRED)
    @Enumerated(EnumType.STRING)
    @Column(name = "hair_color", nullable = false, length = 16)
    private Color hairColor;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "location_id")
    private Location location;

    @Positive(message = POSITIVE)
    @Column(name = "weight")
    private Integer weight;

    @NotNull(message = REQUIRED)
    @Enumerated(EnumType.STRING)
    @Column(name = "nationality", nullable = false, length = 32)
    private Country nationality;
}

