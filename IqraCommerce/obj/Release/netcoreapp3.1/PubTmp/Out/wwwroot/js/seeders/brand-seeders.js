
const generateBrandName = (ascii) => {
    let text = '';
    for(let i = 0; i < 5; ++i){
        if(ascii > 90) ascii -= 26;
        text += String.fromCharCode(ascii);
        ascii++
    }
    return text;
}

const postBrand = (ascii) => {
    if(ascii > 90) return;

    const formdata = new FormData();
    formdata.append('Name', generateBrandName(ascii));
    formdata.append('Description', "Desription For " + generateBrandName(ascii));
    formdata.append('Remarks', 'Remarks ' + generateBrandName(ascii));
    formdata.append('IsVisible', true);

     fetch('http://localhost:56700/Brand/Create', {
        method: 'POST',
        headers: {
            "content-type": "text/json"
        },
        body: formdata
    }).then(()=>{
        console.log("success!!");
    }).catch(() => {
        console.log("failed" + generateBrandName(ascii));
    }).finally(() => {
        postBrand(++ascii);
    });
}

postBrand(65);