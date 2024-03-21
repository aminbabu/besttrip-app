"use strict";

// Class definition
var KTContentBlogPostAdd = (function () {
  // Shared variables
  const element = document.getElementById("kt_modal_add_content_blog_posts");
  const form = element.querySelector("#kt_modal_add_content_blog_posts_form");
  const modal = new bootstrap.Modal(element);
  var ktFileUploaderContent;

  // Init add schedule modal
  var initAddContentExclusiveOffer = () => {
    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    var validator = FormValidation.formValidation(form, {
      fields: {
        thumbnail: {
          validators: {
            notEmpty: {
              message: "Thumbnail is required",
            },
          },
        },
        title: {
          validators: {
            notEmpty: {
              message: "Title is required",
            },
          },
        },
        subtitle: {
          validators: {
            notEmpty: {
              message: "Subtitle is required",
            },
          },
        },
        location: {
          validators: {
            notEmpty: {
              message: "Location is required",
            },
          },
        },
        rating: {
          validators: {
            notEmpty: {
              message: "Rating is required",
            },
          },
        },
        description: {
          validators: {
            notEmpty: {
              message: "Description is required",
            },
          },
        },
        domestic_airlines: {
          validators: {
            notEmpty: {
              message: "Domestic Airlines is required",
            },
          },
        },
        nearest_airport: {
          validators: {
            notEmpty: {
              message: "Nearest Airport is required",
            },
          },
        },
        status: {
          validators: {
            notEmpty: {
              message: "Status is required",
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
      '[data-kt-add-content-blog-post-modal-action="submit"]'
    );
    submitButton.addEventListener("click", (e) => {
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
      '[data-kt-add-content-blog-post-modal-action="cancel"]'
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
      '[data-kt-add-content-blog-post-modal-action="close"]'
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

  // Init File Uploader
  const initFileUploader = () => {
    const handleFileInputChange = (input) => {
      const previewContainer = input.closest(".kt-file-uploader");
      const label = previewContainer.querySelector(".kt-file-uploader-label");
      const maxFileSize = parseInt(
        input.getAttribute("data-kt-file-uploader-max-size")
      );
      const invalidMessage =
        previewContainer.querySelector(".invalid-feedback");
      const file = input.files[0];

      if (!file) {
        return;
      }

      // remove error message
      invalidMessage.classList.add("d-none");

      // create preview element and append to the container
      const preview = document.createElement("img");

      if (file?.size > 1024 * 1024 * maxFileSize) {
        const message = `File size should not exceed ${maxFileSize}MB`;

        if (ktFileUploaderContent) {
          // restore label content
          label.innerHTML = ktFileUploaderContent;
        }

        // empty input value
        input.value = "";

        // append error message
        invalidMessage.innerHTML = message;
        invalidMessage.classList.remove("d-none");
        return;
      }

      // add was-invalid class to the container
      if (!previewContainer.classList.contains("was-invalided")) {
        ktFileUploaderContent = label.innerHTML;
        previewContainer.classList.add("was-invalided");
      }

      // remove content and append preview
      label.innerHTML = "";
      preview.classList.add("kt-file-uploader-preview");
      preview.src = URL.createObjectURL(file);
      preview.alt = file.name;
      label.appendChild(preview);
    };

    form.addEventListener("change", function (event) {
      const target = event.target;

      // Check if the changed element is an input with type file
      if (target.tagName === "INPUT" && target.type === "file") {
        handleFileInputChange(target);
      }
    });
  };

  return {
    // Public functions
    init: function () {
      initAddContentExclusiveOffer();
      initFileUploader();
    },
  };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  KTContentBlogPostAdd.init();
});
