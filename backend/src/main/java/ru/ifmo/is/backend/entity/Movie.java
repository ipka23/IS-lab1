package ru.ifmo.is.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.eclipse.persistence.annotations.BatchFetch;
import org.eclipse.persistence.annotations.BatchFetchType;

import java.util.Date;

@Entity
@Table(name = "movie")
@Getter
@Setter
@NoArgsConstructor
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1)
    private String name;

    @NotNull
    @Valid
    @Embedded
    private Coordinates coordinates;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creation_date")
    private Date creationDate;

    @Positive
    @Column(name = "oscars_count")
    private int oscarsCount;

    @Positive
    private int budget;

    @Positive
    @Column(name = "total_box_office")
    private float totalBoxOffice;

    @Enumerated(EnumType.STRING)
    @Column(name = "mpaa_rating")
    private MpaaRating mpaaRating;

    @ManyToOne
    @JoinColumn(name = "director_id")
    @BatchFetch(BatchFetchType.IN)
    private Person director;

    @ManyToOne
    @JoinColumn(name = "screenwriter_id")
    @BatchFetch(BatchFetchType.IN)
    private Person screenwriter;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "operator_id")
    @BatchFetch(BatchFetchType.IN)
    private Person operator;

    @Positive
    private int length;

    @Positive
    @Column(name = "golden_palm_count")
    private int goldenPalmCount;

    @Positive
    @Column(name = "usa_box_office")
    private int usaBoxOffice;

    @NotNull
    private String tagline;

    @NotNull
    @Enumerated(EnumType.STRING)
    private MovieGenre genre;

    @PrePersist
    void setCreationDateNow() {
        if (creationDate == null) {
            creationDate = new Date();
        }
    }
}
