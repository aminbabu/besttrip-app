// Class definition
const KTUsersViewMain = (function () {
    // Init login session button
    const initLoginSession = () => {
        const button = document.getElementById('kt_modal_users_login_session');

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
                    Swal.fire({
                        text: 'You have signed out all sessions!.',
                        icon: 'success',
                        buttonsStyling: false,
                        confirmButtonText: 'Ok, got it!',
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                    });
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: 'Your sessions are still preserved!.',
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

    // Init sign out single user
    const initSignOutUser = () => {
        const signOutButtons = document.querySelectorAll('[data-kt-users-sign-out="single_user"]');

        signOutButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const deviceName = button.closest('tr').querySelectorAll('td')[1].innerText;

                Swal.fire({
                    text: `Are you sure you would like sign out ${deviceName}?`,
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
                        Swal.fire({
                            text: `You have signed out ${deviceName}!.`,
                            icon: 'success',
                            buttonsStyling: false,
                            confirmButtonText: 'Ok, got it!',
                            customClass: {
                                confirmButton: 'btn btn-primary',
                            },
                        }).then(() => {
                            button.closest('tr').remove();
                        });
                    } else if (result.dismiss === 'cancel') {
                        Swal.fire({
                            text: `${deviceName}'s session is still preserved!.`,
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
        });
    };

    // Delete two step authentication handler
    const initDeleteTwoStep = () => {
        const deleteButton = document.getElementById('kt_users_delete_two_step');

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
                        text: 'You have removed this two-step authentication!.',
                        icon: 'success',
                        buttonsStyling: false,
                        confirmButtonText: 'Ok, got it!',
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                    });
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: 'Your two-step authentication is still valid!.',
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
            initSignOutUser();
            initDeleteTwoStep();
        },
    };
}());

// On document ready
KTUtil.onDOMContentLoaded(() => {
    KTUsersViewMain.init();
});
