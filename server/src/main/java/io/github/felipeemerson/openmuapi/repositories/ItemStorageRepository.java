package io.github.felipeemerson.openmuapi.repositories;

import io.github.felipeemerson.openmuapi.entities.ItemStorage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ItemStorageRepository extends JpaRepository<ItemStorage, UUID> {
}
