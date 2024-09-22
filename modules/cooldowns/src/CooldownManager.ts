export enum CooldownType {
    Skill = 'skill',
    Item = 'item',
    Chat = 'chat',
}

export interface Cooldown {
    id: string;
    type: CooldownType;
    after: number;
}

export interface CooldownManager {
    cooldowns: Cooldown[];
    addCooldown(id: string, type: CooldownType, cooldown: number): void;
    getCooldown(id: string, type: CooldownType): Cooldown | null;
    hasCooldown(id: string, type: CooldownType): boolean;
}

export class CooldownManager {
    cooldowns: Cooldown[];

    addCooldown(id: string, type: CooldownType, cooldown: number) {
        if (this.hasCooldown(id, type)) {
            this.removeCooldown(id, type);
        }

        this.cooldowns.push({
            id,
            type,
            after: Date.now() + cooldown,
        });
    }

    getCooldown(id: string, type: CooldownType): Cooldown | null {
        return this.cooldowns.find(cooldown => cooldown.id === id && cooldown.type === type) || null;
    }

    hasCooldown(id: string, type: CooldownType): boolean {
        let hasCooldown = false;
        const cooldown = this.getCooldown(id, type);

        if (!cooldown) {
            return hasCooldown;
        }

        hasCooldown = Date.now() < cooldown.after;

        if (hasCooldown) {
            return hasCooldown;
        }

        this.removeCooldown(id, type);

        return hasCooldown;
    }

    removeCooldown(id: string, type: CooldownType) {
        const cooldownIndex = this.cooldowns.findIndex(cooldown => cooldown.id === id && cooldown.type === type);

        if (cooldownIndex === -1) {
            return;
        }

        this.cooldowns.splice(cooldownIndex, 1);
    }
}
