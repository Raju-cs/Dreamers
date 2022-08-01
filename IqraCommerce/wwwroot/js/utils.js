import { READ_URL } from "./site.js";

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