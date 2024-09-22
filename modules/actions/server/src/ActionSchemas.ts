export const actionSchema = {
    id: String,
    type: String,
    key: Number,
    meta: {
        slot: {
            backpack: String,
            slot: Number,
        },
    },
    instance: {
        icon: {
            $permanent: false,
        },
        cooldown: {
            $permanent: false,
        },
    }
}
