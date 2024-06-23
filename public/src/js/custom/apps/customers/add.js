"use strict";

// Class definition
var KTModalCustomersAdd = (function () {
  var submitButton;
  var cancelButton;
  var closeButton;
  var validator;
  var form;
  var modal;

  // Init form inputs
  var handleForm = function () {
    // Init Datepicker --- For more info, please check Flatpickr's official documentation: https://flatpickr.js.org/
    $("#kt_customer_birth_datepicker").flatpickr();

    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    validator = FormValidation.formValidation(form, {
      fields: {
        name: {
          validators: {
            notEmpty: {
              message: "Customer name is required",
            },
          },
        },
        email: {
          validators: {
            notEmpty: {
              message: "Customer email is required",
            },
          },
        },
        phone: {
          validators: {
            notEmpty: {
              message: "Customer phone is required",
            },
          },
        },
        dob: {
          validators: {
            notEmpty: {
              message: "Customer date of birth is required",
            },
          },
        },
        // country: {
        //   validators: {
        //     notEmpty: {
        //       message: "Country is required",
        //     },
        //   },
        // },
        // address: {
        //   validators: {
        //     notEmpty: {
        //       message: "Address is required",
        //     },
        //   },
        // },
        // city: {
        //   validators: {
        //     notEmpty: {
        //       message: "City is required",
        //     },
        //   },
        // },
        // state: {
        //   validators: {
        //     notEmpty: {
        //       message: "State is required",
        //     },
        //   },
        // },
        // postcode: {
        //   validators: {
        //     notEmpty: {
        //       message: "Postcode is required",
        //     },
        //   },
        // },
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap: new FormValidation.plugins.Bootstrap5({
          rowSelector: ".fv-row",
          eleInvalidClass: "",
          eleValidClass: "",
        }),
      },
    });

    // Revalidate country field. For more info, plase visit the official plugin site: https://select2.org/
    $(form.querySelector('[name="country"]')).on("change", function () {
      // Revalidate the field when an option is chosen
      validator.revalidateField("country");
    });

    // Action buttons
    submitButton.addEventListener("click", function (e) {
      e.preventDefault();

      // Validate form before submit
      if (validator) {
        validator.validate().then(function (status) {
          console.log("validated!");

          if (status == "Valid") {
            submitButton.setAttribute("data-kt-indicator", "on");

            // Disable submit button whilst loading
            submitButton.disabled = true;

            // Check axios library docs: https://axios-http.com/docs/intro
            axios
              .post(
                submitButton.closest("form").getAttribute("action"),
                new FormData(form)
              )
              .then((response) => {
                // hide modal
                modal.hide();

                if (response) {
                  // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                  Swal.fire({
                    text:
                      response.data.message ||
                      "Customer has been successfully added!",
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                      confirmButton: "btn btn-primary",
                    },
                    allowOutsideClick: false,
                  }).then(() => {
                    // Reset form
                    form.reset();

                    // Get redirect URL from the form
                    const redirectUrl = form.getAttribute(
                      "data-kt-redirect-url"
                    );

                    if (redirectUrl) {
                      location.href = redirectUrl;
                    }
                  });
                } else {
                  // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                  Swal.fire({
                    text: "Sorry, looks like there are some errors detected, please try again.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                      confirmButton: "btn btn-primary",
                    },
                  });
                }
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
              })
              .then(() => {
                // Hide loading indication
                submitButton.removeAttribute("data-kt-indicator");

                // Enable button
                submitButton.disabled = false;
              });
          } else {
            Swal.fire({
              text: "Sorry, looks like there are some errors detected, please try again.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
          }
        });
      }
    });

    cancelButton.addEventListener("click", function (e) {
      e.preventDefault();

      Swal.fire({
        text: "Are you sure you would like to cancel?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText: "No, return",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-active-light",
        },
      }).then(function (result) {
        if (result.value) {
          form.reset(); // Reset form
          modal.hide(); // Hide modal
        } else if (result.dismiss === "cancel") {
          Swal.fire({
            text: "Your form has not been cancelled!.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        }
      });
    });

    closeButton.addEventListener("click", function (e) {
      e.preventDefault();

      Swal.fire({
        text: "Are you sure you would like to cancel?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText: "No, return",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-active-light",
        },
      }).then(function (result) {
        if (result.value) {
          form.reset(); // Reset form
          modal.hide(); // Hide modal
        } else if (result.dismiss === "cancel") {
          Swal.fire({
            text: "Your form has not been cancelled!.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary",
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
      modal = new bootstrap.Modal(
        document.querySelector("#kt_modal_add_customer")
      );

      form = document.querySelector("#kt_modal_add_customer_form");
      submitButton = form.querySelector("#kt_modal_add_customer_submit");
      cancelButton = form.querySelector("#kt_modal_add_customer_cancel");
      closeButton = form.querySelector("#kt_modal_add_customer_close");

      handleForm();
    },
  };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  KTModalCustomersAdd.init();
});
