package io.github.felipeemerson.openmuapi.services;

import io.github.felipeemerson.openmuapi.entities.Banner;
import io.github.felipeemerson.openmuapi.repositories.BannerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static java.lang.Thread.sleep;

@Service
public class BannerService {

    private final BannerRepository bannerRepository;

    public BannerService(@Autowired BannerRepository bannerRepository) {
        this.bannerRepository = bannerRepository;
    }

    @Transactional
    public List<Banner> changeBanners(List<Banner> bannersUpdated) {
        List<Banner> oldBanners = this.bannerRepository.findAll();

        List<Banner> bannersToDelete = new ArrayList<>();
        Set<UUID> preexistingBannersIds = bannersUpdated.stream()
                .map(Banner::getId)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        for (Banner banner : oldBanners) {
            if (!preexistingBannersIds.contains(banner.getId())) {
                bannersToDelete.add(banner);
            }
        }

        if (!bannersToDelete.isEmpty()) {
            this.bannerRepository.deleteAll(bannersToDelete);
        }

        return this.bannerRepository.saveAll(bannersUpdated);
    }

    public List<Banner> getBanners() {
        return this.bannerRepository.findAll();
    }

}
