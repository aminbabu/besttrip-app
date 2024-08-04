// ('use strict');

// // Class definition
// var KTModalUpdateTicketNumber = (function () {
//     var element;
//     var submitButton;
//     var cancelButton;
//     var closeButton;
//     var validator;
//     var form;
//     var modal;
//     var url;

//     // Init form inputs
//     var initUpdateTicketNumber = function () {
//         // Init Datepicker --- For more info, please check Flatpickr's official documentation: https://flatpickr.js.org/
//         $('#kt_customer_birth_datepicker').flatpickr();

//         // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
//         validator = FormValidation.formValidation(form, {
//             fields: {
//                 new_time_limit: {
//                     validators: {
//                         notEmpty: {
//                             message: 'New Time Limit is required',
//                         },
//                     },
//                 },
//             },
//             plugins: {
//                 trigger: new FormValidation.plugins.Trigger(),
//                 bootstrap: new FormValidation.plugins.Bootstrap5({
//                     rowSelector: '.fv-row',
//                     eleInvalidClass: '',
//                     eleValidClass: '',
//                 }),
//             },
//         });

//         // Action buttons
//         submitButton.addEventListener('click', function (e) {
//             // Prevent default button action
//             e.preventDefault();

//             // Validate form before submit
//             if (validator) {
//                 validator.validate().then(function (status) {
//                     console.log('validated!');

//                     if (status == 'Valid') {
//                         submitButton.setAttribute('data-kt-indicator', 'on');

//                         // Disable submit button whilst loading
//                         submitButton.disabled = true;

//                         // Prepare form data
//                         const formData = new FormData(form);

//                         // Check axios library docs: https://axios-http.com/docs/intro
//                         axios
//                             .patch(url, formData)
//                             .then((response) => {
//                                 if (response) {
//                                     // Hide modal
//                                     modal.hide();

//                                     // Show success popup
//                                     Swal.fire({
//                                         text:
//                                             response?.data?.message ||
//                                             'Form has been successfully submitted!',
//                                         icon: 'success',
//                                         buttonsStyling: false,
//                                         confirmButtonText: 'Ok, got it!',
//                                         customClass: {
//                                             confirmButton: 'btn btn-primary',
//                                         },
//                                         allowOutsideClick: false,
//                                     }).then(() => {
//                                         // Reset form
//                                         form.reset();

//                                         // Get redirect URL from the form
//                                         const redirectUrl = form.getAttribute(
//                                             'data-kt-redirect-url'
//                                         );

//                                         if (redirectUrl) {
//                                             location.href = redirectUrl;
//                                         } else {
//                                             location.reload();
//                                         }
//                                     });
//                                 } else {
//                                     // Show error popup
//                                     Swal.fire({
//                                         text: 'Sorry, looks like there are some errors detected, please try again.',
//                                         icon: 'error',
//                                         buttonsStyling: false,
//                                         confirmButtonText: 'Ok, got it!',
//                                         customClass: {
//                                             confirmButton: 'btn btn-primary',
//                                         },
//                                     });
//                                 }
//                             })
//                             .catch((error) => {
//                                 const errors = error.response?.data?.message
//                                     ? error.response?.data?.message
//                                     : error?.response?.data?.errors;

//                                 Swal.fire({
//                                     html: `${
//                                         errors instanceof Array
//                                             ? `<ul class="text-start">${Object.values(
//                                                   error.response.data.errors
//                                               )
//                                                   .map(
//                                                       (err) =>
//                                                           `<li>${err?.message}</li>`
//                                                   )
//                                                   .join('')}</ul>`
//                                             : errors
//                                     }`,
//                                     icon: 'error',
//                                     buttonsStyling: false,
//                                     confirmButtonText: 'Ok, got it!',
//                                     customClass: {
//                                         confirmButton: 'btn btn-primary',
//                                     },
//                                 });
//                             })
//                             .then(() => {
//                                 // Hide loading indication
//                                 submitButton.removeAttribute(
//                                     'data-kt-indicator'
//                                 );

//                                 // Enable button
//                                 submitButton.disabled = false;
//                             });
//                     } else {
//                         Swal.fire({
//                             text: 'Sorry, looks like there are some errors detected, please try again.',
//                             icon: 'error',
//                             buttonsStyling: false,
//                             confirmButtonText: 'Ok, got it!',
//                             customClass: {
//                                 confirmButton: 'btn btn-primary',
//                             },
//                         });
//                     }
//                 });
//             }
//         });

