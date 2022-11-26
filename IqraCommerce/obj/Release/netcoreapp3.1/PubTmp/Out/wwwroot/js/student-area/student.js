import { editBtn, eyeBtn, imageBtn, printBtn } from "../buttons.js";
import { filter, liveRecord, OPERATION_TYPE, trashRecord } from '../filters.js';
import { Gender, ACTIVE_STATUS, Religion, BLOOD_GROUP, GROUP, SHIFT, SUBJECT, DISTRICT } from "../dictionaries.js";
import { imageBound, url } from '../utils.js';
import { print } from "./student-form.js";

(function () {
    const controller = 'Student';

    $(document).ready(() => {
        $('#add-record').click(add);
    });

    const dateForSQLServer = (Date = '01/01/1970') => {
        const dateParts = Date.split('/');

        return `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;
    }

    function studentDate(td) {
        td.html(new Date(this.DateOfBirth).toLocaleDateString('en-US', {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }));
    }

    const columns = () => [
        { field: 'ImageURL', title: 'Image', filter: false, position: 1, add: false, bound: imageBound },
        { field: 'NickName', title: 'Nick Name', filter: true, position: 3, add: { sibling: 4 }, required: false },
        { field: 'Name', title: 'Full Name(English)', filter: true, position: 4, add: { sibling: 4 }, },
        { field: 'StudentNameBangla', title: 'Full Name(Bangla)', filter: true, position: 5, add: { sibling: 4 }, },
        { field: 'PhoneNumber', title: 'Phone Number', filter: true, position: 6, add: { sibling: 4 }, },
        { field: 'DateOfBirth', title: 'Date Of Birth', filter: true, position: 7, add: { sibling: 4 }, dateFormat: 'dd/MM/yyyy', bound: studentDate  },
        { field: 'Nationality', title: 'Nationality', filter: true, position: 11, add: { sibling: 4 }, required: false },
        { field: 'StudentSchoolName', title: 'School Name', filter: true, position: 12, add: { sibling: 4 }, required: false },
        { field: 'StudentCollegeName', title: 'College Name', filter: true, position: 13, add: { sibling: 4 }, required: false },
        { field: 'Class', title: 'Class', filter: true, position: 14, add: { sibling: 4 }, required: false },
        { field: 'Section', title: 'Section', filter: true, position: 17, add: { sibling: 4 }, required: false },
        { field: 'FathersName', title: 'Fathers Name', filter: true, position: 18, add: { sibling: 4 }, required: false },
        { field: 'FathersOccupation', title: 'Fathers Occupation', filter: true, position: 19, add: { sibling: 4 }, required: false },
        { field: 'FathersPhoneNumber', title: 'Fathers Phone Number', filter: true, position: 19, add: { sibling: 4 }, required: false },
        { field: 'FathersEmail', title: 'Fathers Email Address', filter: true, position: 20, add: { sibling: 4 }, required: false  },
        { field: 'MothersName', title: 'Mothers Name', filter: true, position: 21, add: { sibling: 4 }, required: false  },
        { field: 'MothersOccupation', title: 'Mothers Occupation', filter: true, position: 22, add: { sibling: 4 }, required: false  },
        { field: 'MothersPhoneNumber', title: 'Mothers Phone Number', filter: true, position: 23, add: { sibling: 4 }, required: false  },
        { field: 'MothersEmail', title: 'Mothers Email Address', filter: true, position: 24, add: { sibling: 4 }, required: false  },
        { field: 'GuardiansName', title: 'Guardians Name', filter: true, position: 25, add: { sibling: 4 }, },
        { field: 'GuardiansOccupation', title: 'Guardians Occupation', filter: true, position: 26, add: { sibling: 4 }, },
        { field: 'GuardiansPhoneNumber', title: 'Guardians Phone Number', filter: true, position: 27, add: { sibling: 4}, },
        { field: 'GuardiansEmail', title: 'Guardians Email Address', filter: true, position: 28, add: { sibling: 4 }, },
        { field: 'PresentAddress', title: 'Present Address', filter: true, position: 29, add: { sibling: 3 }, },
        { field: 'PermanantAddress', title: 'Permanant Address', filter: true, position: 30, add: { sibling: 3 }, },
        { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, type: 'textarea' }, required: false },
        { field: 'Creator', title: 'Creator', add: false },
        { field: 'CreatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Creation Date', add: false },
        { field: 'Updator', title: 'Updator', add: false },
        { field: 'UpdatedAt', dateFormat: 'dd/MM/yyyy hh:mm', title: 'Last Updated', add: false },
    ];

    function add() {
        Global.Add({
            name: 'REGISTER_NEW_STUDENT',
            model: undefined,
            title: 'Register New Student',
            columns: columns(),
            dropdownList: [
                {
                    title: 'Shift',
                    Id: 'Shift',
                    dataSource: [
                        { text: 'Morning', value: SHIFT.MORNING },
                        { text: 'Evening', value: SHIFT.EVENING },

                    ],
                    position: 15,
                    add: { sibling: 4 },
                    required: false,
                },
                {
                    title: 'Version',
                    Id: 'Version',
                    dataSource: [
                        { text: 'Bangla', value: SUBJECT.BANGLA },
                        { text: 'English', value: SUBJECT.ENGLISH },

                    ],
                    position: 16,
                    add: { sibling: 4 },
                    required: false,
                },
                {
                    title: 'Group',
                    Id: 'Group',
                    dataSource: [
                        { text: 'Science', value: GROUP.SCIENCE },
                        { text: 'Commerce', value: GROUP.COMMERCE },
                       
                       
                    ],
                    position: 15,
                    add: { sibling: 4 },
                    required: false,


                }, {
                    title: 'Blood Group',
                    Id: 'BloodGroup',
                    dataSource: [
                        { text: 'A+', value: BLOOD_GROUP.A_POSITIVE },
                        { text: 'A-', value: BLOOD_GROUP.A_NEGATIVE },
                        { text: 'B+', value: BLOOD_GROUP.B_POSITIVE },
                        { text: 'B-', value: BLOOD_GROUP.B_NEGATIVE },
                        { text: 'O+', value: BLOOD_GROUP.O_POSITIVE },
                        { text: 'O-', value: BLOOD_GROUP.O_NEGATIVE },
                        { text: 'AB+', value: BLOOD_GROUP.AB_POSITIVE },
                        { text: 'AB-', value: BLOOD_GROUP.AB_NEGATIVE },
                    ],
                    position: 9,
                    add: { sibling: 4 },
                    required: false,


                },
                {
                    title: 'Gender',
                    Id: 'Gender',
                    dataSource: [
                        { text: 'Male', value: Gender.MALE },
                        { text: 'Female', value: Gender.FEMALE },
                        { text: 'Non-Binary', value: Gender.NON_BINARY },
                    ],
                    position: 8,
                    add: { sibling: 4 },
                    required: false,


                }, {
                    title: 'Religion',
                    Id: 'Religion',
                    dataSource: [
                        { text: 'Islam', value: Religion.ISLAM },
                        { text: 'Hinduism', value: Religion.HINDUISM },
                        { text: 'Christian', value: Religion.CHRISTIAN },
                    ],
                    position: 10,
                    add: { sibling: 4 },
                    required: false,
                }, {
                    title: 'HomeDistrict',
                    Id: 'HomeDistrict',
                    dataSource: [
                        { text: 'Dhaka City', value: DISTRICT.DHAKA_CITY },
                        { text: 'Barguna', value: DISTRICT.BARGUNA },
                        { text: 'Kurigram', value: DISTRICT.KURIGRAM },
                        { text: 'Habiganj', value: DISTRICT.HABIGANJ },
                        { text: 'Kishoreganj', value: DISTRICT.KISHOREGONJ },
                        { text: 'Noakhali', value: DISTRICT.NOAKHALI },
                        { text: 'Nilphamari', value: DISTRICT.NILPHAMARI },
                        { text: 'Jhenaidah', value: DISTRICT.JHENAIDAH },
                        { text: 'Panchagarh', value: DISTRICT.PANCHAGARH },
                        { text: 'Chuadanga', value: DISTRICT.CHUADANGA },
                        { text: 'Manikganj', value: DISTRICT.MANIKGANJ },
                        { text: 'Narayanganj', value: DISTRICT.NARAYANGANJ },
                        { text: 'Chandpur', value: DISTRICT.CHANDPUR },
                        { text: 'Feni', value: DISTRICT.FENI },
                        { text: 'Khulna', value: DISTRICT.KHULNA },
                        { text: 'Joypurhat', value: DISTRICT.JOYPURHAT },
                        { text: 'Naogaon', value: DISTRICT.NAOGAON },
                        { text: 'Meherpur', value: DISTRICT.MEHERPUR },
                        { text: 'Mymensingh', value: DISTRICT.MYMENSINGH },
                        { text: 'Rajbari', value: DISTRICT.RAJBARI },
                        { text: 'Munshiganj', value: DISTRICT.MUNSHIGANJ },
                        { text: 'Gopalganj', value: DISTRICT.GOPALGANJ },
                        { text: 'Bagerhat', value: DISTRICT.BAGERHAT },
                        { text: 'Bandarban', value: DISTRICT.BANDARBAN },
                        { text: 'Chittagong', value: DISTRICT.CHITTAGONG },
                        { text: 'Gazipur', value: DISTRICT.GAZIPUR },
                        { text: 'Gaibandha', value: DISTRICT.GAIBANDHA },
                        { text: 'Rangamati', value: DISTRICT.RANGAMATI },
                        { text: 'Jhalokati', value: DISTRICT.JHALOKATI },
                        { text: 'Jessore', value: DISTRICT.JESSORE },
                        { text: 'Rajshahi', value: DISTRICT.RAJSHAHI },
                        { text: 'Kushtia', value: DISTRICT.KUSHTIA },
                        { text: 'Comilla', value: DISTRICT.COMILLA },
                        { text: 'Pabna', value: DISTRICT.PABNA },
                        { text: 'Madaripur', value: DISTRICT.MADARIPUR },
                        { text: 'Jamalpur', value: DISTRICT.JAMALPUR },
                        { text: 'Lakshmipur', value: DISTRICT.LAKSHMIPUR },
                        { text: 'Thakurgaon', value: DISTRICT.THAKURGAON },
                        { text: 'Coxs Bazar', value: DISTRICT.COXS_BAZAR },
                        { text: 'Narail', value: DISTRICT.NARAIL },
                        { text: 'Barisal', value: DISTRICT.BARISAL },
                        { text: 'Magura', value: DISTRICT.MAGURA },
                        { text: 'Patuakhali', value: DISTRICT.PATUAKHALI },
                        { text: 'Sirajganj', value: DISTRICT.SIRAJGANJ },
                        { text: 'Faridpur', value: DISTRICT.FARIDPUR },
                        { text: 'Bhola', value: DISTRICT.BHOLA },
                        { text: 'Sylhet', value: DISTRICT.SYLHET },
                        { text: 'Netrakona', value: DISTRICT.NETRAKONA },
                        { text: 'Rangpur', value: DISTRICT.RANGPUR },
                        { text: 'Satkhira', value: DISTRICT.SATKHIRA },
                        { text: 'Bogra', value: DISTRICT.BOGRA },
                        { text: 'Sherpur', value: DISTRICT.SHERPUR },
                        { text: 'Narsingdi', value: DISTRICT.NARSINGDI },
                        { text: 'Pirojpur', value: DISTRICT.PIROJPUR },
                        { text: 'Dhaka', value: DISTRICT.DHAKA },
                        { text: 'Brahamanbaria', value: DISTRICT.BRAHAMANBARIA },
                        { text: 'Dinajpur', value: DISTRICT.DINAJPUR },
                        { text: 'Shariatpur', value: DISTRICT.SHARIATPUR },
                        { text: 'Nawabganj', value: DISTRICT.NAWABGANJ },
                        { text: 'Lalmonirhat', value: DISTRICT.LALMONIRHAT },
                        { text: 'Maulvibazar', value: DISTRICT.MAULVIBAZAR },
                        { text: 'Tangail', value: DISTRICT.TANGAIL },
                        { text: 'Khagrachhari', value: DISTRICT.KHAGRACHHARI },
                        { text: 'Sunamganj', value: DISTRICT.SUNAMGANJ },
                    ],
                    position: 31,
                    add: { sibling: 3 },
                    required: false,
                }
            ],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.ActivityId = window.ActivityId;
                formModel.IsActive = true;
                formModel.DateOfBirth = dateForSQLServer(model.DateOfBirth);
                //formModel.DateOfBirth = ` ${model.DateOfBirth}`;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            save: `/${controller}/Create`,
        });
    };

    function edit(model) {
        Global.Add({
            name: 'EDIT_STUDENT_INFORMATION',
            model: model,
            title: 'Edit Student Information',
            columns: [
                { field: 'ImageURL', title: 'Image', filter: false, position: 1, add: false, bound: imageBound },
                { field: 'NickName', title: 'Nick Name', filter: true, position: 3, add: { sibling: 4 }, required: false },
                { field: 'Name', title: 'Full Name(English)', filter: true, position: 4, add: { sibling: 4 }, },
                { field: 'StudentNameBangla', title: 'Full Name(Bangla)', filter: true, position: 5, add: { sibling: 4 }, },
                { field: 'PhoneNumber', title: 'Phone Number', filter: true, position: 6, add: { sibling: 4 }, },
                { field: 'DateOfBirth', title: 'Date Of Birth', filter: true, position: 7, add: { sibling: 4 }, dateFormat: 'dd/MM/yyyy' },
                { field: 'Nationality', title: 'Nationality', filter: true, position: 11, add: { sibling: 4 }, required: false },
                { field: 'StudentSchoolName', title: 'School Name', filter: true, position: 12, add: { sibling: 4 }, required: false },
                { field: 'StudentCollegeName', title: 'College Name', filter: true, position: 13, add: { sibling: 4 }, required: false },
                { field: 'Class', title: 'Class', filter: true, position: 14, add: { sibling: 4 }, required: false },
                { field: 'Section', title: 'Section', filter: true, position: 17, add: { sibling: 4 }, required: false },
                { field: 'FathersName', title: 'Fathers Name', filter: true, position: 18, add: { sibling: 4 }, required: false },
                { field: 'FathersOccupation', title: 'Fathers Occupation', filter: true, position: 19, add: { sibling: 4 }, required: false },
                { field: 'FathersPhoneNumber', title: 'Fathers Phone Number', filter: true, position: 19, add: { sibling: 4 }, required: false },
                { field: 'FathersEmail', title: 'Fathers Email Address', filter: true, position: 20, add: { sibling: 4 }, required: false },
                { field: 'MothersName', title: 'Mothers Name', filter: true, position: 21, add: { sibling: 4 }, required: false },
                { field: 'MothersOccupation', title: 'Mothers Occupation', filter: true, position: 22, add: { sibling: 4 }, required: false },
                { field: 'MothersPhoneNumber', title: 'Mothers Phone Number', filter: true, position: 23, add: { sibling: 4 }, required: false },
                { field: 'MothersEmail', title: 'Mothers Email Address', filter: true, position: 24, add: { sibling: 4 }, required: false },
                { field: 'GuardiansName', title: 'Guardians Name', filter: true, position: 25, add: { sibling: 4 }, },
                { field: 'GuardiansOccupation', title: 'Guardians Occupation', filter: true, position: 26, add: { sibling: 4 }, },
                { field: 'GuardiansPhoneNumber', title: 'Guardians Phone Number', filter: true, position: 27, add: { sibling: 4 }, },
                { field: 'GuardiansEmail', title: 'Guardians Email Address', filter: true, position: 28, add: { sibling: 4 }, },
                { field: 'PresentAddress', title: 'Present Address', filter: true, position: 29, add: { sibling: 4 }, },
                { field: 'PermanantAddress', title: 'Permanant Address', filter: true, position: 30, add: { sibling: 4 }, },
                { field: 'Remarks', title: 'Remarks', filter: true, add: { sibling: 1, type: 'textarea' }, required: false },
            ],
            dropdownList: [

                {
                    title: 'Shift',
                    Id: 'Shift',
                    dataSource: [
                        { text: 'Morning', value: SHIFT.MORNING },
                        { text: 'Evening', value: SHIFT.EVENING },

                    ],
                    position: 15,
                    add: { sibling: 4 },
                    required: false,
                },
                {
                    title: 'Version',
                    Id: 'Version',
                    dataSource: [
                        { text: 'Bangla', value: SUBJECT.BANGLA },
                        { text: 'English', value: SUBJECT.ENGLISH },

                    ],
                    position: 16,
                    add: { sibling: 4 },
                    required: false,
                },
                {
                    title: 'Group',
                    Id: 'Group',
                    dataSource: [
                        { text: 'Science', value: GROUP.SCIENCE },
                        { text: 'Commerce', value: GROUP.COMMERCE },


                    ],
                    position: 14,
                    add: { sibling: 4 },
                    required: false,


                }, {
                    title: 'BloodGroup',
                    Id: 'BloodGroup',
                    dataSource: [
                        { text: 'A+', value: BLOOD_GROUP.A_POSITIVE },
                        { text: 'A-', value: BLOOD_GROUP.A_NEGATIVE },
                        { text: 'B+', value: BLOOD_GROUP.B_POSITIVE },
                        { text: 'B-', value: BLOOD_GROUP.B_NEGATIVE },
                        { text: 'O+', value: BLOOD_GROUP.O_POSITIVE },
                        { text: 'O-', value: BLOOD_GROUP.O_NEGATIVE },
                        { text: 'AB+', value: BLOOD_GROUP.AB_POSITIVE },
                        { text: 'AB-', value: BLOOD_GROUP.AB_NEGATIVE },
                    ],
                    position: 8,
                    add: { sibling: 4 },
                    required: false,


                },
                {
                    title: 'Gender',
                    Id: 'Gender',
                    dataSource: [
                        { text: 'Male', value: Gender.MALE },
                        { text: 'Female', value: Gender.FEMALE },
                        { text: 'Non-Binary', value: Gender.NON_BINARY },
                    ],
                    position: 7,
                    add: { sibling: 4 },


                }, {
                    title: 'Religion',
                    Id: 'Religion',
                    dataSource: [
                        { text: 'Islam', value: Religion.ISLAM },
                        { text: 'Hinduism', value: Religion.HINDUISM },
                        { text: 'Christian', value: Religion.CHRISTIAN },
                    ],
                    position: 9,
                    add: { sibling: 4 },
                    required: false,
                }, {
                    title: 'Active Status',
                    Id: 'IsActive',
                    dataSource: [
                        { text: 'Yes', value: ACTIVE_STATUS.TRUE },
                        { text: 'No', value: ACTIVE_STATUS.FALSE },
                    ],
                    add: { sibling: 4 },
                    position: 37,
                }, {
                    title: 'HomeDistrict',
                    Id: 'HomeDistrict',
                    dataSource: [
                        { text: 'Dhaka City', value: DISTRICT.DHAKA_CITY },
                        { text: 'Barguna', value: DISTRICT.BARGUNA },
                        { text: 'Kurigram', value: DISTRICT.KURIGRAM },
                        { text: 'Habiganj', value: DISTRICT.HABIGANJ },
                        { text: 'Kishoreganj', value: DISTRICT.KISHOREGONJ },
                        { text: 'Noakhali', value: DISTRICT.NOAKHALI },
                        { text: 'Nilphamari', value: DISTRICT.NILPHAMARI },
                        { text: 'Jhenaidah', value: DISTRICT.JHENAIDAH },
                        { text: 'Panchagarh', value: DISTRICT.PANCHAGARH },
                        { text: 'Chuadanga', value: DISTRICT.CHUADANGA },
                        { text: 'Manikganj', value: DISTRICT.MANIKGANJ },
                        { text: 'Narayanganj', value: DISTRICT.NARAYANGANJ },
                        { text: 'Chandpur', value: DISTRICT.CHANDPUR },
                        { text: 'Feni', value: DISTRICT.FENI },
                        { text: 'Khulna', value: DISTRICT.KHULNA },
                        { text: 'Joypurhat', value: DISTRICT.JOYPURHAT },
                        { text: 'Naogaon', value: DISTRICT.NAOGAON },
                        { text: 'Meherpur', value: DISTRICT.MEHERPUR },
                        { text: 'Mymensingh', value: DISTRICT.MYMENSINGH },
                        { text: 'Rajbari', value: DISTRICT.RAJBARI },
                        { text: 'Munshiganj', value: DISTRICT.MUNSHIGANJ },
                        { text: 'Gopalganj', value: DISTRICT.GOPALGANJ },
                        { text: 'Bagerhat', value: DISTRICT.BAGERHAT },
                        { text: 'Bandarban', value: DISTRICT.BANDARBAN },
                        { text: 'Chittagong', value: DISTRICT.CHITTAGONG },
                        { text: 'Gazipur', value: DISTRICT.GAZIPUR },
                        { text: 'Gaibandha', value: DISTRICT.GAIBANDHA },
                        { text: 'Rangamati', value: DISTRICT.RANGAMATI },
                        { text: 'Jhalokati', value: DISTRICT.JHALOKATI },
                        { text: 'Jessore', value: DISTRICT.JESSORE },
                        { text: 'Rajshahi', value: DISTRICT.RAJSHAHI },
                        { text: 'Kushtia', value: DISTRICT.KUSHTIA },
                        { text: 'Comilla', value: DISTRICT.COMILLA },
                        { text: 'Pabna', value: DISTRICT.PABNA },
                        { text: 'Madaripur', value: DISTRICT.MADARIPUR },
                        { text: 'Jamalpur', value: DISTRICT.JAMALPUR },
                        { text: 'Lakshmipur', value: DISTRICT.LAKSHMIPUR },
                        { text: 'Thakurgaon', value: DISTRICT.THAKURGAON },
                        { text: 'Coxs Bazar', value: DISTRICT.COXS_BAZAR },
                        { text: 'Narail', value: DISTRICT.NARAIL },
                        { text: 'Barisal', value: DISTRICT.BARISAL },
                        { text: 'Magura', value: DISTRICT.MAGURA },
                        { text: 'Patuakhali', value: DISTRICT.PATUAKHALI },
                        { text: 'Sirajganj', value: DISTRICT.SIRAJGANJ },
                        { text: 'Faridpur', value: DISTRICT.FARIDPUR },
                        { text: 'Bhola', value: DISTRICT.BHOLA },
                        { text: 'Sylhet', value: DISTRICT.SYLHET },
                        { text: 'Netrakona', value: DISTRICT.NETRAKONA },
                        { text: 'Rangpur', value: DISTRICT.RANGPUR },
                        { text: 'Satkhira', value: DISTRICT.SATKHIRA },
                        { text: 'Bogra', value: DISTRICT.BOGRA },
                        { text: 'Sherpur', value: DISTRICT.SHERPUR },
                        { text: 'Narsingdi', value: DISTRICT.NARSINGDI },
                        { text: 'Pirojpur', value: DISTRICT.PIROJPUR },
                        { text: 'Dhaka', value: DISTRICT.DHAKA },
                        { text: 'Brahamanbaria', value: DISTRICT.BRAHAMANBARIA },
                        { text: 'Dinajpur', value: DISTRICT.DINAJPUR },
                        { text: 'Shariatpur', value: DISTRICT.SHARIATPUR },
                        { text: 'Nawabganj', value: DISTRICT.NAWABGANJ },
                        { text: 'Lalmonirhat', value: DISTRICT.LALMONIRHAT },
                        { text: 'Maulvibazar', value: DISTRICT.MAULVIBAZAR },
                        { text: 'Tangail', value: DISTRICT.TANGAIL },
                        { text: 'Khagrachhari', value: DISTRICT.KHAGRACHHARI },
                        { text: 'Sunamganj', value: DISTRICT.SUNAMGANJ },
                    ],
                    position: 31,
                    add: { sibling: 4 },
                    required: false,
                }
            ],
            additionalField: [],
            onSubmit: function (formModel, data, model) {
                formModel.Id = model.Id
                formModel.ActivityId = window.ActivityId;
                formModel.DreamersId = data.DreamersId;
                formModel.DateOfBirth = model.DateOfBirth;
            },
            onSaveSuccess: function () {
                tabs.gridModel?.Reload();
            },
            saveChange: `/${controller}/Edit`,
        });
    };

    const viewDetails = (row) => {
        Global.Add({
            Id: row.Id,
            name: 'Student Information' + row.Id,
            url: '/js/student-area/student-details-modal.js',
        });
    }
    
    const uploadImage = (row) => {
        Global.Add({
            name: 'add-student-image',
            url: '/js/utils/file-uploader.js',
            save: `/${controller}/UploadImage`,
            model: row,
            ItemId: row.Id,
            onAdd: function () {
                tabs.gridModel?.Reload();
            },
            onDelete: function () {

            }
        });
    }

    const printStudentForm = (row) => {
        print(row);
    }

    // Active Tab Config
    const activeTab = {
        Id: 'CB6E13253-1C50-467B-A26F-D51343FBE8A3',
        Name: 'ACTIVE_TEACHER_TAB',
        Title: 'Active',
        filter: [filter('IsActive', 1, OPERATION_TYPE.EQUAL), liveRecord],
        actions: [{
            click: edit,
            html: editBtn("Edit Information")
        }, {
            click: viewDetails,
            html: eyeBtn("View Details")
        }, {
            click: uploadImage,
            html: imageBtn("add Image")
        }, {
            click: printStudentForm,
            html: printBtn('Print Student Form')
            }],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }

    // Inactive tab config
    const inactiveTab = {
        Id: '0B3AC122-FD73-4E2E-963B-D78BFE864D4B',
        Name: 'INACTIVE_TEACHER_TAB',
        Title: 'Inactive',
        filter: [filter('IsActive', 0, OPERATION_TYPE.EQUAL), liveRecord],
        remove: false,
        actions: [{
            click: edit,
            html: editBtn("Edit Active Status")

        }, {
                click: uploadImage,
                html: imageBtn("add Image")
            }, {
            click: viewDetails,
            html: eyeBtn("View Details")
        }, {
            click: printStudentForm,
            html: printBtn('Print Student Form')
        }],
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        remove: { save: `/${controller}/Remove` },
        Url: 'Get',
    }

    // Delete tab config
    const deleteTab = {
        Id: 'F2C9D49C-A583-4165-8AA7-5D9E7695ACC5',
        Name: 'DELETE_STUDENT',
        Title: 'Deleted',
        filter: [trashRecord],
        remove: false,
        onDataBinding: () => { },
        rowBound: () => { },
        columns: columns(),
        Printable: { container: $('void') },
        Url: 'Get',
    }

    //Tabs config
    const tabs = {
        container: $('#page_container'),
        Base: {
            Url: `/${controller}/`,
        },
        items: [activeTab, inactiveTab, deleteTab],
    };

    //Initialize Tabs
    Global.Tabs(tabs);
    tabs.items[0].set(tabs.items[0]);

})();