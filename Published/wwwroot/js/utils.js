import { READ_URL } from "./site.js";

export const visibleFieldDropdown = (position, sibling = 2 ) => ({
    title: 'Show in client',
    Id: 'IsVisible',
    dataSource: [
        { text: 'Yes', value: true },
        { text: 'No', value: false },
    ],
    add: { sibling },
    position,
})

export const url = (endpoint) => {
    return endpoint ? `${READ_URL}${endpoint}` : null;
}

export function dateBound(el, date) {
    if (!date) el.html('');
    el.html(new Date(date).toLocaleString('en-US'));
}

export function imageBound(td, x, prop) {
    console.log(prop);
    td.html(`<img src="${url(this[prop.field])}" style="max-height: 80px; max-width: 100%;" />`);
}