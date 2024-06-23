"use strict";

// Class definition
var KTSettingsPaymentEdit = (function () {
  // Shared variables
  const element = document.getElementById("kt_modal_edit_settings_payment");
  const form = element.querySelector("#kt_modal_edit_settings_payment_form");
  const modal = new bootstrap.Modal(element);

  // Init add schedule modal
  var initSettingsPaymentEdit = () => {
    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    var validator = FormValidation.formValidation(form, {
      fields: {
        name: {
          validators: {
            notEmpty: {
              message: "Full name is required",
            },
          },
        },
        account_number: {
          validators: {
            notEmpty: {
              message: "Valid account number is required",
            },
          },
        },
        routing_number: {
          validators: {
            notEmpty: {
              message: "Valid routing number is required",
            },
          },
        },
        bank_name: {
          validators: {
            notEmpty: {
              message: "Valid bank name is required",
            },
          },
        },
        branch_name: {
          validators: {
            notEmpty: {
              message: "Valid branch name is required",
            },
          },
        },
        branch_code: {
          validators: {
            notEmpty: {
              message: "Valid branch code is required",
            },
          },
        },
        swift_code: {
          validators: {
            notEmpty: {
              message: "Valid swift code is required",
            },
          },
        },
        status: {
          validators: {
            notEmpty: {
              message: "Valid status is required",
            },
          },
        },
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

    // Submit button handler
    const submitButton = element.querySelector(
      '[data-kt-settings-payment-modal-action="submit"]'
    );
    submitButton.addEventListener("click", (e) => {
      e.preventDefault();

      // Validate form before submit
      if (validator) {
        validator.validate().then(function (status) {
          if (status == "Valid") {
            // Show loading indication
            submitButton.setAttribute("data-kt-indicator", "on");

            // Disable button to avoid multiple click
            submitButton.disabled = true;

            // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
            setTimeout(function () {
              // Remove loading indication
              submitButton.removeAttribute("data-kt-indicator");

              // Enable button
              submitButton.disabled = false;

              // Show popup confirmation
              Swal.fire({
                text: "Form has been successfully submitted!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(function (result) {
                if (result.isConfirmed) {
                  modal.hide();
                }
              });

              //form.submit(); // Submit form
            }, 2000);
          } else {
            // Show popup warning. For more info check the plugin's official documentation: https://sweetalert2.github.io/
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

    // Cancel button handler
    const cancelButton = element.querySelector(
      '[data-kt-settings-payment-modal-action="cancel"]'
    );
    cancelButton.addEventListener("click", (e) => {
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
          modal.hide();
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

    // Close button handler
    const closeButton = element.querySelector(
      '[data-kt-settings-payment-modal-action="close"]'
    );
    closeButton.addEventListener("click", (e) => {
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
          modal.hide();
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
      initSettingsPaymentEdit();
    },
  };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  KTSettingsPaymentEdit.init();
});
