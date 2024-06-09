// Class definition
const KTActivateAccount = (function () {
    // Elements
    let form;
    let submitButton;
    let validator;

    // Handle form
    const handleValidation = function (e) {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validator = FormValidation.formValidation(form, {
            fields: {
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
                    },
                },
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap5({
                    rowSelector: '.fv-row',
                    eleInvalidClass: '', // comment to enable invalid state icons
                    eleValidClass: '', // comment to enable valid state icons
                }),
            },
        });
    };

    const handleSubmitDemo = function (e) {
        // Handle form submit
        submitButton.addEventListener('click', (e) => {
            // Prevent button default action
            e.preventDefault();

            // Validate form
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
                            text: 'Your account is activated successfully! Please sign in to your account.',
                            icon: 'success',
                            buttonsStyling: false,
                            confirmButtonText: 'Ok, got it!',
                            customClass: {
                                confirmButton: 'btn btn-primary',
                            },
                        }).then((result) => {
                            // Reset form
                            form.reset();

                            // Get redirect URL from the form
                            const redirectUrl = form.getAttribute('data-kt-redirect-url');

                            if (result.isConfirmed && redirectUrl) {
                                location.href = redirectUrl;
                            }
                        });
                    }, 2000);
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
    };

    const handleSubmitAjax = function (e) {
        // Handle form submit
        submitButton.addEventListener('click', (e) => {
            // Prevent button default action
            e.preventDefault();

            // Validate form
            validator.validate().then((status) => {
                if (status == 'Valid') {
                    // Show loading indication
                    submitButton.setAttribute('data-kt-indicator', 'on');

                    // Disable button to avoid multiple click
                    submitButton.disabled = true;

                    // Check axios library docs: https://axios-http.com/docs/intro
                    axios
                        .post(
                            submitButton.closest('form').getAttribute('action'),
                            new FormData(form)
                        )
                        .then((response) => {
                            if (response) {
                                // Reset form
                                form.reset();

                                // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                Swal.fire({
                                    text:
                                        response.data.message ||
                                        'Your account is activated successfully! Please sign in to your account.',
                                    icon: 'success',
                                    buttonsStyling: false,
                                    confirmButtonText: 'Ok, got it!',
                                    customClass: {
                                        confirmButton: 'btn btn-primary',
                                    },
                                    allowOutsideClick: false,
                                }).then((result) => {
                                    // Get redirect URL from the form
                                    const redirectUrl = form.getAttribute('data-kt-redirect-url');

                                    if (result.isConfirmed && redirectUrl) {
                                        location.href = redirectUrl;
                                    }
                                });
                            } else {
                                // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                Swal.fire({
                                    text: 'Sorry, the email or password is incorrect, please try again.',
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
    };

    // Public functions
    return {
        // Initialization
        init() {
            form = document.querySelector('#kt_account_activation_form');
            submitButton = document.querySelector('#kt_account_activation_submit');

            handleValidation();

            // if (isValidUrl(submitButton.closest('form').getAttribute('action'))) {
            handleSubmitAjax(); // use for ajax submit
            // } else {
            //     handleSubmitDemo(); // used for demo purposes only
            // }
        },
    };
}());

// On document ready
KTUtil.onDOMContentLoaded(() => {
    KTActivateAccount.init();
});
