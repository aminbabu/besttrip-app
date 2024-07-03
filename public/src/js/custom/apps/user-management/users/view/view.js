// Class definition
const KTUsersViewMain = (function () {
    // Init login session button
    const initLoginSession = () => {
        const button = document.getElementById('kt_modal_users_login_session');

        if (!button) {
            return;
        }

        const url = button.getAttribute('data_kt_sign_out_all_sessions_url');

        button.addEventListener('click', (e) => {
            e.preventDefault();

            Swal.fire({
                text: 'Are you sure you would like sign out all sessions?',
                icon: 'warning',
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: 'Yes, sign out!',
                cancelButtonText: 'No, return',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-active-light',
                },
            }).then((result) => {
                if (result.value) {
                    // Check axios library docs: https://axios-http.com/docs/intro
                    axios
                        .delete(url)
                        .then((response) => {
                            if (response) {
                                // Get user data
                                const { user } = response.data || {};

                                // Show success popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                Swal.fire({
                                    text:
                                        response?.data?.message ||
                                        'All sessions have been signed out!',
                                    icon: 'success',
                                    buttonsStyling: false,
                                    confirmButtonText: 'Ok, got it!',
                                    customClass: {
                                        confirmButton: 'btn btn-primary',
                                    },
                                    allowOutsideClick: false,
                                }).then(() => {
                                    // Redirect to the login page
                                    location.href = user
                                        ? `/dashboard/users/${user._id}`
                                        : '/dashboard/login';
                                });
                            } else {
                                // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                Swal.fire({
                                    text: 'Something went wrong, please try again.',
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
                                : error.response.data.errors;

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
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: 'Sessions are still preserved!',
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

    // Delete two step authentication handler
    const initDeleteTwoStep = () => {
        const deleteButton = document.getElementById(
            'kt_users_delete_two_step'
        );

        if (!deleteButton) {
            return;
        }

        deleteButton.addEventListener('click', (e) => {
            e.preventDefault();

            Swal.fire({
                text: 'Are you sure you would like remove this two-step authentication?',
                icon: 'warning',
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: 'Yes, remove it!',
                cancelButtonText: 'No, return',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-active-light',
                },
            }).then((result) => {
                if (result.value) {
                    Swal.fire({
                        text: 'You have removed this two-step authentication!',
                        icon: 'success',
                        buttonsStyling: false,
                        confirmButtonText: 'Ok, got it!',
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                    });
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: 'Your two-step authentication is still valid!',
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
        init() {
            initLoginSession();
            initDeleteTwoStep();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(() => {
    KTUsersViewMain.init();
});
