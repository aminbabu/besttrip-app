// Class definition
const KTUsersUpdatePassword = (function () {
    // Shared variables
    const element = document.getElementById('kt_modal_update_password');
    const form = element.querySelector('#kt_modal_update_password_form');
    const modal = new bootstrap.Modal(element);

    // Init add schedule modal
    const initUpdatePassword = () => {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        const validator = FormValidation.formValidation(form, {
            fields: {
                current_password: {
                    validators: {
                        notEmpty: {
                            message: 'Current password is required',
                        },
                    },
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'The password is required',
                        },
                        callback: {
                            message: 'Please enter valid password',
                            callback(input) {
                                if (input.value.length > 0) {
                                    return validatePassword();
                                }
                            },
                        },
                    },
                },
                password_confirmation: {
                    validators: {
                        notEmpty: {
                            message: 'The password confirmation is required',
                        },
                        identical: {
                            compare() {
                                return form.querySelector('[name="password"]').value;
                            },
                            message: 'The password and its confirm are not the same',
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

        // Close button handler
        const closeButton = element.querySelector('[data-kt-users-modal-action="close"]');
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
            }).then((result) => {
                if (result.value) {
                    form.reset(); // Reset form
                    modal.hide(); // Hide modal
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

        // Cancel button handler
        const cancelButton = element.querySelector('[data-kt-users-modal-action="cancel"]');
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
            }).then((result) => {
                if (result.value) {
                    form.reset(); // Reset form
                    modal.hide(); // Hide modal
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

        // Submit button handler
        const submitButton = element.querySelector('[data-kt-users-modal-action="submit"]');
        submitButton.addEventListener('click', (e) => {
            // Prevent default button action
            e.preventDefault();

            // Validate form before submit
            if (validator) {
                validator.validate().then((status) => {
                    if (status == 'Valid') {
                        // Show loading indication
                        submitButton.setAttribute('data-kt-indicator', 'on');

                        // Disable button to avoid multiple click
                        submitButton.disabled = true;

                        // Check axios library docs: https://axios-http.com/docs/intro
                        axios
                            .patch(submitButton.closest('form').getAttribute('action'), {
                                currentPassword: form.current_password.value,
                                password: form.password.value,
                                confirmPassword: form.password_confirmation.value,
                            })
                            .then((response) => {
                                // Reset form
                                form.reset();

                                Swal.fire({
                                    text:
                                        response.data.message ||
                                        'Your password has been updated successfully!',
                                    icon: 'success',
                                    buttonsStyling: false,
                                    confirmButtonText: 'Ok, got it!',
                                    customClass: {
                                        confirmButton: 'btn btn-primary',
                                    },
                                    allowOutsideClick: false,
                                }).then((result) => {
                                    // Get the redirect URL from the form
                                    const redirectUrl = form.getAttribute('data-kt-redirect-url');

                                    if (result.isConfirmed && redirectUrl) {
                                        modal.hide();
                                        location.href = redirectUrl;
                                    }
                                });
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
                                                  .map((err) => `<li>${err?.message}</li>`)
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
                                submitButton.removeAttribute('data-kt-indicator');

                                // Enable button
                                submitButton.disabled = false;
                            });
                    }
                });
            }
        });
    };

    return {
        // Public functions
        init() {
            initUpdatePassword();
        },
    };
}());

// On document ready
KTUtil.onDOMContentLoaded(() => {
    KTUsersUpdatePassword.init();
});
