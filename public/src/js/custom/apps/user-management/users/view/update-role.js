'use strict';

// Class definition
var KTUsersUpdateRole = (function () {
    // Shared variables
    const element = document.getElementById('kt_modal_update_role');
    const form = element.querySelector('#kt_modal_update_role_form');
    const modal = new bootstrap.Modal(element);

    // Init add schedule modal
    var initUpdateRole = () => {
        // Close button handler
        const closeButton = element.querySelector(
            '[data-kt-users-modal-action="close"]'
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
        const cancelButton = element.querySelector(
            '[data-kt-users-modal-action="cancel"]'
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
        const submitButton = element.querySelector(
            '[data-kt-users-modal-action="submit"]'
        );
        submitButton.addEventListener('click', function (e) {
            // Prevent default button action
            e.preventDefault();

            // Show loading indication
            submitButton.setAttribute('data-kt-indicator', 'on');

            // Disable button to avoid multiple click
            submitButton.disabled = true;

            // Check axios library docs: https://axios-http.com/docs/intro
            axios
                .patch(
                    submitButton.closest('form').getAttribute('action'),
                    new FormData(form)
                )
                .then((response) => {
                    // hide modal
                    modal.hide();

                    if (response) {
                        // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                        Swal.fire({
                            text:
                                response?.data?.message ||
                                'Role has been updated successfully.',
                            icon: 'success',
                            buttonsStyling: false,
                            confirmButtonText: 'Ok, got it!',
                            customClass: {
                                confirmButton: 'btn btn-primary',
                            },
                            allowOutsideClick: false,
                        }).then((result) => {
                            // Reset form
                            form.reset();

                            // Get redirect URL from the form
                            const redirectUrl = form.getAttribute(
                                'data-kt-redirect-url'
                            );

                            if (result.isConfirmed && redirectUrl) {
                                // Hide modal
                                modal.hide();

                                // Redirect the user
                                location.href = redirectUrl;
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
        });
    };

    return {
        // Public functions
        init: function () {
            initUpdateRole();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTUsersUpdateRole.init();
});
