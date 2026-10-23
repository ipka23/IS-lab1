package ru.ifmo.is.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "person")
@Getter
@Setter
@NoArgsConstructor
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "eye_color")
    private Color eyeColor;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "hair_color")
    private Color hairColor;

    @Valid
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "x", column = @Column(name = "location_x")),
            @AttributeOverride(name = "y", column = @Column(name = "location_y")),
            @AttributeOverride(name = "name", column = @Column(name = "location_name"))
    })
    private Location location;

    @Positive
    private Integer weight;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Country nationality;
}
