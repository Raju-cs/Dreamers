import { url } from "../utils.js";
import params from "../utils/params.js";

const productId = params.id;

let selectedImages = [];

const renderButtons = (images = []) => {
    if (images.length > 0) {
        $('#button-save').show();
        $('#button-cancel').show();
    } else {
        $('#button-save').hide();
        $('#button-cancel').hide();
    }
}

const imagesChangeHandler = (e) => {
    selectedImages = [...selectedImages, ...e.target.files];

    renderPreviews(selectedImages);

    renderButtons(selectedImages);
}

const renderGallery = (images = []) => {
    if (images.length > 0) {
        $('#gallery-container').show();
        $('#no-image-text').hide();
    }
    else {
        $('#gallery-container').hide();
        $('#no-image-text').show();
    }

    $('#gallery .thumbnail').remove();

    const template = $('#template--thumbnail').html();

    images.forEach(image => {
        let thumbnail = template.replace('{{elementId}}', image.Id);
        thumbnail = template.replace('{{AlterText}}', image.Id);
        thumbnail = thumbnail.replace('{{imageURL}}', url(`/images/products/icon/${image.ImageURL}`));

        const $thumbnail = $(thumbnail);

        if (image.IsPrimary) $thumbnail.find('.button-primay').show();
        else $thumbnail.find('.button-set-as-primary').show();

        $thumbnail.find('.button-set-as-primary').click(e => setAsPrimary(image));
        $thumbnail.find('.thumbnail__image').click(e => showCase(image));
        $thumbnail.find('.button-remove-image').click(e => remove(image));

        $('#gallery').append($thumbnail);
    });
}

const removeSelectedImage = (e, images) => {
    const index = +e.target.dataset.id;

    selectedImages = images.filter((image, i) => i !== index);

    renderPreviews(selectedImages);

    renderButtons(selectedImages);
}

const renderPreviews = (images = []) => {
    let templateHTML = $('#template--preview-thumbnail').html();

    $('#previews .thumbnail').remove();

    images.forEach((image, i) => {
        let previewHTML = templateHTML.replace('{{imageURL}}', URL.createObjectURL(image));
        previewHTML = previewHTML.replace('{{element-id}}', i);

        const previewsContainerHTML = $('#previews').html() + previewHTML;

        $('#previews').html(previewsContainerHTML);
    });

    $('.preview-remove').click(e => removeSelectedImage(e, images));
}

const cancel = () => {
    selectedImages = [];
    $('#previews .thumbnail').remove();
    renderButtons(selectedImages);
}

const close = () => {
    const page = params.page ?? 1;
    const items = params.items ?? 5;

    window.open(`/Product?page=${page}&items=${items}`, "_self");
}

const save = () => {
    showLoader()

    const formData = new FormData();
    formData.append('id', productId);
    selectedImages.forEach(image => formData.append('images', image));

    $('upload-loader').hide();

    fetch('/Product/UploadImages', {
        body: formData,
        method: 'POST',
    }).finally(() => {
        $('upload-loader').hide();
    }).then(res => res.json())
        .then(data => {
            if (data.IsError)
                throw new Error(data.Msg);

            cancel();
            getImages();
        })
        .catch(err => console.log(err))
        .finally(() => {
            hideLoader();
        });
}

const getImages = () => {
    showLoader();

    const formData = new FormData();
    formData.append('id', productId);

    fetch('/Product/GetImages', {
        method: 'POST',
        body: formData,
    }).finally(() => {
        $('gallery-loader').hide();
    }).then(res => res.json())
        .then(data => {
            if (data.IsError)
                throw new Error(data.Msg);

            renderGallery(data.Data);
            showCase(data.Data);
            renderPrimaryImageSelectionWarning(data.Data);
        })
        .catch(err => console.log(err))
        .finally(() => {
            hideLoader();
        });
}

const setAsPrimary = (image) => {
    showLoader();

    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('imageId', image.Id);

    fetch('/Product/MarkImageAsPrimary', {
        method: 'POST',
        body: formData,
    }).finally(() => {
        $('gallery-loader').hide();
    }).then(res => res.json())
        .then(data => {
            if (data.IsError)
                throw new Error(data.Msg);

            renderGallery(data.Data);
            showCase(data.Data);
            renderPrimaryImageSelectionWarning(data.Data);
        })
        .catch(err => console.log(err))
        .finally(() => {
            hideLoader();
        });
}

const remove = (image) => {
    showLoader();

    $('gallery-loader').show();

    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('imageId', image.Id);

    fetch('/Product/RemoveImage', {
        method: 'POST',
        body: formData,
    }).finally(() => {
        $('gallery-loader').hide();
    }).then(res => res.json())
        .then(data => {
            if (data.IsError)
                throw new Error(data.Msg);

            renderGallery(data.Data);
            renderPrimaryImageSelectionWarning(data.Data);
        })
        .catch(err => console.log(err))
        .finally(() => {
            hideLoader();
        });
}

const showCase = (param) => {
    let image;

    if (Array.isArray(param))
        image = param.find(i => i.IsPrimary) ?? param[0];
    else
        image = param;

    if (!image) return;

    $('.show .thumbnail').show();
    $('#showcase').attr('src', url(`/images/products/small/${image?.ImageURL}`));
    $('#showcase').attr('alt', image?.Id);
}

const openImageSelector = () => {
    $('#input-images').click();
}

const showLoader = () => {
    $('#loader').css('display', 'flex');
}

const hideLoader = () => {
    $('#loader').css('display', 'none');
}

const renderPrimaryImageSelectionWarning = (images = []) => {
    if(images.length === 0) return;

    const image = images.find(i => i.IsPrimary);

    image ? $('#no-primay-image-warning').hide() : $('#no-primay-image-warning').show();
}

$(document).ready(() => {
    getImages();
    $('#button-cancel').hide();
    $('#button-save').hide();
    $('.submenu_container').text(params.name);
    $('#no-primay-image-warning').hide();
});
$('#input-images').change(imagesChangeHandler);
$('#button-save').click(save);
$('#button-cancel').click(cancel);
$('#button-close').click(close);
$('#ghost-button').click(openImageSelector);
