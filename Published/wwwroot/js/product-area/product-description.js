import { params } from "../utils/utils.js";

const productId = params.id;

$(document).ready(function () {
    $('#summernote').summernote();
    $('.submenu_container').text(params.name);
});

$('#save').click(() => { save() });
$('#cancle').click(() => { getProduct(productId) });
$('#close').click(() => { closeTab() });


const bind = (product) => {
    var html = `${product.Description || product.Name}`;
    $('#summernote').summernote('code', html);
}

const getProduct = (productId) => {
    const formData = new FormData();
    formData.append('Id', productId);

    fetch('/Product/ProductDescription', {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            if (data.IsError)
                throw new Error(data.Msg)

            bind(data.Data);
            // Toaster will be perfact here
        })
        .catch((err) => {
            alert(err);
        });
}

const closeTab = () => {
    const page = params.page ?? 1;
    const items = params.items ?? 5;

    window.open(`/Product?page=${page}&items=${items}`, "_self");
}

const save = () => {
    const html = $('#summernote').summernote('code');

    const formData = new FormData();
    formData.append('Description', html);
    formData.append('Id', productId);

     fetch('/Product/SaveDescription', {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            if (data.IsError)
                throw new Error(data.Msg)

            bind(data.Data);
            // Toaster will be perfact here
            alert("Saved Successfully");
        })
        .catch((err) => {
            alert(err);
        });
}

getProduct(productId);



