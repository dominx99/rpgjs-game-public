import { UpgradeChance } from "../server/src/service/UpgradeChance";

export const UpgradeChanceFake: UpgradeChance = {
    ofItem: () => 100,
    tryForItem: () => true,
}
