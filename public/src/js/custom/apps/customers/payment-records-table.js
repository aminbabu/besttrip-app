'use strict';

var KTContentPaymentRequests = (function () {
    // Define shared variables
    var table;
    var datatable;

    // Private functions
    var initDatatable = function () {
        // Init DataTable
        datatable = $(table).DataTable({
            info: false,
            order: [],
            pageLength: 10,
            columnDefs: [
                { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
                { orderable: false, targets: 8 }, // Disable ordering on column 8 (Receipt)
            ],
        });
    };

    return {
        // Public functions
        init: function () {
            table = document.getElementById('kt_payment_requests_table');

            if (!table) {
                return;
            }

            initDatatable();
        },
    };
})();

// On document ready
$(document).ready(function () {
    KTContentPaymentRequests.init();
});
