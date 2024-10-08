import { Class as RPGClass } from '@rpgjs/database';
import { ClassOptions as RPGClassOptions } from "@rpgjs/database/src/class";
import ClassGraphics from '../../graphics/ClassGraphics';
import { TypeOfClass } from '../utils/ClassTypes';

export interface ClassOptions extends RPGClassOptions, TypeOfClass {
    graphics: ClassGraphics,
}

export function Class(options: ClassOptions): (target: any, propertyKey: any) => void {
    return function (target: any) {
        RPGClass(options)(target);
    };
}
