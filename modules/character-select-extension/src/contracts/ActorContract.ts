import ClassGraphics from "../../../../src/graphics/ClassGraphics";

export interface ActorContract {
    id: string,
    name: string,
    description: string,
    class: {
        name: string,
        type: string,
        graphics: ClassGraphics,
    }
}
