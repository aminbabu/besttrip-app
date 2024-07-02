'use strict';

// Class definition
var KTSettingsContact = (function () {
    // Shared variables
    const form = document.querySelector('#kt_settings_contact_form');

    if (!form) {
        return;
    }

    // Init add schedule modal
    var initSettingsPaymentAdd = () => {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        var validator = FormValidation.formValidation(form, {
            fields: {
                email: {
                    validators: {
                        notEmpty: {
                            message: 'Email is required',
                        },
                    },
                },
                phone: {
                    validators: {
                        notEmpty: {
                            message: 'Phone is required',
                        },
                    },
                },
                address: {
                    validators: {
                        notEmpty: {
                            message: 'Address is required',
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
            '[kt-settings-contact-form-action="submit"]'
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

                        // Get form data
                        const formData = new FormData(form);

                        // Prepare data by filtering out empty fields
                        const data = Array.from(formData.entries()).reduce(
                            (acc, item) => {
                                if (item[1]) {
                                    acc[item[0]] = item[1];
                                }
                                return acc;
                            },
                            {}
                        );

                        // Check axios library docs: https://axios-http.com/docs/intro
                        axios
                            .post(
                                submitButton
                                    .closest('form')
                                    .getAttribute('action'),
                                data
                            )
                            .then((response) => {
                                if (response) {
                                    // Reset form
                                    form.reset();

                                    // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                    Swal.fire({
                                        text:
                                            response.data.message ||
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
                                            window.location.reload();
                                        }
                                    });
                                } else {
                                    // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                    Swal.fire({
                                        text:
                                            response.data.message ||
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
                                const errors = error.response.data.message
                                    ? error.response.data.message
                                    : error.response.data.errors;

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

    return {
        // Public functions
        init: function () {
            initSettingsPaymentAdd();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTSettingsContact.init();
});
