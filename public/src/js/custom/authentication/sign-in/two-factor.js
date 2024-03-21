"use strict";

// Class Definition
var KTSigninTwoFactor = (function () {
  // Elements
  var form;
  var submitButton;
  var validator;

  // Handle form
  var handleForm = function (e) {
    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    validator = FormValidation.formValidation(form, {
      fields: {
        code: {
          validators: {
            notEmpty: {
              message: "Verification code is required",
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

    // Handle form submit
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
                text: "You have successfully verified your account.",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(function (result) {
                if (result.isConfirmed) {
                  // Enable submit button after loading
                  submitButton.disabled = false;

                  // Redirect to customers list page
                  window.location = form.getAttribute("data-kt-redirect-url");
                }
              });
            }, 2000);
          } else {
            Swal.fire({
              text: "Please enter a valid verification code to proceed.",
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
  };

  // Public functions
  return {
    // Initialization
    init: function () {
      form = document.querySelector("#kt_sing_in_two_factor_form");
      submitButton = document.querySelector("#kt_sing_in_two_factor_submit");

      handleForm();
    },
  };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  KTSigninTwoFactor.init();
});
