// Class definition
const KTUsersUpdateLoginHistory = (function () {
  // Shared variables
  const loginHistoryBlockBtns = document.querySelectorAll(
    '[data-kt-users-login-session-table-filter="block"]'
  );
  const loginHistorySignOutBtns = document.querySelectorAll(
    '[data-kt-users-login-session-table-filter="sign_out"]'
  );

  // Block login session
  const handleLoginHistoryStatus = () => {
    if (!loginHistoryBlockBtns.length) {
      return;
    }

    loginHistoryBlockBtns.forEach((lhbb) => {
      lhbb.addEventListener("click", (e) => {
        e.preventDefault();

        const url = lhbb.getAttribute("href");

        // Show confirm popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
        Swal.fire({
          text: "Are you sure you want to block this user?",
          icon: "warning",
          buttonsStyling: false,
          showCancelButton: true,
          cancelButtonText: "No, cancel",
          confirmButtonText: "Yes, disable!",
          customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-light",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .patch(url, {
                status: "blocked",
              })
              .then((response) => {
                // Show success message. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                Swal.fire({
                  text:
                    response.data.message ||
                    "The login session has been successfully blocked!",
                  icon: "success",
                  buttonsStyling: false,
                  confirmButtonText: "Ok, got it!",
                  customClass: {
                    confirmButton: "btn btn-primary",
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
                          .join("")}</ul>`
                      : errors
                  }`,
                  icon: "error",
                  buttonsStyling: false,
                  confirmButtonText: "Ok, got it!",
                  customClass: {
                    confirmButton: "btn btn-primary",
                  },
                });
              });
          }
        });
      });
    });
  };

  // Sign out login session
  const handleLoginHistorySignOut = () => {
    if (!loginHistorySignOutBtns.length) {
      return;
    }

    loginHistorySignOutBtns.forEach((lhbb) => {
      lhbb.addEventListener("click", (e) => {
        e.preventDefault();

        const url = lhbb.getAttribute("href");

        // Show confirm popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
        Swal.fire({
          text: "Are you sure you want to sign out this user?",
          icon: "warning",
          buttonsStyling: false,
          showCancelButton: true,
          cancelButtonText: "No, cancel",
          confirmButtonText: "Yes, sign out!",
          customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-light",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(url)
              .then((response) => {
                // Show success message. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                Swal.fire({
                  text:
                    response.data.message ||
                    "The login session has been successfully signed out!",
                  icon: "success",
                  buttonsStyling: false,
                  confirmButtonText: "Ok, got it!",
                  customClass: {
                    confirmButton: "btn btn-primary",
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
                          .join("")}</ul>`
                      : errors
                  }`,
                  icon: "error",
                  buttonsStyling: false,
                  confirmButtonText: "Ok, got it!",
                  customClass: {
                    confirmButton: "btn btn-primary",
                  },
                });
              });
          }
        });
      });
    });
  };

  return {
    // Public functions
    init() {
      handleLoginHistoryStatus();
      handleLoginHistorySignOut();
    },
  };
})();

// On document ready
KTUtil.onDOMContentLoaded(() => {
  KTUsersUpdateLoginHistory.init();
});
