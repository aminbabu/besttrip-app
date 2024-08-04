'use strict';

// Class definition
var KTUsersBookingHistory = (function () {
    // Shared variables
    const element = document.getElementById('kt_modal_booking-history');

    if (!element) {
        return;
    }

    const form = element.querySelector('#kt_modal_booking-history_form');
    const modal = new bootstrap.Modal(element);

    // Init add schedule modal
    var initBookingHistory = () => {
        // Close button handler
        const closeButton = element.querySelector(
            '[data-kt-booking-history-modal-action="close"]'
        );
        closeButton.addEventListener('click', (e) => {
            e.preventDefault();

            Swal.fire({
                text: 'Are you sure you would like to cancel?',
                icon: 'warning',
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: 'Yes, cancel it!',
                cancelButtonText: 'No, return',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-active-light',
                },
            }).then(function (result) {
                if (result.value) {
                    form.reset(); // Reset form
                    modal.hide(); // Hide modal
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: 'Your form has not been cancelled!.',
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
        init: function () {
            initBookingHistory();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTUsersBookingHistory.init();
});
