import { Slot } from "rpgjs-inventory";

export interface Action {
    id: string,
    type: ActionType,
    key: ActionKey,
    meta?: {
        slot?: Slot,
    },
    instance?: any,
}

export enum ActionType {
    Skill = 'skill',
    Item = 'item',
}

export enum ActionKey {
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
}

export interface ActionManager {
    databaseById(id: any): any,
    setAction(action: Action): void,
}

export class ActionManager {
    actions: Action[];

    constructor() {
        this.actions = [];
    }

    getAction(key: ActionKey): Action | null {
        const action = this.actions.find((action) => action.key === key);

        return action || null;
    }

    setAction(action: Action): void {
        const isValid = this._validateAction(action);

        if (!isValid) {
            return;
        }

        this.removeActionByKey(action.key);

        const objectClass = this.databaseById(action.id);
        const instance = new (objectClass)()
        action.instance = instance;

        this.actions.push(action);
    }

    removeActionByKey(key: ActionKey): void {
        const index = this.actions.findIndex((action) => action.key === key);

        if (index === -1) {
            return;
        }

        this.actions.splice(index, 1);
    }

    /** @internal */
    _validateAction(action: Action): boolean {
        if (action.type === ActionType.Item) {
            const item = this.databaseById(action.id);

            if (!item.consumable) {
                return false;
            }
        }

        return true;
    }
}
