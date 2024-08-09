'use strict';

var KTContentInvoiceTable = (function () {
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
                { orderable: false, targets: 9 }, // Disable ordering on column 9 (Actions)
            ],
        });
    };

    return {
        // Public functions
        init: function () {
            table = document.getElementById('kt_invoice_table');

            if (!table) {
                return;
            }

            initDatatable();
        },
    };
})();

// On document ready
$(document).ready(function () {
    KTContentInvoiceTable.init();
});
