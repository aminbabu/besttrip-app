'use strict';

// Class definition
var KTContentHotelOffersEdit = (function () {
    // Shared variables
    const element = document.getElementById(
        'kt_content_hotel_offers_edit_modal'
    );
    const form = element.querySelector('#kt_content_hotel_offers_edit_form');
    const modal = new bootstrap.Modal(element);
    var ktFileUploaderContent;

    // Init edit modal
    var initEditContentHotelOffer = () => {
        // Init form validation rules
        var validator = FormValidation.formValidation(form, {
            fields: {
                title: {
                    validators: {
                        notEmpty: {
                            message: 'Title is required',
                        },
                    },
                },
                location: {
                    validators: {
                        notEmpty: {
                            message: 'Location is required',
                        },
                    },
                },
                rating: {
                    validators: {
                        notEmpty: {
                            message: 'Rating is required',
                        },
                    },
                },
                price: {
                    validators: {
                        notEmpty: {
                            message: 'Price is required',
                        },
                        numeric: {
                            message: 'Price must be a numeric value',
                        },
                    },
                },
                link: {
                    validators: {
                        notEmpty: {
                            message: 'Link is required',
                        },
                    },
                },
                status: {
                    validators: {
                        notEmpty: {
                            message: 'Status is required',
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
            '#kt_content_hotel_offers_edit_submit'
        );
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();

            // Validate form before submit
            if (validator) {
                validator.validate().then(function (status) {
                    if (status == 'Valid') {
                        // Show loading indication
                        submitButton.setAttribute('data-kt-indicator', 'on');

                        // Disable button to avoid multiple clicks
                        submitButton.disabled = true;

                        // Simulate AJAX request (replace with actual AJAX call)
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

                                    // Show success message
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
                                    // Show error message
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
                                const errors =
                                    error.response?.data?.message ||
                                    error?.response?.data?.errors;

                                // Show error message
                                Swal.fire({
                                    html: `${
                                        errors instanceof Array
                                            ? `<ul class="text-start">${errors
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
                        // Show validation error message
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
            '#kt_content_hotel_offers_edit_cancel'
        );
        cancelButton.addEventListener('click', (e) => {
            e.preventDefault();

            Swal.fire({
                text: 'Are you sure you want to cancel?',
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
                    // Reset form and hide modal
                    form.reset();
                    modal.hide();
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: 'Your form has not been cancelled!',
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
            '#kt_content_hotel_offers_edit_close'
        );
        closeButton.addEventListener('click', (e) => {
            e.preventDefault();

            Swal.fire({
                text: 'Are you sure you want to cancel?',
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
                    // Reset form and hide modal
                    form.reset();
                    modal.hide();
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: 'Your form has not been cancelled!',
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

    // Init File Uploader
    const initFileUploader = () => {
        const handleFileInputChange = (input) => {
            const previewContainer = input.closest('.kt-file-uploader');
            const label = previewContainer.querySelector(
                '.kt-file-uploader-label'
            );
            const maxFileSize = parseInt(
                input.getAttribute('data-kt-file-uploader-max-size')
            );
            const invalidMessage =
                previewContainer.querySelector('.invalid-feedback');
            const file = input.files[0];

            if (!file) {
                return;
            }

            // Remove error message
            invalidMessage.classList.add('d-none');

            // Create preview element and append to the container
            const preview = document.createElement('img');

            if (file?.size > 1024 * 1024 * maxFileSize) {
                const message = `File size should not exceed ${maxFileSize}MB`;

                // Restore label content
                if (ktFileUploaderContent) {
                    label.innerHTML = ktFileUploaderContent;
                }

                // Empty input value
                input.value = '';

                // Append error message
                invalidMessage.innerHTML = message;
                invalidMessage.classList.remove('d-none');
                return;
            }

            // Add was-invalid class to the container
            if (!previewContainer.classList.contains('was-invalided')) {
                ktFileUploaderContent = label.innerHTML;
                previewContainer.classList.add('was-invalided');
            }

            // Remove content and append preview
            label.innerHTML = '';
            preview.classList.add('kt-file-uploader-preview');
            preview.src = URL.createObjectURL(file);
            preview.alt = file.name;
            label.appendChild(preview);
        };

        form.addEventListener('change', function (event) {
            const target = event.target;

            // Check if the changed element is an input with type file
            if (target.tagName === 'INPUT' && target.type === 'file') {
                handleFileInputChange(target);
            }
        });
    };

    // Populate form data
    const populateData = async () => {
        const editButtons = document.querySelectorAll(
            '[data-kt-content-hotel-offers-table-filter="edit_row"]'
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
                        const data = response.data.hotelOffer;
                        const previewContainer =
                            form.querySelector('.kt-file-uploader');

                        // Create preview element and append to the container
                        const preview = document.createElement('img');
                        preview.classList.add('kt-file-uploader-preview');
                        preview.src = data.thumbnail;
                        preview.alt = data.title;
                        previewContainer.querySelector('label').innerHTML = '';
                        previewContainer
                            .querySelector('label')
                            .appendChild(preview);

                        form.setAttribute('action', href);
                        form.querySelector('[name="title"]').value = data.title;
                        form.querySelector('[name="location"]').value =
                            data.location;
                        form.querySelector('[name="price"]').value = data.price;
                        form.querySelector('[name="link"]').value = data.link;
                        $(form)
                            .find('select[name="rating"]')
                            .val(data.rating)
                            .trigger('change');
                        $(form)
                            .find('select[name="status"]')
                            .val(data.status)
                            .trigger('change');
                        form.setAttribute('action', href);

                        // Initialize file uploader after populating data
                        initFileUploader();
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

    // Toggle status
    const toggleStatus = async () => {
        const toggleButtons = document.querySelectorAll(
            '.form-check-input-custom'
        );

        if (!toggleButtons.length) {
            return;
        }

        toggleButtons.forEach((button) => {
            button.addEventListener('change', async () => {
                const url = button.getAttribute('data-kt-hotel-offers-url');

                // Simulate AJAX request (replace with actual AJAX call)
                axios
                    .patch(url, {
                        status: button.checked ? 'active' : 'disabled',
                    })
                    .then((response) => {
                        if (response) {
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
                        } else {
                            // Show error message
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
                        const errors =
                            error.response?.data?.message ||
                            error?.response?.data?.errors;

                        // Show error message
                        Swal.fire({
                            html: `${
                                errors instanceof Array
                                    ? `<ul class="text-start">${errors
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

    return {
        // Public functions
        init: function () {
            initEditContentHotelOffer();
            populateData();
            initFileUploader();
            toggleStatus();
        },
    };
})();

// On document ready
document.addEventListener('DOMContentLoaded', function () {
    KTContentHotelOffersEdit.init();
});
