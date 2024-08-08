'use strict';

// Class definition
var KTContentAddTraveler = (function () {
    // Shared variables
    const element = document.getElementById('kt_modal_add_traveler');
    const form = element.querySelector('#kt_modal_add_traveler_form');
    const modal = new bootstrap.Modal(element);
    var ktFileUploaderContent;

    // Init add schedule modal
    var initAddTraveler = () => {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        var validator = FormValidation.formValidation(form, {
            fields: {
                passport: {
                    validators: {
                        notEmpty: {
                            message: 'Passport Photo is required',
                        },
                    },
                },
                travelerPhoto: {
                    validators: {
                        notEmpty: {
                            message: 'Traveler Photo is required',
                        },
                    },
                },
                travelerNID: {
                    validators: {
                        notEmpty: {
                            message: 'NID is required',
                        },
                    },
                },
                travelerCovidCertificate: {
                    validators: {
                        notEmpty: {
                            message: 'Covid Certificate is required',
                        },
                    },
                },
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

        // Initialize Flatpickr for Passport Expiry Date
        flatpickr("input[name='passportExpiryDate']", {
            enableTime: false,
            dateFormat: 'Y-m-d',
            maxDate: 'today',
        });

        // Initialize Flatpickr
        flatpickr("input[name='dateOfBirth']", {
            dateFormat: 'Y-m-d',
            maxDate: 'today',
        });

        // Submit button handler
        const submitButton = element.querySelector(
            '[data-kt-add-traveler-modal-action="submit"]'
        );
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();

            // Validate form before submit
            if (validator) {
                validator.validate().then(function (status) {
                    if (status == 'Valid') {
                        // Show loading indication
                        submitButton.setAttribute('data-kt-indicator', 'on');

                        // Disable button to avoid multiple click
                        submitButton.disabled = true;

                        // Check axios library docs: https://axios-http.com/docs/intro
                        axios
                            .post(
                                submitButton
                                    .closest('form')
                                    .getAttribute('action'),
                                new FormData(form)
                            )
                            .then((response) => {
                                if (response) {
                                    // Hide modal
                                    modal.hide();

                                    // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
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
                                    // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
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
                                const errors = error.response?.data?.message
                                    ? error.response?.data?.message
                                    : error?.response?.data?.errors;

                                Swal.fire({
                                    html: `${
                                        errors instanceof Array
                                            ? `<ul class="text-start">${Object.values(
                                                  error.response.data.errors
                                              )
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
                        // Show popup warning. For more info check the plugin's official documentation: https://sweetalert2.github.io/
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
            '[data-kt-add-traveler-modal-action="cancel"]'
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
            '[data-kt-add-traveler-modal-action="close"]'
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

            // Remove error message
            invalidMessage.classList.add('d-none');

            // Create preview element and append to the container
            const preview = document.createElement('img');

            if (file.size > 1024 * 1024 * maxFileSize) {
                const message = `File size should not exceed ${maxFileSize}MB`;

                if (input.dataset.ktFileUploaderContent) {
                    // Restore label content
                    label.innerHTML = input.dataset.ktFileUploaderContent;
                }

                // Empty input value
                input.value = '';

                // Append error message
                invalidMessage.innerHTML = message;
                invalidMessage.classList.remove('d-none');
                return;
            }

            // Add was-invalid class to the container
            if (!previewContainer.classList.contains('was-invalidated')) {
                input.dataset.ktFileUploaderContent = label.innerHTML;
                previewContainer.classList.add('was-invalidated');
            }

            // Remove content and append preview
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

    return {
        // Public functions
        init: function () {
            initAddTraveler();
            initFileUploader();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTContentAddTraveler.init();
});
