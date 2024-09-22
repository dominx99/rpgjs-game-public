import { ActionKey } from "./ActionManager";

interface Shortcuts {
    [key: string]: ActionKey;
}

export default class ShortcutManager {
    defaultShortcuts: Shortcuts;
    shortcuts: Shortcuts;

    getShortcut(input: string): ActionKey | null {
        if (this.shortcuts[input]) {
            return this.shortcuts[input];
        }

        if (this.defaultShortcuts[input]) {
            return this.defaultShortcuts[input];
        }

        return null;
    }

    setShortcut(input: string, action: ActionKey) {
        if (this.defaultShortcuts[input] === action) {
            return;
        }

        this.shortcuts[input] = action;
    }
}
