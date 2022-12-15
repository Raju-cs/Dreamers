export const print = (report) => {
    const windowToPrint = window.open("", "PRINT", "height=800,width=1200");

    windowToPrint.document.write(`<!DOCTYPE html><html lang="en">`);

    renderHTML(windowToPrint, report);

    windowToPrint.document.write(`</body></html>`);
    windowToPrint.document.close();
    windowToPrint.focus();
};
// ${}
const renderHTML = (windowToPrint, report) => {
    // <head></head>
    renderPageHeader(windowToPrint);

    // <body>
    renderOpeningBodyTab(windowToPrint);

    // <header></header>
    renderReportHeader(windowToPrint, report);

    renderPersonalInfo(windowToPrint, report);

    renderParentInfo(windowToPrint, report);

    renderAddresses(windowToPrint, report);

    renderAcademicHistory(windowToPrint, report);

    renderSignatories(windowToPrint, report);

    renderClosingTags(windowToPrint);
};

const renderPageHeader = (windowToPrint) => {
    windowToPrint.document.write(`
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${'Student Form'}</title>
        <style>
             body {
                margin: 0;
                padding: 0;
                font-size: 16px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                font-family: "Poppins", sans-serif;
            }
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p {
                margin: 0;
                padding: 0;
            }

            .container {
                max-width: 800px;
                width: 100%;
                margin: 0 auto;
                padding: 20px 20px;
                border: 1px solid #ddd;
                margin-top: 10px;
                margin-bottom: 10px;
                position: relative;
                z-index: 1;
                box-sizing: border-box;
                overflow: hidden;
            }

            .header-area {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .inner-right a img {
                width: 140px;
                height: auto;
            }
            .header-left img {
                width: 220px;
                height: auto;
            }

            .inner-right {
                width: 130px;
                text-align: center;
                border: none;
                height: 130px;
                line-height: 130px;
                float: right;
            }

            .inner-right a {
                text-decoration: none;
                text-transform: uppercase;
                color: #000;
            }

            .header-left > h1 {
                font-size: 32px;
                font-weight: 800;
                color: #000;
            }

            .info-short h2 {
                font-size: 17px;
                font-weight: 500;
                line-height: 1.5;
            }

            .info-short {
                margin-top: 5px;
            }

            .header-left {
                flex: 0 0 70%;
            }

            .header-right {
                flex: 0 0 30%;
            }

            .nickName::after {
                position: absolute;
                content: "";
                left: 181px;
                bottom: 3px;
                width: 60%;
                border: 1px dashed #000;
            }

            .nickName {
                position: relative;
            }

            .nickName span {
                font-weight: 400;
                padding-left: 5px;
            }

            span {
                font-weight: 400;
                padding-left: 5px;
            }

            .cmn-heading {
                font-weight: 600;
                text-decoration: underline;
                display: block;
                padding: 10px 0px;
                padding-bottom: 4px;
            }

            .info-repeat-grid {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 8px 0px;
            }

            .parents-information-main .cmn-heading {
                padding-top: 0;
            }

            .cmn-text {
                font-size: 14px;
                font-weight: 500;
                line-height: 2;
            }

            .repeat-item h4 {
                position: relative;
            }

         .repeat-item h4::after {
                position: absolute;
                content: "";
                left: 190px;
                bottom: 4px;
                width: 71%;
                border: 1px dashed #000;
            }
            .repeat-item h4 span {
                position: relative;
                bottom: 1px;
            }
            .d-flex {
                display: flex;
                align-items: center;
            }

            .dob.d-flex {
                flex: 0 0 42%;
            }

            .blood.d-flex {
                flex: 0 0 21%;
            }

            .phone.d-flex {
                flex: 0 0 41%;
            }

            .dob-list {
                display: flex;
                border: 1px solid #000;
                width: 167px;
                margin-left: 5px;
                line-height: 25px;
                padding-left: 9px;
            }

            .dob-list span {
                border-right: 1px solid #000;
                flex: 0 0 19.5px;
                text-align: center;
                padding-left: 0px;
            }

            .dob .dob-list span:last-child {
                border-right: 0px;
            }

            .blood.d-flex span {
                border: 1px solid #000;
                flex: 0 0 25px;
                margin-left: 2px;
                height: 22px;
                line-height: 22px;
            }

            .phone.d-flex span {
                border: 1px solid #000;
                flex: 0 0 120px;
                margin-left: 2px;
                height: 22px;
                 line-height: 22px;
            }

            .dob-list span {
                border-right: 1px solid #000;
                padding-left: 0px;
            }

            .gender.d-flex span {
            }

            .gender.d-flex {
                flex: 0 0 33%;
            }

            .repeat-item.parents-info h4::after {
                left: 97px;
                width: 84%;
            }
            .ftr-info-flex {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .ftr-info-flex .repeat-item.parents-info {
                flex: 0 0 51%;
            }

            .repeat-item.parents-info.parents-info-email h4::after {
                width: 43%;
            }

            .parents-info-common {
                margin-bottom: 10px;
            }

            .repeat-item h4 small {
                opacity: 0;
                visibility: hidden;
            }

            .repeat-item.parents-info.new-permanent h4::after {
                left: 130px;
                width: 78%;
            }

            .add-inner-flex {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .add-inner-flex .cmn-text {
                flex: 0 0 50%;
            }

            .cmn-text.new-text {
                flex: 0 0 40%;
            }
            h4.cmn-text.new-text:after {
                left: 94px !important;
            }

            .cmn-text.new-text:after {
                left: 105px !important;
                width: 61% !important;
            }

            .info-repeat-grid.info-repeat-grid-clg .gender.d-flex {
                flex: 0 0 20%;
            }

            .signature-area {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .sig-left > h5 {
                border-top: 1px dashed #000;
                display: ;
            }

            .sig-left span {
                text-align: center;
                display: block;
            }

            .info-repeat-grid.info-repeat-grid-clg {
                display: grid;
                grid-template-columns: repeat(5, auto);
            }

            .acadmic-information-main .cmn-heading {
                padding-top: 0;
            }
            .sig-left {
                margin-top: 44px;
            }
            .cmn-text2 span{
                padding-left: 0px;
            }
        </style>
    </head>`);
};

