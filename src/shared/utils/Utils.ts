export const isNil = (value: any): value is {} | undefined | null | '' | boolean | number => value === null || value === undefined;

export const isNumber = (value: any): value is number => typeof value === 'number';
