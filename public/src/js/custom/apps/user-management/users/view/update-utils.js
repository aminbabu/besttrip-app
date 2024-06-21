// Class definition
const KTUsersUpdateUtils = (function () {
    // Shared variables
    const userDisableBtn = document.getElementById('kt_users_disable_account');
    const userDeleteBtn = document.querySelector('#kt_users_delete_account');

    // Update user status
    const initUpdateStatus = () => {
        if (!userDisableBtn) {
            return;
        }

        userDisableBtn.addEventListener('click', (e) => {
            e.preventDefault();

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
                        .get(userDisableBtn.getAttribute('href'))
                        .then((response) => {
                            // Show success message. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                            Swal.fire({
                                text: 'User account has been disabled. The user will not be able to access the application. Redirecting to the login page...',
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
                                    location.href = '/dashboard/login';
                                }
                            });
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
                        .delete(userDeleteBtn.getAttribute('href'))
                        .then((response) => {
                            // Show success message. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                            Swal.fire({
                                text: 'User account has been deleted. Redirecting to the login page...',
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
                                    location.href = '/dashboard/login';
                                }
                            });
                        })
                        .catch((error) => {
                            const errors = error.response.data.message
                                ? error.response.data.message
                                : error.response.data.errors;

                            Swal.fire({
                                html: `${
                                    errors instanceof Array
                                        ? `<ul class="text-start
                                        ">${Object.values(error.response.data.errors)
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
                        });
                }
            });
        });
    };

    return {
        // Public functions
        init() {
            initUpdateStatus();
            initDeleteAccount();
        },
    };
}());

// On document ready
KTUtil.onDOMContentLoaded(() => {
    KTUsersUpdateUtils.init();
});