const renderOpeningBodyTab = (windowToPrint) => {
    windowToPrint.document.write(`<body><div class="container">`);
}

const renderReportHeader = (windowToPrint, report) => {
    windowToPrint.document.write(`
     <header class="header-area">
        <div class="header-left">
            <img src="../../images/logo.png" alt="logo" />
            <h1>Student's Information</h1>
            <div class="info-short">
                <h2>DREAMERs ID: <span> ${report.DreamersId}</span></h2>
                <h2 class="nickName">Nick Name (Students) : <span> ${report.NickName}</span></h2>
            </div>
        </div>
        <div class="header-right">
            <div class="inner-right">
                <a href="#">
                    <img src=${report.SmallImageURL} alt="st">
                </a>
            </div>
        </div>
    </header>
    `);
}

const renderPersonalInfo = (windowToPrint, report) => {
    windowToPrint.document.write(`
   <div class="personal-information-main">
        <h3 class="cmn-heading">Students Personal Information :</h3>
        <div class="personal-info-inner">
            <div class="repeat-item">
                <h4 class="cmn-text">Students Full Name (English) :<span>${report.Name}</span> </h4>
            </div>
            <div class="repeat-item">
                <h4 class="cmn-text">Students Full Name (Bangla) : ${report.StudentNameBangla}</h4>
            </div>
            <div class="info-repeat-grid">
                <div class="dob d-flex">
                    <h5 class="cmn-text">Dath of Birth :</h5>
                    <div class="dob-list">
                        ${formattedDate(report.DateOfBirth)}
                    </div>
                </div>
                <div class="blood d-flex">
                    <h5 class="cmn-text">Blood Group :</h5>
                    <span>${report.BloodGroup}</span>
                </div>
                <div class="phone d-flex">
                    <h5 class="cmn-text">Phone (Personal) :</h5>
                    <span>${report.PhoneNumber}</span>
                </div>
            </div>
            <div class="info-repeat-grid">
                <div class="gender d-flex">
                    <h5 class="cmn-text">Gender :</h5>
                     <span>${report.Gender}</span>
                </div>
                <div class="gender d-flex">
                    <h5 class="cmn-text">Religion :</h5>
                    <span>${report.Religion}</span>
                </div>
                <div class="gender d-flex">
                    <h5 class="cmn-text">Nationality :</h5>
                    <span>${report.Nationality}</span>
                </div>
            </div>
        </div>
    </div>
    `);
}

