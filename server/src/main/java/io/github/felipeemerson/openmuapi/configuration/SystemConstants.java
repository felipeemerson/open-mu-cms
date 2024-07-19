package io.github.felipeemerson.openmuapi.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.Collection;

@Component
public class SystemConstants {

    public static final int RESET_REQUIRED_LEVEL = 400;
    public static final int RESET_LIMIT = -1; // -1 if no limit
    public static final int RESET_REQUIRED_ZEN = 1;
    public static final boolean RESET_MULTIPLY_REQUIRED_ZEN = true;
    public static final int LEVEL_AFTER_RESET = 1;
    public static final int POINTS_PER_RESET = 200;
    public static final int MAX_STATS_POINTS = 65535;

    public static final Set<String> DK_CLASSES = Set.of("Dark Knight", "Blade Knight", "Blade Master");
    public static final Set<String> DW_CLASSES = Set.of("Dark Wizard", "Soul Master", "Grand Master");
    public static final Set<String> ELF_CLASSES = Set.of("Fairy Elf", "Muse Elf", "High Elf");
    public static final Set<String> MG_CLASSES = Set.of("Magic Gladiator", "Duel Master");
    public static final Set<String> DL_CLASSES = Set.of("Dark Lord", "Lord Emperor");
    public static final Set<String> SUM_CLASSES = Set.of("Summoner", "Bloody Summoner", "Dimension Master");
    public static final Set<String> RF_CLASSES = Set.of("Rage Fighter", "Fist Master");
    public static final Set<String> ALL_CLASSES = Stream.of(DK_CLASSES, DW_CLASSES, ELF_CLASSES, MG_CLASSES,
                                                DL_CLASSES, SUM_CLASSES, RF_CLASSES)
                                                .flatMap(Collection::stream)
                                                .collect(Collectors.toSet());;

    public static final UUID RESETS_DEFINITION_ID = UUID.fromString("89a891a7-f9f9-4ab5-af36-12056e53a5f7");
    public static final UUID LEVEL_DEFINITION_ID = UUID.fromString("560931ad-0901-4342-b7f4-fd2e2fcc0563");
    public static final UUID MASTER_LEVEL_DEFINITION_ID = UUID.fromString("70cd8c10-391a-4c51-9aa4-a854600e3a9f");
    public static final UUID STRENGTH_DEFINITION_ID = UUID.fromString("123282fe-fead-448e-ad2c-baece939b4b1");
    public static final UUID AGILITY_DEFINITION_ID = UUID.fromString("1ae9c014-e3cd-4703-bd05-1b65f5f94ceb");
    public static final UUID VITALITY_DEFINITION_ID = UUID.fromString("6ca5c3a6-b109-45a5-87a7-fdcb107b4982");
    public static final UUID ENERGY_DEFINITION_ID = UUID.fromString("01b0ef28-f7a0-46b5-97ba-2b624a54cd75");
    public static final UUID COMMAND_DEFINITION_ID = UUID.fromString("6af2c9df-3ae4-4721-8462-9a8ec7f56fe4"); // base leadership in DB

    public static final String ONLINE_PLAYERS_ENDPOINT = "/api/status";
    public static final String SEND_MESSAGE_ENDPOINT = "/api/send";
    public static final String IS_ACCOUNT_ONLINE_ENDPOINT = "/api/is-online";

    public static String ADMIN_PANEL_URL;

    @Value("${admin.panel.url}")
    public void setAdminPanelUrl(String url) {
        ADMIN_PANEL_URL = url;
    }

}
