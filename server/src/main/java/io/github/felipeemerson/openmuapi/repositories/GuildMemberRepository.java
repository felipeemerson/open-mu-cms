package io.github.felipeemerson.openmuapi.repositories;

import io.github.felipeemerson.openmuapi.entities.GuildMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GuildMemberRepository extends JpaRepository<GuildMember, UUID> {
}
