package io.github.felipeemerson.openmuapi.repositories;

import io.github.felipeemerson.openmuapi.entities.Banner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BannerRepository extends JpaRepository<Banner, UUID> {
}
