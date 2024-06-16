// Class definition
const KTPaymentRequestRejected = (function () {
    // Shared variables
    let element;
    let modal;

    // Init add schedule modal
    const initRejectedModal = () => {
        // Close button handler
        const closeButton = element.querySelectorAll(
            '[data-kt-reject-payment-request-modal-action="close"]'
        );
        closeButton.forEach((closeButton) => {
            closeButton.addEventListener('click', (e) => {
                e.preventDefault();

                modal.hide();
            });
        });
    };

    // Get payment request data on modal show
    const showPaymentRequestData = () => {
        const triggers = document.querySelectorAll(
            '[data-kt-trigger="kt_payment_requests_rejected_reason"]'
        );

        triggers.forEach((trigger) => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const url = trigger.getAttribute('href');
                const messageEl = element.querySelector('#kt_payment_requests_rejected_reason');

                // Check axios library docs: https://axios-http.com/docs/intro
                axios
                    .get(url)
                    .then((response) => {
                        if (response) {
                            // Fill the fields
                            const { paymentRequest } = response.data;

                            if (!paymentRequest?.notes) {
                                paymentRequest.notes = 'No reason provided';
                            }

                            messageEl.innerHTML = paymentRequest.notes;
                        } else {
                            // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                            Swal.fire({
                                text: 'Sorry, something went wrong. Please try again.',
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
            });
        });
    };

    return {
        // Public functions
        init() {
            element = document.getElementById('kt-reject-reason-payment-request-modal');

            if (!element) {
                return;
            }

            modal = new bootstrap.Modal(element);

            initRejectedModal();
            showPaymentRequestData();
        },
    };
}());

// On document ready
KTUtil.onDOMContentLoaded(() => {
    KTPaymentRequestRejected.init();
});
