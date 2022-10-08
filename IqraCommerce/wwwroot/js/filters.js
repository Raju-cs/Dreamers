export const OPERATION_TYPE = {
    EQUAL: 0,
    GREATERTHAN: 1,
    GREATEROREQUAL:2,
    LESSTHAN: 3,
    LESSOREQUAL: 4,
    CONTAINS: 5,
    STARTSWITH: 6,
    ENDSWITH: 7,
    SOUNDEQUAL: 8,
    SOUNDCONTAINS: 9,
    SOUNDSTARTWITH: 10,
    SOUNDENDWITH: 11,
    IN: 12,
    NOTIN: 13,
    NOTEQUAL: 14
}

export const trashRecord = { "field": "IsDeleted", "value": 1, Operation: 0 };

export const liveRecord = { "field": "IsDeleted", "value": 0, Operation: 0 };

export const visibleRecord = { "field": "IsVisible", "value": 1, Operation: 0 };

export const hiddenRecord = { "field": "IsVisible", "value": 0, Operation: 0 };


export const filter = (key, value, operation = operationType.equal) => {
    return { "field": key, "value": value, Operation: operation };
}