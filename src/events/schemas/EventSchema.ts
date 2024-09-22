import { RpgPlayer } from "@rpgjs/server";
import { graphicsSchemas } from "../../graphics/GraphicSchemas";
import { StateSchema } from "../../../modules/effects/server/src/schemas/StateSchema";
import { PoppingNumberSchema } from "../../../modules/popping-numbers/server/schemas/PoppingNumberSchema";

const baseSchema = {
    graphics: graphicsSchemas,
    canPreviewProfile: Boolean,
    previewCustomParams: {
        marginTop: String,
        scale: Number,
        position: {
            x: Number,
            y: Number,
        },
    },
    states: [StateSchema],
    stateTimers: [{
        since: Number,
        until: Number,
    }],
    poppingNumber: PoppingNumberSchema,
}

export const EventSchema = {
    ...RpgPlayer.schemas,
    ...baseSchema,
    events: {
        ...RpgPlayer.schemas.events,
        ...baseSchema
    }
}
