import { fullDate } from '../utils/date.js';
import params from '../utils/params.js';

const DOM = (query) => {
    return document.querySelector(query);
};

const getInvoiceData = (id) => {
    const formData = new FormData();
    formData.append('id', id);

    return fetch('/Order/InvoiceData', {
        method: 'POST',
        body: formData,
    })
    .then(res => res.json())
    .then(data => data.IsError ? new Error("Something went wrong") : data.Data)
    .catch(err => console.log(err));
}

const bind = (data) => {
    console.log(data);
    DOM("#username").innerHTML = data.Order.ContactPerson;
    DOM("#order-no").innerHTML = data.Order.OrderNumber;
    DOM("#phone").innerHTML = data.Order.ContactPhone;
    DOM("#order-date").innerHTML = fullDate(data.Order.CreatedAt);
    DOM("#order-today").innerHTML = fullDate(new Date());
    DOM("#address").innerHTML = data.Order.Address;

    const rowTemplate = DOM("#product-row-template").innerHTML;
    const productRows = data.Products.map((p, i) =>
      renderProductRowHTML(rowTemplate, p, i)
    );
    DOM("#products tbody").innerHTML = productRows.join("");

    const subtotal = calcSubtotal(data.Products);

    DOM('#sub-total').innerText = subtotal.toFixed(2) + 'Tk';
    DOM('#coupon-discount').innerText = -data.Order.CouponDiscount.toFixed(2) + 'Tk';
    DOM('#order-value').innerText = (subtotal - data.Order.CouponDiscount).toFixed(2) + 'Tk';
    DOM('#delivery-charge').innerText = data.Order.ShippingCharge.toFixed(2) + 'Tk';
    DOM('#payable').innerText = data.Order.PayableAmount.toFixed(2) + 'Tk';
}

const renderProductRowHTML = (template = "", data, i) => {
    template = template.replace("{i}", i + 1);
    template = template.replace("{p.Name}", data.Name);
    template = template.replace("{p.PackSize}", data.PackSize);
    template = template.replace("{p.UnitName}", data.UnitName);
    template = template.replace("{price}", data.CurrentPrice.toFixed(2));
    template = template.replace("{oldPrice}", data.OriginalPrice.toFixed(2));
    template = template.replace("{Quantity}", data.Quantity);
    template = template.replace("{DiscountTotal}", (data.Quantity * data.DiscountedPrice).toFixed(2));
    template = template.replace("{PayableAmount}", (data.Quantity * data.CurrentPrice).toFixed(2));

    return template;
  };
  
  const calcSubtotal = (products) => {
    let sum = 0;
    products.forEach(p => {
        sum += p.CurrentPrice * p.Quantity;
    });

    return sum;
  }

window.onload = () => {
    const id = params["id"];
    if(!id) window.close();

    getInvoiceData(id)
    .then(data => bind(data));
}

