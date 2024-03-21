"use strict";

// Class definition
var KTAppSettings = (function () {
  // Shared variables
  var fileInputs;
  var ktFileUploaderContent;

  // Private functions
  const initForms = () => {
    const forms = [
      "kt_settings_content_hotels_form",
      "kt_settings_content_destinations_form",
      "kt_settings_content_umrah_&_ziyarah_form",
      "kt_settings_content_beautiful_places_form",
    ];

    // Init all forms
    forms.forEach((formId) => {
      // Select form
      const form = document.getElementById(formId);

      if (!form) {
        return;
      }

      // Dynamically create validation non-empty rule
      const requiredFields = form.querySelectorAll(".required");
      var detectedField;
      var validationFields = {
        fields: {},

        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector: ".fv-row",
            eleInvalidClass: "",
            eleValidClass: "",
          }),
        },
      };

      // Detect required fields
      requiredFields.forEach((el) => {
        const input = el.closest(".row").querySelector("input");
        if (input) {
          detectedField = input;
        }

        const textarea = el.closest(".row").querySelector("textarea");
        if (textarea) {
          detectedField = textarea;
        }

        const select = el.closest(".row").querySelector("select");
        if (select) {
          detectedField = select;
        }

        // Add validation rule
        const name = detectedField?.getAttribute("name");
        validationFields.fields[name] = {
          validators: {
            notEmpty: {
              message: el.innerText + " is required",
            },
          },
        };
      });

      // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
      var validator = FormValidation.formValidation(form, validationFields);

      // Submit button handler
      const submitButton = form.querySelector(
        '[data-kt-settings-type="submit"]'
      );
      submitButton.addEventListener("click", function (e) {
        // Prevent default button action
        e.preventDefault();

        // Validate form before submit
        if (validator) {
          validator.validate().then(function (status) {
            console.log("validated!");

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
                });

                // Reset file inputs after submit
                fileInputs.forEach((input) => {
                  const previewContainer = input.closest(".kt-file-uploader");
                  const label = previewContainer.querySelector(
                    ".kt-file-uploader-label"
                  );

                  input.value = "";
                  label.innerHTML = ktFileUploaderContent;
                });

                form.reset(); // Reset form to default state

                // form.submit(); // Submit form
              }, 2000);
            } else {
              // Show popup error
              Swal.fire({
                text: "Oops! There are some error(s) detected.",
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
    });
  };

  // Public methods
  return {
    init: function () {
      initForms();
    },
  };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  KTAppSettings.init();
});
