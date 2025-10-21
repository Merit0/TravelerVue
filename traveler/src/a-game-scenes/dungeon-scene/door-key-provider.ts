import {DoorKeyBuilder} from "@/a-game-scenes/dungeon-scene/door-key-builder";
import {DoorKeyModel} from "@/a-game-scenes/dungeon-scene/door-key-model";

export class KeyProvider {
    static skeletonBone: DoorKeyModel = new DoorKeyBuilder()
        .id("key-skeleton-bone")
        .name("Skeleton Bone")
        .description("Opens the door to Skeleton King dungeon")
        .image("skeleton-bone-key.png")
        .build();
}