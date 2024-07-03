'use strict';

// Class definition
var KTAppSettings = (function () {
    // Shared variables
    var fileInputs;
    var ktFileUploaderContent;

    // Private functions
    const initForms = () => {
        const forms = [
            'kt_settings_general_form',
            'kt_settings_general_contact_form',
            'kt_settings_general_policy_form',
            'kt_settings_general_additional',
        ];

        // Init all forms
        forms.forEach((formId) => {
            // Select form
            const form = document.getElementById(formId);

            if (!form) {
                return;
            }

            // Dynamically create validation non-empty rule
            const requiredFields = form.querySelectorAll('.required');
            var detectedField;
            var validationFields = {
                fields: {},

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: '',
                    }),
                },
            };

            // Detect required fields
            requiredFields.forEach((el) => {
                const input = el.closest('.row').querySelector('input');
                if (input) {
                    detectedField = input;
                }

                const textarea = el.closest('.row').querySelector('textarea');
                if (textarea) {
                    detectedField = textarea;
                }

                const select = el.closest('.row').querySelector('select');
                if (select) {
                    detectedField = select;
                }

                // Add validation rule
                const name = detectedField?.getAttribute('name');
                validationFields.fields[name] = {
                    validators: {
                        notEmpty: {
                            message: el.innerText + ' is required',
                        },
                    },
                };
            });

            // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
            var validator = FormValidation.formValidation(
                form,
                validationFields
            );

            // Submit button handler
            const submitButton = form.querySelector(
                '[data-kt-settings-type="submit"]'
            );
            submitButton.addEventListener('click', function (e) {
                // Prevent default button action
                e.preventDefault();

                // Validate form before submit
                if (validator) {
                    validator.validate().then(function (status) {
                        if (status == 'Valid') {
                            // Show loading indication
                            submitButton.setAttribute(
                                'data-kt-indicator',
                                'on'
                            );

                            // Disable button to avoid multiple click
                            submitButton.disabled = true;

                            // Check axios library docs: https://axios-http.com/docs/intro
                            axios
                                .post(
                                    submitButton
                                        .closest('form')
                                        .getAttribute('action'),
                                    new FormData(form)
                                )
                                .then((response) => {
                                    if (response) {
                                        // Reset form
                                        form.reset();

                                        // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                        Swal.fire({
                                            text:
                                                response?.data?.message ||
                                                'Site settings updated successfully!',
                                            icon: 'success',
                                            buttonsStyling: false,
                                            confirmButtonText: 'Ok, got it!',
                                            customClass: {
                                                confirmButton:
                                                    'btn btn-primary',
                                            },
                                            allowOutsideClick: false,
                                        });
                                    } else {
                                        // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                        Swal.fire({
                                            text:
                                                response?.data?.message ||
                                                'Sorry, something went wrong. Please try again.',
                                            icon: 'error',
                                            buttonsStyling: false,
                                            confirmButtonText: 'Ok, got it!',
                                            customClass: {
                                                confirmButton:
                                                    'btn btn-primary',
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
                            // Show popup error
                            Swal.fire({
                                text: 'Oops! There are some error(s) detected.',
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
        });
    };

    // Init Tagify
    const initTagify = () => {
        // Get tagify elements
        const elements = document.querySelectorAll(
            '[data-kt-settings-type="tagify"]'
        );

        // Init tagify
        elements.forEach((element) => {
            new Tagify(element);
        });
    };

    // Init Select2 with flags
    const initSelect2Flags = () => {
        // Format options
        const optionFormat = (item) => {
            if (!item.id) {
                return item.text;
            }

            var span = document.createElement('span');
            var template = '';

            template +=
                '<img src="' +
                item.element.getAttribute('data-kt-select2-country') +
                '" class="rounded-circle h-20px me-2" alt="image"/>';
            template += item.text;

            span.innerHTML = template;

            return $(span);
        };

        // Init Select2 --- more info: https://select2.org/
        $('[data-kt-settings-type="select2_flags"]').select2({
            placeholder: 'Select a country',
            minimumResultsForSearch: Infinity,
            templateSelection: optionFormat,
            templateResult: optionFormat,
        });
    };

    // CKEditors
    const initCKEditors = () => {
        const textareas = [
            'kt_docs_ckeditor_about_us',
            'kt_docs_ckeditor_toc',
            'kt_docs_ckeditor_refund_policy',
            'kt_docs_ckeditor_privacy_policy',
        ];

        textareas.forEach((id) => {
            ClassicEditor.create(document.getElementById(id))
                .then((editor) => {
                    console.log(editor);
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    };

    // Init File Uploader
    const initFileUploader = () => {
        fileInputs = Array.from(
            document.querySelectorAll('input[type="file"]')
        );

        fileInputs.forEach((input) => {
            let error;
            const previewContainer = input.closest('.kt-file-uploader');
            const label = previewContainer.querySelector(
                '.kt-file-uploader-label'
            );
            ktFileUploaderContent = label.innerHTML;
            const maxFileSize = parseInt(
                input.getAttribute('data-kt-file-uploader-max-size')
            );

            // preview image using URL.createObjectURL
            input.addEventListener('change', function () {
                const file = input.files[0];

                if (!file) {
                    return;
                }

                // create preview element and append to the container
                const preview = document.createElement('img');

                if (error) {
                    error.remove();
                }

                if (file?.size > 1024 * 1024 * maxFileSize) {
                    // create error message
                    error = document.createElement('div');
                    error.classList.add('text-danger', 'mt-2');
                    error.innerText = `File size should not exceed ${maxFileSize}MB`;

                    // restore label content
                    label.innerHTML = ktFileUploaderContent;

                    // empty input value
                    input.value = '';

                    // append error message
                    previewContainer.appendChild(error);
                    return;
                }

                // remove content and append preview
                label.innerHTML = '';
                preview.classList.add('kt-file-uploader-preview', 'mx-auto');
                preview.src = URL.createObjectURL(file);
                preview.alt = file.name;
                label.appendChild(preview);
            });
        });
    };

    // Public methods
    return {
        init: function () {
            initForms();
            initTagify();
            initSelect2Flags();
            initCKEditors();
            initFileUploader();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTAppSettings.init();
});
