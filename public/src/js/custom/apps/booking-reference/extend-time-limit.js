'use strict';

// Class definition
var KTModalExtendTimeLimit = (function () {
    var element;
    var mainElement;
    var submitButton;
    var cancelButton;
    var closeButton;
    var validator;
    var form;
    var modal;
    var url;
    var previousTimeLimitText;

    // Init form inputs
    var initExtendTimeLimitForm = function () {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validator = FormValidation.formValidation(form, {
            fields: {
                status: {
                    partialPaymentExpiryDate: {
                        validators: {
                            notEmpty: {
                                message: 'New Time Limit is required',
                            },
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
        submitButton.addEventListener('click', function (e) {
            // Prevent default button action
            e.preventDefault();

            // Validate form before submit
            if (validator) {
                validator.validate().then(function (status) {
                    console.log('validated!');

                    if (status === 'Valid') {
                        submitButton.setAttribute('data-kt-indicator', 'on');

                        // Disable submit button whilst loading
                        submitButton.disabled = true;

                        // Prepare form data
                        const formData = new FormData(form);

                        // Check axios library docs: https://axios-http.com/docs/intro
                        axios
                            .patch(url, formData)
                            .then((response) => {
                                if (response) {
                                    // Hide modal
                                    modal.hide();

                                    // Show success popup
                                    Swal.fire({
                                        text:
                                            response?.data?.message ||
                                            'Form has been successfully submitted!',
                                        icon:
                                            response?.data?.status === true
                                                ? 'success'
                                                : 'error',
                                        buttonsStyling: false,
                                        confirmButtonText: 'Ok, got it!',
                                        customClass: {
                                            confirmButton: 'btn btn-primary',
                                        },
                                        allowOutsideClick: false,
                                    }).then(() => {
                                        // Reset form
                                        form.reset();

                                        previousTimeLimitText.value = new Date(
                                            response?.data?.invoice?.partialPaymentExpiryDate
                                        ).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric',
                                        });
                                    });
                                } else {
                                    // Show error popup
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

        cancelButton.addEventListener('click', function (e) {
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

        closeButton.addEventListener('click', function (e) {
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
    };

    return {
        // Public functions
        init: function () {
            // Elements
            element = document.querySelector('#kt_modal_extend_time_limit');

            mainElement = document.querySelector('#kt_app_main');

            if (!element) {
                return;
            }

            modal = new bootstrap.Modal(element);
            form = element.querySelector('#kt_modal_extend_time_limit');
            submitButton = form.querySelector(
                '[data-kt-extend-time-limit-modal-action="submit"]'
            );

            previousTimeLimitText = form.querySelector('#prev_time_limit');
            console.log(previousTimeLimitText);
            url = submitButton.getAttribute(
                'data-kt-extend-time-limit-modal-url'
            );
            cancelButton = form.querySelector(
                '[data-kt-extend-time-limit-modal-action="cancel"]'
            );
            closeButton = element.querySelector(
                '[data-kt-extend-time-limit-modal-action="close"]'
            );

            initExtendTimeLimitForm();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTModalExtendTimeLimit.init();
});
