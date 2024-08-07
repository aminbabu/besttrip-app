'use strict';

// Class definition
var KTContentEditTraveler = (function () {
    // Shared variables
    const element = document.getElementById('kt_modal_edit_traveler');
    const form = element.querySelector('#kt_modal_add_traveler_form');
    const modal = new bootstrap.Modal(element);
    var ktFileUploaderContent;

    // Init edit modal
    var KTContentEditTraveler = () => {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        var validator = FormValidation.formValidation(form, {
            fields: {
                travelerType: {
                    validators: {
                        notEmpty: {
                            message: 'Traveler Type is required',
                        },
                    },
                },
                firstName: {
                    validators: {
                        notEmpty: {
                            message: 'First name is required',
                        },
                    },
                },
                lastName: {
                    validators: {
                        notEmpty: {
                            message: 'Last name is required',
                        },
                    },
                },
                gender: {
                    validators: {
                        notEmpty: {
                            message: 'Gender is required',
                        },
                    },
                },
                dateOfBirth: {
                    validators: {
                        notEmpty: {
                            message: 'Date of Birth is required',
                        },
                    },
                },
                country: {
                    validators: {
                        notEmpty: {
                            message: 'Country is required',
                        },
                    },
                },
                cityName: {
                    validators: {
                        notEmpty: {
                            message: 'City is required',
                        },
                    },
                },
                passportNumber: {
                    validators: {
                        notEmpty: {
                            message: 'Passport Number is required',
                        },
                    },
                },
                documentIssueCountry: {
                    validators: {
                        notEmpty: {
                            message: 'Document Issue Country is required',
                        },
                    },
                },
                passportExpiryDate: {
                    validators: {
                        notEmpty: {
                            message: 'Passport Expiry Date is required',
                        },
                    },
                },
                presentAddress: {
                    validators: {
                        notEmpty: {
                            message: 'Present Address is required',
                        },
                    },
                },
                permanentAddress: {
                    validators: {
                        notEmpty: {
                            message: 'Permanent Address is required',
                        },
                    },
                },
                emergencyContactNo: {
                    validators: {
                        notEmpty: {
                            message: 'Emergency Contact Number is required',
                        },
                    },
                },
                phone: {
                    validators: {
                        notEmpty: {
                            message: 'Phone Number is required',
                        },
                    },
                },
            },

            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap5({
                    rowSelector: '.fv-row',
                    eleInvalidClass: '',
                    eleValidClass: '',
                }),
            },
        });

        // Initialize Flatpickr for Date Of Birth
        flatpickr("input[name='dateOfBirth']", {
            dateFormat: 'Y-m-d',
        });

        // Initialize Flatpickr for Passport Expiry Date
        flatpickr("input[name='passportExpiryDate']", {
            dateFormat: 'Y-m-d',
        });

        // Submit button handler
        const submitButton = element.querySelector(
            '[data-kt-edit-traveler-modal-action="submit"]'
        );

        submitButton.addEventListener('click', (e) => {
            e.preventDefault();

            // Validate form before submit
            if (validator) {
                validator.validate().then(function (status) {
                    if (status == 'Valid') {
                        // Show loading indication
                        submitButton.setAttribute('data-kt-indicator', 'on');

                        // Disable button to avoid multiple clicks
                        submitButton.disabled = true;

                        // Simulate AJAX request (replace with actual AJAX call)
                        axios
                            .patch(
                                form.getAttribute('action'),
                                new FormData(form)
                            )
                            .then((response) => {
                                if (response) {
                                    // Hide modal
                                    modal.hide();

                                    return console.log(response);

                                    // Show success message
                                    Swal.fire({
                                        text:
                                            response?.data?.message ||
                                            'Form has been successfully submitted!',
                                        icon: 'success',
                                        buttonsStyling: false,
                                        confirmButtonText: 'Ok, got it!',
                                        customClass: {
                                            confirmButton: 'btn btn-primary',
                                        },
                                        allowOutsideClick: false,
                                    }).then(() => {
                                        // Reset form
                                        form.reset();

                                        // Get redirect URL from the form
                                        const redirectUrl = form.getAttribute(
                                            'data-kt-redirect-url'
                                        );
                                        if (redirectUrl) {
                                            location.href = redirectUrl;
                                        } else {
                                            location.reload();
                                        }
                                    });
                                } else {
                                    // Show error message
                                    Swal.fire({
                                        text: 'Sorry, looks like there are some errors detected, please try again.',
                                        icon: 'error',
                                        buttonsStyling: false,
                                        confirmButtonText: 'Ok, got it!',
                                        customClass: {
                                            confirmButton: 'btn btn-primary',
                                        },
                                    });
                                }
                            })
                            .catch((error) => {
                                const errors =
                                    error.response?.data?.message ||
                                    error?.response?.data?.errors;

                                // Show error message
                                Swal.fire({
                                    html: `${
                                        errors instanceof Array
                                            ? `<ul class="text-start">${errors
                                                  .map(
                                                      (err) =>
                                                          `<li>${err?.message}</li>`
                                                  )
                                                  .join('')}</ul>`
                                            : errors
                                    }`,
                                    icon: 'error',
                                    buttonsStyling: false,
                                    confirmButtonText: 'Ok, got it!',
                                    customClass: {
                                        confirmButton: 'btn btn-primary',
                                    },
                                });
                            })
                            .then(() => {
                                // Hide loading indication
                                submitButton.removeAttribute(
                                    'data-kt-indicator'
                                );

                                // Enable button
                                submitButton.disabled = false;
                            });
                    } else {
                        // Show validation error message
                        Swal.fire({
                            text: 'Sorry, looks like there are some errors detected, please try again.',
                            icon: 'error',
                            buttonsStyling: false,
                            confirmButtonText: 'Ok, got it!',
                            customClass: {
                                confirmButton: 'btn btn-primary',
                            },
                        });
                    }
                });
            }
        });

        // Cancel button handler
        const cancelButton = element.querySelector(
            '[data-kt-edit-traveler-modal-action="cancel"]'
        );
        cancelButton.addEventListener('click', (e) => {
            e.preventDefault();

            Swal.fire({
                text: 'Are you sure you would like to cancel?',
                icon: 'warning',
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: 'Yes, cancel it!',
                cancelButtonText: 'No, return',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-active-light',
                },
            }).then(function (result) {
                if (result.value) {
                    form.reset(); // Reset form
                    modal.hide();
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: 'Your form has not been cancelled!.',
                        icon: 'error',
                        buttonsStyling: false,
                        confirmButtonText: 'Ok, got it!',
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                    });
                }
            });
        });

        // Close button handler
        const closeButton = element.querySelector(
            '[data-kt-edit-traveler-modal-action="close"]'
        );

        closeButton.addEventListener('click', (e) => {
            e.preventDefault();

            Swal.fire({
                text: 'Are you sure you would like to cancel?',
                icon: 'warning',
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: 'Yes, cancel it!',
                cancelButtonText: 'No, return',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-active-light',
                },
            }).then(function (result) {
                if (result.value) {
                    form.reset(); // Reset form
                    modal.hide();
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: 'Your form has not been cancelled!.',
                        icon: 'error',
                        buttonsStyling: false,
                        confirmButtonText: 'Ok, got it!',
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                    });
                }
            });
        });
    };

    // Init File Uploader
    const initFileUploader = () => {
        const handleFileInputChange = (input) => {
            const previewContainer = input.closest('.kt-file-uploader');
            const label = previewContainer.querySelector(
                '.kt-file-uploader-label'
            );
            const maxFileSize = parseInt(
                input.getAttribute('data-kt-file-uploader-max-size')
            );
            const invalidMessage =
                previewContainer.querySelector('.invalid-feedback');
            const file = input.files[0];

            if (!file) {
                return;
            }

            // remove error message
            invalidMessage.classList.add('d-none');

            // create preview element and append to the container
            const preview = document.createElement('img');

            if (file?.size > 1024 * 1024 * maxFileSize) {
                const message = `File size should not exceed ${maxFileSize}MB`;

                if (ktFileUploaderContent) {
                    // restore label content
                    label.innerHTML = ktFileUploaderContent;
                }

                // empty input value
                input.value = '';

                // append error message
                invalidMessage.innerHTML = message;
                invalidMessage.classList.remove('d-none');
                return;
            }

            // add was-invalid class to the container
            if (!previewContainer.classList.contains('was-invalided')) {
                ktFileUploaderContent = label.innerHTML;
                previewContainer.classList.add('was-invalided');
            }

            // remove content and append preview
            label.innerHTML = '';
            preview.classList.add('kt-file-uploader-preview');
            preview.src = URL.createObjectURL(file);
            preview.alt = file.name;
            label.appendChild(preview);
        };

        form.addEventListener('change', function (event) {
            const target = event.target;

            // Check if the changed element is an input with type file
            if (target.tagName === 'INPUT' && target.type === 'file') {
                handleFileInputChange(target);
            }
        });
    };

    // Populate form data
    const populateData = async () => {
        const editButtons = document.querySelectorAll(
            '[data-kt-content-traveler-table-filter="edit_row"]'
        );

        if (!editButtons.length) {
            return;
        }

        editButtons.forEach((button) => {
            button.addEventListener('click', async () => {
                const href = button.getAttribute('href');

                try {
                    const response = await axios.get(href);

                    if (response) {
                        const data = response.data.traveler;

                        // Populate form fields with the fetched data
                        $(form)
                            .find('select[name="travelerType"]')
                            .val(data.travelerType)
                            .trigger('change');
                        $(form);
                        form.querySelector('[name="firstName"]').value =
                            data.firstName;
                        form.querySelector('[name="lastName"]').value =
                            data.lastName;
                        $(form)
                            .find('select[name="gender"]')
                            .val(data.gender)
                            .trigger('change');
                        $(form);
                        const formattedDate = new Date(data.dateOfBirth)
                            .toISOString()
                            .split('T')[0];
                        form.querySelector('[name="dateOfBirth"]').value =
                            formattedDate;
                        form.querySelector('[name="country"]').value =
                            data.country;
                        form.querySelector('[name="cityName"]').value =
                            data.cityName;
                        form.querySelector('[name="passportNumber"]').value =
                            data.passportNumber;
                        form.querySelector(
                            '[name="documentIssueCountry"]'
                        ).value = data.documentIssueCountry;
                        form.querySelector(
                            '[name="passportExpiryDate"]'
                        ).value = new Date(data.passportExpiryDate)
                            .toISOString()
                            .split('T')[0];
                        form.querySelector('[name="presentAddress"]').value =
                            data.presentAddress;
                        form.querySelector('[name="permanentAddress"]').value =
                            data.permanentAddress;

                        form.querySelector('[name="email"]').value = data.email
                            ? data?.email
                            : '';

                        form.querySelector(
                            '[name="emergencyContactNo"]'
                        ).value = data.emergencyContactNo;
                        form.querySelector('[name="phone"]').value = data.phone;

                        // Populate the file upload preview for passport
                        const passportPreviewContainer = form
                            .querySelector('#kt_file_uploader_edit_passport')
                            .closest('.kt-file-uploader');
                        const passportPreview = document.createElement('img');
                        passportPreview.classList.add(
                            'kt-file-uploader-preview'
                        );
                        passportPreview.src = data.passport;
                        passportPreview.alt = 'passport image';
                        passportPreviewContainer.querySelector(
                            'label'
                        ).innerHTML = '';
                        passportPreviewContainer
                            .querySelector('label')
                            .appendChild(passportPreview);

                        // Populate the file upload preview for traveler image
                        const travelerImgPreviewContainer = form
                            .querySelector(
                                '#kt_file_uploader_edit_traveler_image'
                            )
                            .closest('.kt-file-uploader');
                        const travelerImgPreview =
                            document.createElement('img');
                        travelerImgPreview.classList.add(
                            'kt-file-uploader-preview'
                        );
                        travelerImgPreview.src = data.travelerPhoto;
                        travelerImgPreview.alt = 'travelerImg image';
                        travelerImgPreviewContainer.querySelector(
                            'label'
                        ).innerHTML = '';
                        travelerImgPreviewContainer
                            .querySelector('label')
                            .appendChild(travelerImgPreview);

                        // Populate the file upload preview for traveler nid image
                        const travelerNIDPreviewContainer = form
                            .querySelector(
                                '#kt_file_uploader_edit_traveler_nid'
                            )
                            .closest('.kt-file-uploader');
                        const travelerNIDPreview =
                            document.createElement('img');
                        travelerNIDPreview.classList.add(
                            'kt-file-uploader-preview'
                        );
                        travelerNIDPreview.src = data.travelerNID;
                        travelerNIDPreview.alt = 'travelerNID image';
                        travelerNIDPreviewContainer.querySelector(
                            'label'
                        ).innerHTML = '';
                        travelerNIDPreviewContainer
                            .querySelector('label')
                            .appendChild(travelerNIDPreview);

                        // Populate the file upload preview for traveler covid certificate image
                        const travelerCovidPreviewContainer = form
                            .querySelector(
                                '#kt_file_uploader_edit_traveler_covid_certificate'
                            )
                            .closest('.kt-file-uploader');
                        const travelerCovidPreview =
                            document.createElement('img');
                        travelerCovidPreview.classList.add(
                            'kt-file-uploader-preview'
                        );
                        travelerCovidPreview.src =
                            data.travelerCovidCertificate;
                        travelerCovidPreview.alt = 'travelerCovid image';
                        travelerCovidPreviewContainer.querySelector(
                            'label'
                        ).innerHTML = '';
                        travelerCovidPreviewContainer
                            .querySelector('label')
                            .appendChild(travelerCovidPreview);

                        form.setAttribute('action', href);

                        // Initialize file uploader after populating data
                        initFileUploader();
                    } else {
                        Swal.fire({
                            text: 'Failed to fetch data. Please try again later.',
                            icon: 'error',
                            buttonsStyling: false,
                            confirmButtonText: 'Ok, got it!',
                            customClass: {
                                confirmButton: 'btn btn-primary',
                            },
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        text:
                            error.response?.data?.message ||
                            'Failed to fetch data. Please try again later.',
                        icon: 'error',
                        buttonsStyling: false,
                        confirmButtonText: 'Ok, got it!',
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                    });
                }
            });
        });
    };

    return {
        // Public functions
        init: function () {
            KTContentEditTraveler();
            initFileUploader();
            populateData();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTContentEditTraveler.init();
});
