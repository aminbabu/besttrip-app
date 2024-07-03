// Class definition
const KTPaymentRequests = (function () {
    let element;
    let submitButton;
    let cancelButton;
    let closeButton;
    let validator;
    let form;
    let modal;
    let approvedButtons;
    let rejectedButtons;

    // Init form inputs
    const handleForm = function () {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validator = FormValidation.formValidation(form, {
            fields: {
                reason: {
                    validators: {
                        notEmpty: {
                            message: 'Reason is required',
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

        // Action buttons
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();

            // Validate form before submit
            if (validator) {
                validator.validate().then((status) => {
                    if (status == 'Valid') {
                        submitButton.setAttribute('data-kt-indicator', 'on');

                        // Disable submit button whilst loading
                        submitButton.disabled = true;

                        // Check axios library docs: https://axios-http.com/docs/intro
                        axios
                            .patch(
                                submitButton
                                    .closest('form')
                                    .getAttribute('action'),
                                {
                                    note: form.note.value,
                                    status: 'rejected',
                                }
                            )
                            .then((response) => {
                                // hide modal
                                modal.hide();

                                if (response) {
                                    // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                    Swal.fire({
                                        text:
                                            response?.data?.message ||
                                            'Payment request has been changed to rejected!',
                                        icon: 'error',
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
                                            location.href = redirectUrl;
                                        }
                                    });
                                } else {
                                    // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                    Swal.fire({
                                        text: 'Sorry, the email is incorrect, please try again.',
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
                    }
                    Swal.fire({
                        text: 'Sorry, looks like there are some errors detected, please try again.',
                        icon: 'error',
                        buttonsStyling: false,
                        confirmButtonText: 'Ok, got it!',
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                    });
                });
            }
        });

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
                    cancelButton: 'btn btn-light',
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
                    cancelButton: 'btn btn-light',
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
    };

    const handleRequestApproval = () => {
        approvedButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const url = button.getAttribute('href');

                Swal.fire({
                    text: 'Are you sure you would like to approve this payment request?',
                    icon: 'warning',
                    showCancelButton: true,
                    buttonsStyling: false,
                    confirmButtonText: 'Yes, approve it!',
                    cancelButtonText: 'No, return',
                    customClass: {
                        confirmButton: 'btn btn-primary',
                        cancelButton: 'btn btn-light',
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Check axios library docs: https://axios-http.com/docs/intro
                        axios
                            .patch(url, { status: 'approved' })
                            .then((response) => {
                                // hide modal
                                modal.hide();

                                if (response) {
                                    // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                    Swal.fire({
                                        text: 'Payment request has been successfully approved!',
                                        icon: 'success',
                                        buttonsStyling: false,
                                        confirmButtonText: 'Ok, got it!',
                                        customClass: {
                                            confirmButton: 'btn btn-primary',
                                        },
                                        allowOutsideClick: false,
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            location.href =
                                                '/dashboard/payment-requests/requested';
                                        }
                                    });
                                } else {
                                    // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                    Swal.fire({
                                        text: 'Sorry, the email is incorrect, please try again.',
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
                            });
                    } else if (result.dismiss === 'cancel') {
                        Swal.fire({
                            text: 'You have cancelled the request!',
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
        });
    };

    const handleRequestRejection = () => {
        rejectedButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const url = button.getAttribute('href');

                form.setAttribute('action', url);
            });
        });
    };

    return {
        // Public functions
        init() {
            // Elements
            element = document.querySelector(
                '#kt_modal_reject_payment_request'
            );

            if (!element) {
                return;
            }

            modal = new bootstrap.Modal(element);

            form = document.querySelector(
                '#kt_modal_reject_payment_request_form'
            );
            submitButton = form.querySelector(
                '[data-kt-reject-payment-request-modal-action="submit"]'
            );
            cancelButton = form.querySelector(
                '[data-kt-reject-payment-request-modal-action="cancel"]'
            );
            closeButton = element.querySelector(
                '[data-kt-reject-payment-request-modal-action="close"]'
            );
            approvedButtons = document.querySelectorAll(
                '[data-kt-payment-requests-approved-action="trigger"]'
            );
            rejectedButtons = document.querySelectorAll(
                '[data-kt-payment-requests-rejected-action="trigger"]'
            );

            handleForm();
            handleRequestApproval();
            handleRequestRejection();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(() => {
    KTPaymentRequests.init();
});
