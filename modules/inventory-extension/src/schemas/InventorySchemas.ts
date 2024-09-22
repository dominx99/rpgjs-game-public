import { itemSchemas as inventoryItemSchemas } from "rpgjs-inventory/server/src/schemas/InventorySchemas";

export const itemSchemas = {
    ...inventoryItemSchemas,
    level: Number,
    requiredLevelToEquip: Number,
    attackAnimation: String,
    attackGraphic: String,
    weaponType: String,
    physicalAttackSkill: Object, // TODO: Refactor to string, object won't be saved
    slowdownOnHitPercentage: Number,
    bullet: String,
    distance: Number,
    magnificence: Number,
}
