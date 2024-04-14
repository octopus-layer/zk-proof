import { Field } from 'o1js';

const ORDER = Field.ORDER;

export function stringToField(str: string): Field {
    let value: bigint = BigInt(0);

    for (let i = 0; i < str.length; i++)
        value = (value + BigInt(str.charCodeAt(i))) % ORDER;

    return new Field(value);
};