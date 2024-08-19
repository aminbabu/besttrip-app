'use strict';

// Class definition
var KTModalUpdateCustomer = (function () {
    var element;
    var submitButton;
    var cancelButton;
    var closeButton;
    var validator;
    var form;
    var modal;

    // Init form inputs
    var initForm = function () {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validator = FormValidation.formValidation(form, {
            fields: {
                balance: {
                    validators: {
                        notEmpty: {
                            message: 'Balance is required',
                        },
                    },
                },
                type: {
                    validators: {
                        notEmpty: {
                            message: 'Adjustment type is required',
                        },
                    },
                },
                description: {
                    validators: {
                        notEmpty: {
                            message: 'Description is required',
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
                                new FormData(form)
                            )
                            .then((response) => {
                                Swal.fire({
                                    text:
                                        response?.data?.message ||
                                        'Wallet has been successfully updated!',
                                    icon: 'success',
                                    buttonsStyling: false,
                                    confirmButtonText: 'Ok, got it!',
                                    customClass: {
                                        confirmButton: 'btn btn-primary',
                                    },
                                    allowOutsideClick: false,
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        modal.hide();
                                        location.reload();
                                    }
                                });
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
    const calculateNewBalance = () => {
        const newBalanceEl = document.querySelector(
            '[kt-modal-adjust-balance="new_balance"]'
        );
        const currentBalanceEl = document.querySelector(
            '[kt-modal-adjust-balance="current_balance"] span'
        );
        const input = document.querySelector('input[name="balance"]');
        const $select = $('select[name="type"]');

        if (!input || !newBalanceEl || !$select?.length) {
            return;
        }

        // Function to update the balance
        const updateBalance = () => {
            const value = Number(input.value); // Get the value from the input
            const currentBalance = Number(currentBalanceEl.innerHTML);
            const type = $select.val(); // Get the selected type (top-up or deduct)

            console.log(type);

            let balance;

            if (type === 'top-up') {
                balance = currentBalance + value;
            } else if (type === 'deduct') {
                balance = currentBalance - value;
            } else {
                balance = currentBalance;
            }

            newBalanceEl.innerHTML = balance ? `৳ ${balance} BDT` : '--';
        };

        // Listen for changes in the balance input and the select input
        input.addEventListener('input', updateBalance);
        $select.select2().on('select2:select', updateBalance);
    };

    return {
        // Public functions
        init: function () {
            // Elements
            element = document.querySelector('#kt_modal_adjust_balance');

            if (!element) {
                return;
            }

            modal = new bootstrap.Modal(element);

            form = element.querySelector('#kt_modal_adjust_balance_form');
            submitButton = form.querySelector(
                '#kt_modal_adjust_balance_submit'
            );
            cancelButton = form.querySelector(
                '#kt_modal_adjust_balance_cancel'
            );
            closeButton = element.querySelector(
                '#kt_modal_adjust_balance_close'
            );

            initForm();
            calculateNewBalance();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTModalUpdateCustomer.init();
});
