'use strict';

// Class definition
var KTSettingsGeneral = (function () {
    // Shared variables
    const form = document.querySelector('#kt_settings_general_form');
    var fileInputs;
    var ktFileUploaderContent;

    if (!form) {
        return;
    }

    // Init add schedule modal
    var initSettingsPaymentAdd = () => {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        var validator = FormValidation.formValidation(form, {
            fields: {
                title: {
                    validators: {
                        notEmpty: {
                            message: 'Website name is required',
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

        // Submit button handler
        const submitButton = form.querySelector(
            '[kt-settings-general-form-action="submit"]'
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

                        // Prepare form data
                        const formData = new FormData(form);

                        formData
                            .getAll('domains[]')
                            .forEach((domain, index) => {
                                if (domain.trim()) {
                                    formData.set(
                                        `domains[${index}]`,
                                        domain.trim()
                                    );
                                }
                            });

                        // Check axios library docs: https://axios-http.com/docs/intro
                        axios
                            .post(
                                submitButton
                                    .closest('form')
                                    .getAttribute('action'),
                                formData
                            )
                            .then((response) => {
                                if (response) {
                                    // Reset form
                                    // form.reset();

                                    // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                    Swal.fire({
                                        text:
                                            response?.data?.message ||
                                            'General settings updated successfully.',
                                        icon: 'success',
                                        buttonsStyling: false,
                                        confirmButtonText: 'Ok, got it!',
                                        customClass: {
                                            confirmButton: 'btn btn-primary',
                                        },
                                        allowOutsideClick: false,
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            // Reload page to see changes
                                            // window.location.reload();
                                        }
                                    });
                                } else {
                                    // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                    Swal.fire({
                                        text:
                                            response?.data?.message ||
                                            'Sorry, something went wrong. Please try again.',
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
    };

    // Init File Uploader
    const initFileUploader = () => {
        fileInputs = Array.from(
            document.querySelectorAll('input[type="file"]')
        );

        fileInputs.forEach((input) => {
            let error;
            const previewContainer = input.closest('.kt-file-uploader');
            const label = previewContainer.querySelector(
                '.kt-file-uploader-label'
            );
            ktFileUploaderContent = label.innerHTML;
            const maxFileSize = parseInt(
                input.getAttribute('data-kt-file-uploader-max-size')
            );

            // preview image using URL.createObjectURL
            input.addEventListener('change', function () {
                const file = input.files[0];

                if (!file) {
                    return;
                }

                // create preview element and append to the container
                const preview = document.createElement('img');

                if (error) {
                    error.remove();
                }

                if (file?.size > 1024 * 1024 * maxFileSize) {
                    // create error message
                    error = document.createElement('div');
                    error.classList.add('text-danger', 'mt-2');
                    error.innerText = `File size should not exceed ${maxFileSize}MB`;

                    // restore label content
                    label.innerHTML = ktFileUploaderContent;

                    // empty input value
                    input.value = '';

                    // append error message
                    previewContainer.appendChild(error);
                    return;
                }

                // remove content and append preview
                label.innerHTML = '';
                preview.classList.add('kt-file-uploader-preview', 'mx-auto');
                preview.src = URL.createObjectURL(file);
                preview.alt = file.name;
                label.appendChild(preview);
            });
        });
    };

    return {
        // Public functions
        init: function () {
            initSettingsPaymentAdd();
            initFileUploader();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTSettingsGeneral.init();
});
