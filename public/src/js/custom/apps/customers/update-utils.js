// Class definition
const KTCustomersUpdateUtils = (function () {
    // Shared variables
    const customerDisableBtn = document.getElementById(
        'kt_customers_disable_account'
    );
    const customerEnableBtn = document.getElementById(
        'kt_customers_enable_account'
    );
    const customerDeleteBtn = document.querySelector(
        '#kt_customers_delete_account'
    );

    // Disable customer account
    const initDisableStatus = () => {
        if (!customerDisableBtn) {
            return;
        }

        customerDisableBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const url = customerDisableBtn.getAttribute('href');

            // Show confirm popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
            Swal.fire({
                text: 'Are you sure you want to disable this customer account?',
                icon: 'warning',
                buttonsStyling: false,
                showCancelButton: true,
                cancelButtonText: 'No, cancel',
                confirmButtonText: 'Yes, disable!',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-light',
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .get(url)
                        .then((response) => {
                            // Show success message. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                            Swal.fire({
                                text:
                                    response?.data?.message ||
                                    'Customer account has been disabled.',
                                icon: 'success',
                                buttonsStyling: false,
                                confirmButtonText: 'Ok, got it!',
                                customClass: {
                                    confirmButton: 'btn btn-primary',
                                },
                                allowOutsideClick: false,
                                showCancelButton: false,
                            }).then((outcome) => {
                                if (outcome.isConfirmed) {
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
                        });
                }
            });
        });
    };

    // Enable customer account
    const initEnableStatus = () => {
        if (!customerEnableBtn) {
            return;
        }

        customerEnableBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Show confirm popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
            Swal.fire({
                text: 'Are you sure you want to enable this customer account?',
                icon: 'warning',
                buttonsStyling: false,
                showCancelButton: true,
                cancelButtonText: 'No, cancel',
                confirmButtonText: 'Yes, enable!',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-light',
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .get(customerEnableBtn.getAttribute('href'))
                        .then((response) => {
                            // Show success message. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                            Swal.fire({
                                text:
                                    response?.data?.message ||
                                    'Customer account has been enabled successfully.',
                                icon: 'success',
                                buttonsStyling: false,
                                confirmButtonText: 'Ok, got it!',
                                customClass: {
                                    confirmButton: 'btn btn-primary',
                                },
                                allowOutsideClick: false,
                                showCancelButton: false,
                            }).then((result) => {
                                if (result.isConfirmed) {
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
                        });
                }
            });
        });
    };

    // Delete customer account
    const initDeleteAccount = () => {
        if (!customerDeleteBtn) {
            return;
        }

        customerDeleteBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const url = customerDeleteBtn.getAttribute('href');

            // Show confirm popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
            Swal.fire({
                text: 'Are you sure you want to delete this customer account?',
                icon: 'warning',
                buttonsStyling: false,
                showCancelButton: true,
                cancelButtonText: 'No, cancel',
                confirmButtonText: 'Yes, delete!',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-light',
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .delete(url)
                        .then((response) => {
                            // Show success message. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                            Swal.fire({
                                text:
                                    response?.data?.message ||
                                    'Customer account has been deleted. Redirecting to the customers list...',
                                icon: 'success',
                                buttonsStyling: false,
                                confirmButtonText: 'Ok, got it!',
                                customClass: {
                                    confirmButton: 'btn btn-primary',
                                },
                                allowOutsideClick: false,
                                showCancelButton: false,
                            }).then((outcome) => {
                                if (outcome.isConfirmed) {
                                    location.href = '/dashboard/customers';
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
                                        ? `<ul class="text-start
                                        ">${Object.values(
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
                }
            });
        });
    };

    return {
        // Public functions
        init() {
            initDisableStatus();
            initEnableStatus();
            initDeleteAccount();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(() => {
    KTCustomersUpdateUtils.init();
});
