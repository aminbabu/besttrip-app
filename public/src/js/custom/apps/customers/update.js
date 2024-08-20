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
        // Init Datepicker --- For more info, please check Flatpickr's official documentation: https://flatpickr.js.org/
        $('#kt_customer_birth_datepicker').flatpickr({
            enableTime: false,
            dateFormat: 'Y-m-d',
            maxDate: 'today',
        });

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validator = FormValidation.formValidation(form, {
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: 'Customer name is required',
                        },
                    },
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: 'Customer email is required',
                        },
                        regexp: {
                            regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'The value is not a valid email address',
                        },
                    },
                },
                phone: {
                    validators: {
                        notEmpty: {
                            message: 'Customer phone is required',
                        },
                    },
                },
                // dob: {
                //     validators: {
                //         notEmpty: {
                //             message: 'Customer birth date is required',
                //         },
                //     },
                // },
                // country: {
                //   validators: {
                //     notEmpty: {
                //       message: "Country is required",
                //     },
                //   },
                // },
                // address1: {
                //   validators: {
                //     notEmpty: {
                //       message: "Address 1 is required",
                //     },
                //   },
                // },
                // city: {
                //   validators: {
                //     notEmpty: {
                //       message: "City is required",
                //     },
                //   },
                // },
                // state: {
                //   validators: {
                //     notEmpty: {
                //       message: "State is required",
                //     },
                //   },
                // },
                // postcode: {
                //   validators: {
                //     notEmpty: {
                //       message: "Postcode is required",
                //     },
                //   },
                // },
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

                        // Customer form data
                        const customerFormData = new FormData();

                        // Form fields
                        const formFields = [
                            'name',
                            'email',
                            'phone',
                            'dob',
                            'flyerNumber',
                            'address',
                            'city',
                            'state',
                            'country',
                            'postalCode',
                        ];

                        // Append form data dynamically
                        formFields.forEach(
                            (field) =>
                                form[field].value.trim() &&
                                customerFormData.append(
                                    field,
                                    form[field].value.trim()
                                )
                        );

                        // Append avatar
                        if (form.avatar.files.length > 0) {
                            customerFormData.append(
                                'avatar',
                                form.avatar.files[0]
                            );
                        }

                        // Check axios library docs: https://axios-http.com/docs/intro
                        axios
                            .patch(
                                submitButton
                                    .closest('form')
                                    .getAttribute('action'),
                                customerFormData
                            )
                            .then((response) => {
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
                                }).then((result) => {
                                    // Get the redirect URL from the form
                                    const redirectUrl = form.getAttribute(
                                        'data-kt-redirect-url'
                                    );

                                    if (result.isConfirmed && redirectUrl) {
                                        modal.hide();
                                        location.href = redirectUrl;
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

    return {
        // Public functions
        init: function () {
            // Elements
            element = document.querySelector('#kt_modal_update_customer');
            modal = new bootstrap.Modal(element);

            form = element.querySelector('#kt_modal_update_customer_form');
            submitButton = form.querySelector(
                '#kt_modal_update_customer_submit'
            );
            cancelButton = form.querySelector(
                '#kt_modal_update_customer_cancel'
            );
            closeButton = element.querySelector(
                '#kt_modal_update_customer_close'
            );

            initForm();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTModalUpdateCustomer.init();
});
