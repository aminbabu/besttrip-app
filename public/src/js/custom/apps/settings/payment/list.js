'use strict';

var KTSettingsPayment = (function () {
    // Define shared variables
    var table;
    var datatable;
    var toolbarBase;
    var toolbarSelected;
    var selectedCount;

    // Private functions
    var initDatatable = function () {
        // Set date data order
        const tableRows = table.querySelectorAll('tbody tr');

        tableRows.forEach((row) => {
            const dateRow = row.querySelectorAll('td');

            const realBookingDate = moment(
                dateRow[5].innerHTML,
                'DD MMM YYYY, LT'
            ).format(); // select date from 6th column in table
            dateRow[5].setAttribute('data-order', realBookingDate);

            const realTravelDate = moment(
                dateRow[7].innerHTML,
                'DD MMM YYYY, LT'
            ).format(); // select date from 8th column in table
            dateRow[7].setAttribute('data-order', realTravelDate);
        });

        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            info: false,
            order: [],
            pageLength: 10,
            // lengthChange: false,
            columnDefs: [
                { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
            ],
        });

        // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
        datatable.on('draw', function () {
            initToggleToolbar();
            handleRowDeletion();
            toggleToolbars();
        });
    };

    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
    var handleSearch = function () {
        const filterSearch = document.querySelector(
            '[data-kt-settings-payment-table-filter="search"]'
        );
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    };

    // Delete subscirption
    var handleRowDeletion = function () {
        // Select all delete buttons
        const deleteButtons = table.querySelectorAll(
            '[data-kt-settings-payment-table-filter="delete_row"]'
        );

        deleteButtons.forEach((d) => {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();

                const url = d.getAttribute('href');

                // Select parent row
                const parent = e.target.closest('tr');

                // Get customer name
                const accountHolderName =
                    parent.querySelectorAll('td')[1].innerText;

                // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                Swal.fire({
                    text:
                        'Are you sure you want to delete ' +
                        accountHolderName +
                        '?',
                    icon: 'warning',
                    showCancelButton: true,
                    buttonsStyling: false,
                    confirmButtonText: 'Yes, delete!',
                    cancelButtonText: 'No, cancel',
                    customClass: {
                        confirmButton: 'btn fw-bold btn-danger',
                        cancelButton: 'btn fw-bold btn-active-light-primary',
                    },
                }).then(function (result) {
                    if (result.value) {
                        // Check axios library docs: https://axios-http.com/docs/intro
                        axios
                            .delete(url)
                            .then((response) => {
                                if (response) {
                                    Swal.fire({
                                        text:
                                            response?.data?.message ||
                                            'Deleted payments settings successfully',
                                        icon: 'success',
                                        buttonsStyling: false,
                                        confirmButtonText: 'Ok, got it!',
                                        customClass: {
                                            confirmButton: 'btn btn-primary',
                                        },

                                        allowOutsideClick: false,
                                    })
                                        .then(function () {
                                            // Remove current row
                                            datatable
                                                .row($(parent))
                                                .remove()
                                                .draw();
                                        })
                                        .then(function () {
                                            // Detect checked checkboxes
                                            toggleToolbars();
                                        });
                                } else {
                                    // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                    Swal.fire({
                                        text:
                                            response?.data?.message ||
                                            'Sorry, we ran into an error! Please try again.',
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
                                const errors = error.response?.data?.message
                                    ? error.response?.data?.message
                                    : error?.response?.data?.errors;

                                Swal.fire({
                                    html: `${
                                        errors instanceof Array
                                            ? `<ul class="text-start">${Object.values(
                                                  error.response.data.errors
                                              )
                                                  .map(
                                                      (err) =>
                                                          `<li>${err?.message}</li>`
                                                  )
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
                    } else if (result.dismiss === 'cancel') {
                        Swal.fire({
                            text: accountHolderName + ' was not deleted.',
                            icon: 'error',
                            buttonsStyling: false,
                            confirmButtonText: 'Ok, got it!',
                            customClass: {
                                confirmButton: 'btn fw-bold btn-primary',
                            },
                        });
                    }
                });
            });
        });
    };

    // Init toggle toolbar
    var initToggleToolbar = () => {
        // Toggle selected action toolbar
        // Select all checkboxes
        const checkboxes = table.querySelectorAll('[type="checkbox"]');

        // Select elements
        toolbarBase = document.querySelector(
            '[data-kt-settings-payment-table-toolbar="base"]'
        );
        toolbarSelected = document.querySelector(
            '[data-kt-settings-payment-table-toolbar="selected"]'
        );
        selectedCount = document.querySelector(
            '[data-kt-settings-payment-table-select="selected_count"]'
        );
        const deleteSelected = document.querySelector(
            '[data-kt-settings-payment-table-select="delete_selected"]'
        );

        // Toggle delete selected toolbar
        checkboxes.forEach((c) => {
            // Checkbox on click event
            c.addEventListener('click', function () {
                setTimeout(function () {
                    toggleToolbars();
                }, 50);
            });
        });

        // Deleted selected rows
        deleteSelected.addEventListener('click', function () {
            // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
            Swal.fire({
                text: 'Are you sure you want to delete selected customers?',
                icon: 'warning',
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: 'Yes, delete!',
                cancelButtonText: 'No, cancel',
                customClass: {
                    confirmButton: 'btn fw-bold btn-danger',
                    cancelButton: 'btn fw-bold btn-active-light-primary',
                },
            }).then(function (result) {
                if (result.value) {
                    Swal.fire({
                        text: 'You have deleted all selected customers!.',
                        icon: 'success',
                        buttonsStyling: false,
                        confirmButtonText: 'Ok, got it!',
                        customClass: {
                            confirmButton: 'btn fw-bold btn-primary',
                        },
                    })
                        .then(function () {
                            // Remove all selected customers
                            checkboxes.forEach((c) => {
                                if (c.checked) {
                                    datatable
                                        .row($(c.closest('tbody tr')))
                                        .remove()
                                        .draw();
                                }
                            });

                            // Remove header checked box
                            const headerCheckbox =
                                table.querySelectorAll('[type="checkbox"]')[0];
                            headerCheckbox.checked = false;
                        })
                        .then(function () {
                            toggleToolbars(); // Detect checked checkboxes
                            initToggleToolbar(); // Re-init toolbar to recalculate checkboxes
                        });
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: 'Selected customers was not deleted.',
                        icon: 'error',
                        buttonsStyling: false,
                        confirmButtonText: 'Ok, got it!',
                        customClass: {
                            confirmButton: 'btn fw-bold btn-primary',
                        },
                    });
                }
            });
        });
    };

    // Toggle toolbars
    const toggleToolbars = () => {
        // Select refreshed checkbox DOM elements
        const allCheckboxes = table.querySelectorAll('tbody [type="checkbox"]');

        // Detect checkboxes state & count
        let checkedState = false;
        let count = 0;

        // Count checked boxes
        allCheckboxes.forEach((c) => {
            if (c.checked) {
                checkedState = true;
                count++;
            }
        });

        // Toggle toolbars
        if (checkedState) {
            selectedCount.innerHTML = count;
            toolbarBase.classList.add('d-none');
            toolbarSelected.classList.remove('d-none');
        } else {
            toolbarBase.classList.remove('d-none');
            toolbarSelected.classList.add('d-none');
        }
    };

    // Init flatpickr --- more info: https://flatpickr.js.org/
    var initFlatpickr = function () {
        // Select date from input
        const datepicker = document.querySelector(
            '[data-kt-settings-payment-table-filter="date"]'
        );

        // Init flatpickr
        $(datepicker).flatpickr({
            altInput: true,
            altFormat: 'F j, Y',
            dateFormat: 'Y-m-d',
            mode: 'range',
        });
    };

    return {
        // Public functions
        init: function () {
            table = document.getElementById('kt_settings_payment_table');

            if (!table) {
                return;
            }

            initDatatable();
            initToggleToolbar();
            handleSearch();
            handleRowDeletion();
            initFlatpickr();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTSettingsPayment.init();
});
