'use strict';

// Class definition
var KTSettingsPolicy = (function () {
    // Shared variables
    const form = document.querySelector('#kt_settings_policy_form');
    const editors = {};

    if (!form) {
        return;
    }

    // Init add schedule modal
    var initSettingsPaymentAdd = () => {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        var validator = FormValidation.formValidation(form, {
            fields: {},

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
        const submitButton = form.querySelector(
            '[kt-settings-policy-form-action="submit"]'
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
                            .post(
                                submitButton
                                    .closest('form')
                                    .getAttribute('action'),
                                {
                                    'about-us':
                                        editors.kt_docs_ckeditor_about_us.getData(),
                                    'terms-and-conditions':
                                        editors.kt_docs_ckeditor_toc.getData(),
                                    'refund-policy':
                                        editors.kt_docs_ckeditor_refund_policy.getData(),
                                    'privacy-policy':
                                        editors.kt_docs_ckeditor_privacy_policy.getData(),
                                }
                            )
                            .then((response) => {
                                if (response) {
                                    // Reset form
                                    // form.reset();

                                    // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                    Swal.fire({
                                        text:
                                            response?.data?.message ||
                                            'Policy settings updated successfully.',
                                        icon: 'success',
                                        buttonsStyling: false,
                                        confirmButtonText: 'Ok, got it!',
                                        customClass: {
                                            confirmButton: 'btn btn-primary',
                                        },
                                        allowOutsideClick: false,
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            // Reload page to see changes
                                            // window.location.reload();
                                        }
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
    };

    class CKEditorUploadAdapter {
        constructor(loader) {
            this.loader = loader;
        }

        // Starts the upload process.
        upload() {
            return this.loader.file.then(
                (file) =>
                    new Promise((resolve, reject) => {
                        this._initRequest();
                        this._initListeners(resolve, reject, file);
                        this._sendRequest(file);
                    })
            );
        }

        // Aborts the upload process.
        abort() {
            if (this.xhr) {
                this.xhr.abort();
            }
        }

        // Initializes XMLHttpRequest.
        _initRequest() {
            this.xhr = new XMLHttpRequest();
            this.xhr.open('POST', '/api/settings/site/policy/media', true);
            this.xhr.responseType = 'json';
        }

        // Initializes listeners for XMLHttpRequest.
        _initListeners(resolve, reject, file) {
            const xhr = this.xhr;
            const loader = this.loader;
            const genericErrorText = `Couldn't upload file: ${file.name}.`;

            xhr.addEventListener('error', () => reject(genericErrorText));
            xhr.addEventListener('abort', () => reject());
            xhr.addEventListener('load', () => {
                const response = xhr.response;

                if (!response || response.error) {
                    return reject(
                        response && response.error
                            ? response.error.message
                            : genericErrorText
                    );
                }

                resolve({
                    default: response.url,
                });
            });

            if (xhr.upload) {
                xhr.upload.addEventListener('progress', (evt) => {
                    if (evt.lengthComputable) {
                        loader.uploadTotal = evt.total;
                        loader.uploaded = evt.loaded;
                    }
                });
            }
        }

        // Sends the request.
        _sendRequest(file) {
            const data = new FormData();
            data.append('upload', file);
            this.xhr.send(data);
        }
    }

    function CKEditorUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new CKEditorUploadAdapter(loader);
        };
    }

    // CKEditors
    const initCKEditors = () => {
        const textareas = [
            'kt_docs_ckeditor_about_us',
            'kt_docs_ckeditor_toc',
            'kt_docs_ckeditor_refund_policy',
            'kt_docs_ckeditor_privacy_policy',
        ];

        textareas.forEach((id) => {
            ClassicEditor.create(document.getElementById(id), {
                extraPlugins: [CKEditorUploadAdapterPlugin],
            })
                .then((editor) => {
                    editors[id] = editor;
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    };

    return {
        // Public functions
        init: function () {
            initSettingsPaymentAdd();
            initCKEditors();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTSettingsPolicy.init();
});
