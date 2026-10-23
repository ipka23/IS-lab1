package ru.ifmo.is.backend.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import ru.ifmo.is.backend.entity.Movie;
import ru.ifmo.is.backend.entity.Person;

import java.util.List;

@ApplicationScoped
public class SpecialService {

    @PersistenceContext(unitName = "moviePU")
    private EntityManager em;

    public long goldenPalmSum() {
        Number sum = (Number) em.createNativeQuery("SELECT golden_palm_sum()").getSingleResult();
        return sum.longValue();
    }

    public Movie latestMovie() {
        List<Movie> movies = em.createNativeQuery("SELECT * FROM movie_latest()", Movie.class).getResultList();
        return movies.isEmpty() ? null : movies.get(0);
    }

    public List<Movie> usaBoxOfficeGreater(int value) {
        return em.createNativeQuery("SELECT * FROM movies_usa_box_office_greater(?1)", Movie.class)
                .setParameter(1, value)
                .getResultList();
    }

    public List<Person> screenwritersWithoutOscars() {
        return em.createNativeQuery("SELECT * FROM screenwriters_without_oscars()", Person.class)
                .getResultList();
    }

    @Transactional
    public int awardLongMovies(int minLength, int oscars) {
        Number updated = (Number) em.createNativeQuery("SELECT award_long_movies(?1, ?2)")
                .setParameter(1, minLength)
                .setParameter(2, oscars)
                .getSingleResult();
        return updated.intValue();
    }
}
