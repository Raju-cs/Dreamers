export const operationType = {
    equal: 0,
    greaterThan: 1,
    greaterOrEqual: 2,
    lessThan: 3,
    lessOrEqual: 4,
    contains: 5,
    startsWith: 6,
    endsWith: 7,
    soundEquals: 8,
    soundContains: 9,
    soundStartsWith: 10,
    soundEndsWith: 11,
    in: 12,
    notIn: 13,
    notEqual: 14
}

export const trashRecord = { "field": "IsDeleted", "value": 1, Operation: 0 };

export const liveRecord = { "field": "IsDeleted", "value": 0, Operation: 0 };

export const visibleRecord = { "field": "IsVisible", "value": 1, Operation: 0 };

export const hiddenRecord = { "field": "IsVisible", "value": 0, Operation: 0 };

export const filter = (key, value, operation = operationType.equal) => {
    return { "field": key, "value": value, Operation: operation };
}