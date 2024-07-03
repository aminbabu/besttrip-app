// Class definition
const KTUsersUpdateDetails = (function () {
    // Shared variables
    const element = document.getElementById('kt_modal_update_details');
    const form = element.querySelector('#kt_modal_update_user_form');
    const modal = new bootstrap.Modal(element);
    let validator;

    // Init add schedule modal
    const initUpdateDetails = () => {
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
                        notEmpty: {
                            message: 'Email address is required',
                        },
                        regexp: {
                            regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'The value is not a valid email address',
                        },
                    },
                },
            },
            plugins: {
                bootstrap: new FormValidation.plugins.Bootstrap5({
                    rowSelector: '.fv-row',
                    eleInvalidClass: '', // comment to enable invalid state icons
                    eleValidClass: '', // comment to enable valid state icons
                }),
            },
        });

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
        const submitButton = element.querySelector(
            '[data-kt-users-modal-action="submit"]'
        );
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
                    // User form data
                    const userFormData = new FormData();

                    // Form fields
                    const formFields = [
                        'name',
                        'email',
                        'phone',
                        'dob',
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
                            userFormData.append(field, form[field].value.trim())
                    );

                    // Append avatar
                    if (form.avatar.files.length > 0) {
                        userFormData.append('avatar', form.avatar.files[0]);
                    }

                    // Check axios library docs: https://axios-http.com/docs/intro
                    axios
                        .patch(
                            submitButton.closest('form').getAttribute('action'),
                            userFormData
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

    // Date of birth picker
    const dobPicker = () => {
        $('#kt_datepicker_user_dob').flatpickr({
            enableTime: false,
            dateFormat: 'Y-m-d',
        });
    };

    return {
        // Public functions
        init() {
            initUpdateDetails();
            dobPicker();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(() => {
    KTUsersUpdateDetails.init();
});