//         cancelButton.addEventListener('click', function (e) {
//             e.preventDefault();

//             console.log('hello');

//             Swal.fire({
//                 text: 'Are you sure you would like to cancel?',
//                 icon: 'warning',
//                 showCancelButton: true,
//                 buttonsStyling: false,
//                 confirmButtonText: 'Yes, cancel it!',
//                 cancelButtonText: 'No, return',
//                 customClass: {
//                     confirmButton: 'btn btn-primary',
//                     cancelButton: 'btn btn-active-light',
//                 },
//             }).then(function (result) {
//                 if (result.value) {
//                     form.reset(); // Reset form
//                     modal.hide(); // Hide modal
//                 } else if (result.dismiss === 'cancel') {
//                     Swal.fire({
//                         text: 'Your form has not been cancelled!.',
//                         icon: 'error',
//                         buttonsStyling: false,
//                         confirmButtonText: 'Ok, got it!',
//                         customClass: {
//                             confirmButton: 'btn btn-primary',
//                         },
//                     });
//                 }
//             });
//         });

//         closeButton.addEventListener('click', function (e) {
//             e.preventDefault();

//             Swal.fire({
//                 text: 'Are you sure you would like to cancel?',
//                 icon: 'warning',
//                 showCancelButton: true,
//                 buttonsStyling: false,
//                 confirmButtonText: 'Yes, cancel it!',
//                 cancelButtonText: 'No, return',
//                 customClass: {
//                     confirmButton: 'btn btn-primary',
//                     cancelButton: 'btn btn-active-light',
//                 },
//             }).then(function (result) {
//                 if (result.value) {
//                     form.reset(); // Reset form
//                     modal.hide(); // Hide modal
//                 } else if (result.dismiss === 'cancel') {
//                     Swal.fire({
//                         text: 'Your form has not been cancelled!.',
//                         icon: 'error',
//                         buttonsStyling: false,
//                         confirmButtonText: 'Ok, got it!',
//                         customClass: {
//                             confirmButton: 'btn btn-primary',
//                         },
//                     });
//                 }
//             });
//         });
//     };

//     return {
//         // Public functions
//         init: function () {
//             // Elements
//             element = document.querySelector('#kt_modal_extend_time_limit');

//             if (!element) {
//                 return;
//             }

//             modal = new bootstrap.Modal(element);

//             form = element.querySelector('#kt_modal_extend_time_limit_form');
//             submitButton = form.querySelector(
//                 '[data-kt-extend_time_limit-modal-action="submit"]'
//             );
//             url = submitButton.getAttribute(
//                 'data-kt-extend_time_limit-modal-url'
//             );
//             cancelButton = form.querySelector(
//                 '[data-kt-extend_time_limit-modal-action="cancel"]'
//             );
//             closeButton = element.querySelector(
//                 '[data-kt-extend_time_limit-modal-action="close"]'
//             );

//             initUpdateTicketNumber();
//         },
//     };
// })();
// // On document ready
// KTUtil.onDOMContentLoaded(function () {
//     KTModalUpdateTicketNumber.init();
// });

'use strict';

// Class definition
var KTModalUpdateBookingStatus = (function () {
    var element;
    var submitButton;
    var cancelButton;
    var closeButton;
    var validator;
    var form;
    var modal;
    var url;

    // Init form inputs
    var initBookingStatusForm = function () {
        // Init Datepicker --- For more info, please check Flatpickr's official documentation: https://flatpickr.js.org/
        $('#kt_customer_birth_datepicker').flatpickr();

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validator = FormValidation.formValidation(form, {
            fields: {
                partialPaymentExpiryDate: {
                    validators: {
                        notEmpty: {
                            message: 'New Time Limit is required',
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

            console.log(e.target);

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

            if (!element) {
                return;
            }

            modal = new bootstrap.Modal(element);

            form = element.querySelector('#kt_modal_extend_time_limit_form');
            submitButton = form.querySelector(
                'data-kt-extend_time_limit-modal-action="submit"'
            );
            url = submitButton.getAttribute(
                'data-kt-extend_time_limit-modal-url'
            );
            cancelButton = form.querySelector(
                'data-kt-extend_time_limit-modal-action="cancel"'
            );
            closeButton = element.querySelector(
                'data-kt-extend_time_limit-modal-action="close"'
            );

            initBookingStatusForm();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTModalUpdateTicketNumber.init();
});
