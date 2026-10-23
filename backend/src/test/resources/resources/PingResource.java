package ru.ifmo.is.backend.resources;

import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/")
@RequestScoped
public class PingResource {
    @PersistenceContext(unitName = "default")
    EntityManager em;

    @GET
    @Path("/ping")
    @Produces(MediaType.TEXT_PLAIN)
    public String ping() {
        return "pong";
    }

    @GET
    @Path("/count")
    @Produces(MediaType.TEXT_PLAIN)
    public String count() {
        Long n = em.createQuery("select count(m) from Movie m", Long.class).getSingleResult();
        return "movies: " + n;
    }
}

