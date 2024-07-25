'use strict';

// Class definition
var KTSettingsPaymentEdit = (function () {
    // Shared variables
    const element = document.getElementById('kt_modal_edit_settings_payment');
    const form = element.querySelector('#kt_modal_edit_settings_payment_form');
    const modal = new bootstrap.Modal(element);

    // Init add schedule modal
    var initSettingsPaymentEdit = () => {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        var validator = FormValidation.formValidation(form, {
            fields: {
                accountHolderName: {
                    validators: {
                        notEmpty: {
                            message: 'Account Holder Name is required',
                        },
                    },
                },
                accountNumber: {
                    validators: {
                        notEmpty: {
                            message: 'Valid account number is required',
                        },
                    },
                },
                routingNumber: {
                    validators: {
                        notEmpty: {
                            message: 'Valid routing number is required',
                        },
                    },
                },
                bankName: {
                    validators: {
                        notEmpty: {
                            message: 'Valid bank name is required',
                        },
                    },
                },
                branchName: {
                    validators: {
                        notEmpty: {
                            message: 'Valid branch name is required',
                        },
                    },
                },
                branchCode: {
                    validators: {
                        notEmpty: {
                            message: 'Valid branch code is required',
                        },
                    },
                },
                swiftCode: {
                    validators: {
                        notEmpty: {
                            message: 'Valid swift code is required',
                        },
                    },
                },
                status: {
                    validators: {
                        notEmpty: {
                            message: 'Valid status is required',
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
        const submitButton = element.querySelector(
            '[data-kt-settings-payment-modal-action="submit"]'
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
                            .patch(
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
            '[data-kt-settings-payment-modal-action="cancel"]'
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
            '[data-kt-settings-payment-modal-action="close"]'
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

    // Toggle status
    const toggleStatus = async () => {
        const toggleButtons = document.querySelectorAll('.toggle-status-btn');

        if (!toggleButtons.length) {
            return;
        }

        toggleButtons.forEach((button) => {
            button.addEventListener('click', async () => {
                const url = button.getAttribute('data-kt-payment-status-url');

                // return console.log(url);

                // Check axios library docs: https://axios-http.com/docs/intro
                axios
                    .patch(url, {
                        status:
                            button.getAttribute('data-status-value') ===
                            'active'
                                ? 'disabled'
                                : 'active',
                    })
                    .then((response) => {
                        if (response) {
                            const status =
                                response?.data?.paymentsSetting.status;

                            Swal.fire({
                                text:
                                    response?.data?.message ||
                                    'Status has been updated successfully!',
                                icon: 'success',
                                buttonsStyling: false,
                                confirmButtonText: 'Ok, got it!',
                                customClass: {
                                    confirmButton: 'btn btn-primary',
                                },
                                allowOutsideClick: false,
                            });

                            // changing the class name depending on the status response
                            if (status === 'active') {
                                button.setAttribute(
                                    'data-status-value',
                                    response?.data?.paymentsSetting.status
                                );
                                button.classList.add('badge-primary');
                                button.classList.remove('badge-light-primary');
                                button.innerHTML = 'Active';
                            } else {
                                button.setAttribute(
                                    'data-status-value',
                                    response?.data?.paymentsSetting.status
                                );
                                button.classList.add('badge-light-primary');
                                button.classList.remove('badge-primary');
                                button.innerHTML = 'Disabled';
                            }
                        } else {
                            // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                            Swal.fire({
                                text:
                                    response?.data?.message ||
                                    'Sorry, we ran into an error! Please try again.',
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
            });
        });
    };

    // Populate form data
    const populateData = async () => {
        const editButtons = document.querySelectorAll(
            '[data-kt-content-payments-settings-table-filter="edit_row"]'
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
                        const data = response.data.paymentsSetting;

                        form.querySelector('[name="accountHolderName"]').value =
                            data.accountHolderName;
                        form.querySelector('[name="accountNumber"]').value =
                            data.accountNumber;
                        form.querySelector('[name="bankName"]').value =
                            data.bankName;
                        form.querySelector('[name="branchName"]').value =
                            data.branchName;
                        form.querySelector('[name="routingNumber"]').value =
                            data.routingNumber;
                        form.querySelector('[name="swiftCode"]').value =
                            data.swiftCode;
                        $(form)
                            .find('select[name="status"]')
                            .val(data.status)
                            .trigger('change');

                        form.setAttribute('action', href);
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
            initSettingsPaymentEdit();
            populateData();
            toggleStatus();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTSettingsPaymentEdit.init();
});
