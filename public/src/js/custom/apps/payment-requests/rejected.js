"use strict";

// Class definition
var KTPaymentRequestRejected = (function () {
  // Shared variables
  const element = document.getElementById("kt-reject-payment-request-modal");
  const modal = new bootstrap.Modal(element);

  // Init add schedule modal
  var initRejectedModal = () => {
    // Close button handler
    const closeButton = element.querySelectorAll(
      '[data-kt-reject-payment-request-modal-action="close"]'
    );
    closeButton.forEach((closeButton) => {
      closeButton.addEventListener("click", (e) => {
        e.preventDefault();

        modal.hide();
      });
    });
  };

  return {
    // Public functions
    init: function () {
      initRejectedModal();
    },
  };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  KTPaymentRequestRejected.init();
});
