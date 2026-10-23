package ru.ifmo.is.backend.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import ru.ifmo.is.backend.entity.Movie;
import ru.ifmo.is.backend.entity.Person;

import java.util.List;
import java.util.Set;

@ApplicationScoped
public class MovieService {

    private static final Set<String> FILTER_FIELDS = Set.of("name", "tagline");

    private static final Set<String> SORT_FIELDS = Set.of(
            "id", "name", "tagline", "oscarsCount", "budget", "totalBoxOffice", "length",
            "goldenPalmCount", "usaBoxOffice", "creationDate", "genre", "mpaaRating");

    @PersistenceContext(unitName = "moviePU")
    private EntityManager em;

    public List<Movie> list(int page, int size, String filterField, String filterText,
                            String sortField, String sortDir) {
        TypedQuery<Movie> query = em.createQuery(
                "SELECT m FROM Movie m" + whereClause(filterField, filterText) + orderClause(sortField, sortDir),
                Movie.class);
        setFilter(query, filterText);
        query.setFirstResult(page * size);
        query.setMaxResults(size);
        return query.getResultList();
    }

    public long count(String filterField, String filterText) {
        TypedQuery<Long> query = em.createQuery(
                "SELECT COUNT(m) FROM Movie m" + whereClause(filterField, filterText), Long.class);
        setFilter(query, filterText);
        return query.getSingleResult();
    }

    public Movie find(Long id) {
        return em.find(Movie.class, id);
    }

    @Transactional
    public Movie create(Movie movie) {
        resolvePersons(movie);
        em.persist(movie);
        return movie;
    }

    @Transactional
    public Movie update(Long id, Movie data) {
        Movie old = em.find(Movie.class, id);
        if (old == null) {
            return null;
        }
        data.setId(id);
        data.setCreationDate(old.getCreationDate());
        resolvePersons(data);
        return em.merge(data);
    }

    @Transactional
    public boolean delete(Long id) {
        Movie movie = em.find(Movie.class, id);
        if (movie == null) {
            return false;
        }
        em.remove(movie);
        return true;
    }

    private void resolvePersons(Movie movie) {
        movie.setDirector(findPerson(movie.getDirector()));
        movie.setScreenwriter(findPerson(movie.getScreenwriter()));
        movie.setOperator(findPerson(movie.getOperator()));
    }

    private Person findPerson(Person person) {
        if (person == null) {
            return null;
        }
        if (person.getId() == null) {
            throw new IllegalArgumentException("person id is required");
        }
        Person found = em.find(Person.class, person.getId());
        if (found == null) {
            throw new IllegalArgumentException("person with id " + person.getId() + " not found");
        }
        return found;
    }

    private String whereClause(String filterField, String filterText) {
        if (filterText == null || filterText.isBlank()) {
            return "";
        }
        if (!FILTER_FIELDS.contains(filterField)) {
            throw new IllegalArgumentException("cannot filter by field: " + filterField);
        }
        return " WHERE LOWER(m." + filterField + ") LIKE :text";
    }

    private String orderClause(String sortField, String sortDir) {
        if (!SORT_FIELDS.contains(sortField)) {
            throw new IllegalArgumentException("cannot sort by field: " + sortField);
        }
        String direction = "desc".equalsIgnoreCase(sortDir) ? "DESC" : "ASC";
        return " ORDER BY m." + sortField + " " + direction;
    }

    private void setFilter(Query query, String filterText) {
        if (filterText == null || filterText.isBlank()) {
            return;
        }
        query.setParameter("text", "%" + filterText.toLowerCase() + "%");
    }
}
