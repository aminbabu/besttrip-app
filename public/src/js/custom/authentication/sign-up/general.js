// Class definition
const KTSignupGeneral = (function () {
    // Elements
    let form;
    let submitButton;
    let validator;
    let passwordMeter;

    // Handle form
    const handleForm = function (e) {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validator = FormValidation.formValidation(form, {
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                        },
                    },
                },
                email: {
                    validators: {
                        regexp: {
                            regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'The value is not a valid email address',
                        },
                        notEmpty: {
                            message: 'Email address is required',
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
                'confirm-password': {
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
                toc: {
                    validators: {
                        notEmpty: {
                            message: 'You must accept the terms and conditions',
                        },
                    },
                },
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger({
                    event: {
                        password: false,
                    },
                }),
                bootstrap: new FormValidation.plugins.Bootstrap5({
                    rowSelector: '.fv-row',
                    eleInvalidClass: '', // comment to enable invalid state icons
                    eleValidClass: '', // comment to enable valid state icons
                }),
            },
        });

        // Handle form submit
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();

            validator.revalidateField('password');

            validator.validate().then((status) => {
                if (status == 'Valid') {
                    // Show loading indication
                    submitButton.setAttribute('data-kt-indicator', 'on');

                    // Disable button to avoid multiple click
                    submitButton.disabled = true;

                    // Simulate ajax request
                    setTimeout(() => {
                        // Hide loading indication
                        submitButton.removeAttribute('data-kt-indicator');

                        // Enable button
                        submitButton.disabled = false;

                        // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                        Swal.fire({
                            text: 'Form has been successfully submitted!',
                            icon: 'success',
                            buttonsStyling: false,
                            confirmButtonText: 'Ok, got it!',
                            customClass: {
                                confirmButton: 'btn btn-primary',
                            },
                            allowOutsideClick: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                form.reset(); // reset form
                                passwordMeter.reset(); // reset password meter
                                // form.submit();

                                // form.submit(); // submit form
                                const redirectUrl = form.getAttribute('data-kt-redirect-url');
                                if (redirectUrl) {
                                    location.href = redirectUrl;
                                }
                            }
                        });
                    }, 1500);
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
            });
        });

        // Handle password input
        form.querySelector('input[name="password"]').addEventListener('input', function () {
            if (this.value.length > 0) {
                validator.updateFieldStatus('password', 'NotValidated');
            }
        });
    };

    // Handle form ajax
    const handleFormAjax = function (e) {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validator = FormValidation.formValidation(form, {
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                        },
                    },
                },
                email: {
                    validators: {
                        regexp: {
                            regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'The value is not a valid email address',
                        },
                        notEmpty: {
                            message: 'Email address is required',
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
                toc: {
                    validators: {
                        notEmpty: {
                            message: 'You must accept the terms and conditions',
                        },
                    },
                },
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger({
                    event: {
                        password: false,
                    },
                }),
                bootstrap: new FormValidation.plugins.Bootstrap5({
                    rowSelector: '.fv-row',
                    eleInvalidClass: '', // comment to enable invalid state icons
                    eleValidClass: '', // comment to enable valid state icons
                }),
            },
        });

        // Handle form submit
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();

            validator.revalidateField('password');

            validator.validate().then((status) => {
                if (status == 'Valid') {
                    // Show loading indication
                    submitButton.setAttribute('data-kt-indicator', 'on');

                    // Disable button to avoid multiple click
                    submitButton.disabled = true;

                    // Check axios library docs: https://axios-http.com/docs/intro
                    axios
                        .post(submitButton.closest('form').getAttribute('action'), {
                            name: form.name.value,
                            email: form.email.value,
                            phone: form.phone.value,
                            password: form.password.value,
                        })
                        .then((response) => {
                            if (response) {
                                Swal.fire({
                                    text: 'Please check your inbox and click on the link to verify your email address.',
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

                                    // Get the redirect URL from the form
                                    const redirectUrl = form.getAttribute('data-kt-redirect-url');

                                    if (result.isConfirmed && redirectUrl) {
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
                            console.log(Object.values(error));
                            const errors = error.response.data.message
                                ? error.response.data.message
                                : error.response.data.errors;

                            Swal.fire({
                                html: `${
                                    errors instanceof Array
                                        ? `<ul class="text-start">${Object.values(
                                              error.response.data.errors
                                          ).map((err) => `<li>${err?.message}</li>`)}</ul>`
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
            });
        });

        // Handle password input
        form.querySelector('input[name="password"]').addEventListener('input', function () {
            if (this.value.length > 0) {
                validator.updateFieldStatus('password', 'NotValidated');
            }
        });
    };

    // Password input validation
    var validatePassword = function () {
        return passwordMeter.getScore() > 50;
    };

    const isValidUrl = function (url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };

    // Public functions
    return {
        // Initialization
        init() {
            // Elements
            form = document.querySelector('#kt_sign_up_form');
            submitButton = document.querySelector('#kt_sign_up_submit');
            passwordMeter = KTPasswordMeter.getInstance(
                form.querySelector('[data-kt-password-meter="true"]')
            );

            // if (isValidUrl(submitButton.closest('form').getAttribute('action'))) {
            handleFormAjax();
            // } else {
            //     handleForm();
            // }
        },
    };
}());

// On document ready
KTUtil.onDOMContentLoaded(() => {
    KTSignupGeneral.init();
});