const renderParentInfo = (windowToPrint, report) => {
    windowToPrint.document.write(`
    <div class="parents-information-main">
        <h3 class="cmn-heading">Parents Information :</h3>
        <div class="parents-information-inner">
            <!-- single item -->
            <div class="parents-info-common">
                <div class="repeat-item parents-info">
                    <h4 class="cmn-text">Father's Name :<span>${report.FathersName}</span> </h4>
                </div>
                <div class="ftr-info-flex">
                    <div class="repeat-item parents-info">
                        <h4 class="cmn-text">Occupation &nbsp;&nbsp; :<span>${report.FathersOccupation}</span> </h4>
                    </div>
                    <div class="phone d-flex">
                        <h5 class="cmn-text">Phone Number :</h5>
                        <span>${report.FathersPhoneNumber}</span>
                        
                    </div>
                </div>
                <div class="repeat-item parents-info parents-info-email">
                    <h4 class="cmn-text">Email Address:<span>${report.FathersEmail}</span> </h4>
                </div>
            </div>
            <!-- single item -->
            <div class="parents-info-common">
                <div class="repeat-item parents-info">
                    <h4 class="cmn-text">Mother's Name :<span>${report.MothersName}</span> </h4>
                </div>
                <div class="ftr-info-flex">
                    <div class="repeat-item parents-info">
                        <h4 class="cmn-text">Occupation &nbsp;&nbsp; :<span>${report.MothersOccupation}</span> </h4>
                    </div>
                    <div class="phone d-flex">
                        <h5 class="cmn-text">Phone Number :</h5>
                         <span>${report.MothersPhoneNumber}</span>
                        
                    </div>
                </div>
                <div class="repeat-item parents-info parents-info-email">
                    <h4 class="cmn-text">Email Address: <span>${report.MothersEmail}</span> </h4>
                </div>
            </div>
            <!-- single item -->
            <div class="parents-info-common">
                <div class="repeat-item parents-info">
                    <h4 class="cmn-text">Guardian Name:<span>${report.GuardiansName}</span> </h4>
                </div>
                <div class="ftr-info-flex">
                    <div class="repeat-item parents-info">
                        <h4 class="cmn-text">Occupation &nbsp;&nbsp; :<span>${report.GuardiansOccupation}</span></h4>
                    </div>
                    <div class="phone d-flex">
                        <h5 class="cmn-text">Phone Number :</h5>
                        <span>${report.GuardiansPhoneNumber}</span>
                        
                    </div>
                </div>
                <div class="repeat-item parents-info parents-info-email">
                    <h4 class="cmn-text">Email Address:<span>${report.GuardiansEmail}</span> </h4>
                </div>
            </div>
        </div>
    </div>
    `);
}

const renderAddresses = (windowToPrint, report) => {
    windowToPrint.document.write(`
     <div class="prasent-address-main">
        <div class="repeat-item parents-info new-permanent">
            <h4 class="cmn-text">Present Address &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : ${report.PresentAddress}</h4>
            <h4 class="cmn-text"><small>Present Address------ :</small> <span></span></h4>
        </div>
        <div class="repeat-item parents-info new-permanent">
            <h4 class="cmn-text cmn-text2">Permanent Address :<span> ${report.PermanantAddress}</span></h4>
            <div class="add-inner-flex">
                <h4 class="cmn-text"><small>Present Address ------:</small> <span></span></h4>
                <h4 class="cmn-text new-text">Home District :<span>${report.District}</span></h4>
            </div>
        </div>
    </div>
    `);
}

const renderAcademicHistory = (windowToPrint, report) => {
    windowToPrint.document.write(`
    <div class="acadmic-information-main">
        <h3 class="cmn-heading">Academic Information :</h3>
        <div class="repeat-item parents-info">
            <h4 class="cmn-text">School Name :<span>${report.StudentSchoolName}</span> </h4>
        </div>
        <div class="repeat-item parents-info">
            <h4 class="cmn-text">Collage Name :<span>${report.StudentCollegeName}</span> </h4>
        </div>
        <div class="info-repeat-grid info-repeat-grid-clg">
            <div class="gender d-flex">
                <h5 class="cmn-text">Class :</h5>
                <span>${report.Class}</span>
                
            </div>
            <div class="gender d-flex">
                <h5 class="cmn-text">Group :</h5>
                <span>${report.Group}</span>
            </div>
            <div class="gender d-flex">
                <h5 class="cmn-text">Version :</h5>
                <span>${report.Version}</span>
            </div>
            <div class="gender d-flex">
                <h5 class="cmn-text">Shift :</h5>
                <span>${report.Shift}</span>
            </div>
            <div class="gender d-flex">
                <h5 class="cmn-text">Form/Section :</h5>
                <span>${report.Section}</span>
            </div>
        </div>
    </div>
    `);
}

const renderSignatories = (windowToPrint, report) => {
    windowToPrint.document.write(`
    <div class="signature-area">
        <div class="sig-left">
            <span></span>
            <h5 class="cmn-text">Guardian Signature</h5>
        </div>
        <div class="sig-left">
            <span></span>
            <h5 class="cmn-text">Student's Signature</h5>
        </div>
    </div>
    `);
}

const renderClosingTags = (windowToPrint) => {
    windowToPrint.document.write(`
            </div>
        </body>
    </html>
    `);
}

const formattedDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('us-US', options);
}