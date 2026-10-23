package ru.ifmo.is.backend.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import ru.ifmo.is.backend.entity.Person;

import java.util.List;

@ApplicationScoped
public class PersonService {

    @PersistenceContext(unitName = "moviePU")
    private EntityManager em;

    public List<Person> list() {
        return em.createQuery("SELECT p FROM Person p ORDER BY p.id", Person.class).getResultList();
    }

    @Transactional
    public Person create(Person person) {
        em.persist(person);
        return person;
    }

    @Transactional
    public boolean delete(Long id) {
        Person person = em.find(Person.class, id);
        if (person == null) {
            return false;
        }
        Long usage = em.createQuery(
                        "SELECT COUNT(m) FROM Movie m WHERE m.director = :p OR m.screenwriter = :p OR m.operator = :p",
                        Long.class)
                .setParameter("p", person)
                .getSingleResult();
        if (usage > 0) {
            throw new ConflictException("Персону нельзя удалить: она связана с фильмами");
        }
        em.remove(person);
        return true;
    }
}
