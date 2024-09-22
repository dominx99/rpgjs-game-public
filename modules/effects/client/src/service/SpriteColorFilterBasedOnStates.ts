import { RpgSprite } from "@rpgjs/client";
import { StateContract } from "../contracts/StateContract";
import { StateToFilterMap } from "../filters/StateToFilterMap";
import * as PIXI from 'pixi.js';

export class SpriteColorFilterBasedOnStates {
    update(sprite: RpgSprite, states: StateContract[]) {
        const stateIds = states.filter(state => !!state).map(state => state.id);

        const container = sprite.getLayoutContainer();

        let filters = container.filters || [] as PIXI.Filter[];
        filters = [...filters, ...this.addFilters(stateIds)]
        filters = this.removeFilters(filters, stateIds)

        container.filters = filters;
    }

    private addFilters(stateIds: string[]) {
        return stateIds.map(stateId => {
            const filterClass = StateToFilterMap[stateId];

            if (!filterClass) {
                return;
            }

            return new filterClass();
        })
    }

    private removeFilters(filters: PIXI.Filter[], stateIds: string[]) {
        return filters.filter(filter => {
            return stateIds.some(stateId => {
                return filter instanceof StateToFilterMap[stateId];
            })
        })
    }
}
