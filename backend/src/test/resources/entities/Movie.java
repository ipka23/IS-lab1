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
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.eclipse.persistence.annotations.BatchFetch;
import org.eclipse.persistence.annotations.BatchFetchType;

import java.util.Date;

import static ru.ifmo.is.backend.utility.ValidationMessages.*;

@Entity
@Table(name = "movie")
@Getter
@Setter
@NoArgsConstructor
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Positive
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @NotBlank(message = NOT_BLANK)
    @Size(max = 255, message = MAX_LENGTH_255)
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull(message = REQUIRED)
    @ManyToOne(optional = false, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "coordinates_id", nullable = false)
    @BatchFetch(BatchFetchType.IN)
    private Coordinates coordinates;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creation_date", nullable = false, updatable = false)
    private Date creationDate;

    @Positive(message = POSITIVE)
    @Column(name = "oscars_count", nullable = false)
    private int oscarsCount;

    @Positive(message = POSITIVE)
    @Column(name = "budget", nullable = false)
    private int budget;

    @Positive(message = POSITIVE)
    @Column(name = "total_box_office", nullable = false)
    private float totalBoxOffice;

    @Enumerated(EnumType.STRING)
    @Column(name = "mpaa_rating", length = 8)
    private MpaaRating mpaaRating;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "director_id")
    @BatchFetch(BatchFetchType.IN)
    private Person director;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "screenwriter_id")
    @BatchFetch(BatchFetchType.IN)
    private Person screenwriter;

    @NotNull(message = REQUIRED)
    @ManyToOne(optional = false, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "operator_id", nullable = false)
    @BatchFetch(BatchFetchType.IN)
    private Person operator;

    @Positive(message = POSITIVE)
    @Column(name = "length", nullable = false)
    private int length;

    @Positive(message = POSITIVE)
    @Column(name = "golden_palm_count", nullable = false)
    private int goldenPalmCount;

    @Positive(message = POSITIVE)
    @Column(name = "usa_box_office", nullable = false)
    private int usaBoxOffice;

    @NotNull(message = REQUIRED)
    @Size(max = 1000, message = MAX_LENGTH_1000)
    @Column(name = "tagline", nullable = false, length = 1000)
    private String tagline;

    @NotNull(message = REQUIRED)
    @Enumerated(EnumType.STRING)
    @Column(name = "genre", nullable = false, length = 16)
    private MovieGenre genre;

    @PrePersist
    void generateCreationDate() {
        if (creationDate == null) {
            creationDate = new Date();
        }
    }
}