// Class definition
const KTUsersUpdateUtils = (function () {
    // Shared variables
    const userDisableBtn = document.getElementById('kt_users_disable_account');
    const userEnableBtn = document.getElementById('kt_users_enable_account');
    const userDeleteBtn = document.querySelector('#kt_users_delete_account');

    // Disable user account
    const initDisableStatus = () => {
        if (!userDisableBtn) {
            return;
        }

        userDisableBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const url = userDisableBtn.getAttribute('href');

            // Show confirm popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
            Swal.fire({
                text: 'Are you sure you want to disable this user account?',
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
                                    'User account has been disabled. Redirecting to the login page...',
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
                                    location.href = url.includes('self')
                                        ? '/dashboard/login'
                                        : `/dashboard/users/${response.data.user._id}`;
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

    // Enable user account
    const initEnableStatus = () => {
        if (!userEnableBtn) {
            return;
        }

        userEnableBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Show confirm popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
            Swal.fire({
                text: 'Are you sure you want to enable this user account?',
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
                        .get(userEnableBtn.getAttribute('href'))
                        .then((response) => {
                            // Show success message. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                            Swal.fire({
                                text:
                                    response?.data?.message ||
                                    'User account has been enabled successfully.',
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

    // Delete user account
    const initDeleteAccount = () => {
        if (!userDeleteBtn) {
            return;
        }

        userDeleteBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const url = userDeleteBtn.getAttribute('href');

            // Show confirm popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
            Swal.fire({
                text: 'Are you sure you want to delete this user account?',
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
                                    url.includes('self')
                                        ? 'Your account has been deleted. Redirecting to the login page...'
                                        : 'User account has been deleted. Redirecting to the users list...',
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
                                    location.href = url.includes('self')
                                        ? '/dashboard/login'
                                        : '/dashboard/users';
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
    KTUsersUpdateUtils.init();
});
