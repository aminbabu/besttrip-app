"use strict";

// Class definition
var KTPaymentRequests = (function () {
  var element;
  var submitButton;
  var cancelButton;
  var closeButton;
  var validator;
  var form;
  var modal;

  // Init form inputs
  var handleForm = function () {
    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    validator = FormValidation.formValidation(form, {
      fields: {
        reason: {
          validators: {
            notEmpty: {
              message: "Reason is required",
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

            setTimeout(function () {
              submitButton.removeAttribute("data-kt-indicator");

              Swal.fire({
                text: "Payment request has been successfully rejected!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(function (result) {
                if (result.isConfirmed) {
                  modal.hide();

                  // Enable submit button after loading
                  submitButton.disabled = false;
                }
              });

              //form.submit(); // Submit form
            }, 2000);
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
      element = document.querySelector("#kt_modal_reject_payment_request");
      modal = new bootstrap.Modal(element);

      form = document.querySelector("#kt_modal_reject_payment_request_form");
      submitButton = form.querySelector(
        '[data-kt-reject-payment-request-modal-action="submit"]'
      );
      cancelButton = form.querySelector(
        '[data-kt-reject-payment-request-modal-action="cancel"]'
      );
      closeButton = element.querySelector(
        '[data-kt-reject-payment-request-modal-action="close"]'
      );

      handleForm();
    },
  };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  KTPaymentRequests.init();
});
