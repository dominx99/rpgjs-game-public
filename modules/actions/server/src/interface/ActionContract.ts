import { ActionKey, ActionType } from "../ActionManager";

export interface ActionContract {
    key: ActionKey;
    id: string;
    type: ActionType;
    meta?: {
        slot?: {
            backpack: string;
            slot: number;
        }
    },
    instance?: {
        icon: string;
        cooldown: number;
    }
}

export type MappedActionContract = ActionContract & {
    quantity?: number;
    cooldownTime?: number;
}
