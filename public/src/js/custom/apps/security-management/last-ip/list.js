'use strict';

var KTSecurityLastIPList = (function () {
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
            const realDate = moment(
                dateRow[5].innerHTML,
                'DD MMM YYYY, LT'
            ).format(); // select date from 4th column in table
            dateRow[5].setAttribute('data-order', realDate);
        });

        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            info: false,
            order: [],
            pageLength: 10,
            // lengthChange: false,
            columnDefs: [
                { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
                { orderable: false, targets: 6 }, // Disable ordering on column 6 (actions)
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
            '[data-kt-security-last-ip-table-filter="search"]'
        );
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    };

    // Filter Datatable
    var handleFilter = function () {
        // Select filter options
        const filterForm = document.querySelector(
            '[data-kt-security-last-ip-table-filter="form"]'
        );
        const filterButton = filterForm.querySelector(
            '[data-kt-security-last-ip-table-filter="filter"]'
        );
        const resetButton = filterForm.querySelector(
            '[data-kt-security-last-ip-table-filter="reset"]'
        );
        const selectOptions = filterForm.querySelectorAll('select');

        // Filter datatable on submit
        filterButton.addEventListener('click', function () {
            var filterString = '';

            // Get filter values
            selectOptions.forEach((item, index) => {
                if (item.value && item.value !== '') {
                    if (index !== 0) {
                        filterString += ' ';
                    }

                    // Build filter value options
                    filterString += item.value;
                }
            });

            // Filter datatable --- official docs reference: https://datatables.net/reference/api/search()
            datatable.search(filterString).draw();
        });

        // Reset datatable
        resetButton.addEventListener('click', function () {
            // Reset filter form
            selectOptions.forEach((item, index) => {
                // Reset Select2 dropdown --- official docs reference: https://select2.org/programmatic-control/add-select-clear-items
                $(item).val(null).trigger('change');
            });

            // Filter datatable --- official docs reference: https://datatables.net/reference/api/search()
            datatable.search('').draw();
        });
    };

    // Delete subscirption
    var handleRowDeletion = function () {
        // Select all delete buttons
        const deleteButtons = table.querySelectorAll(
            '[data-kt-security-last-ip-table-filter="delete_row"]'
        );

        deleteButtons.forEach((d) => {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();

                // Select parent row
                const parent = e.target.closest('tr');

                // Get customer name
                const customerName = parent.querySelectorAll('td')[1].innerText;

                // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                Swal.fire({
                    text:
                        'Are you sure you want to delete ' + customerName + '?',
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
                            text: 'You have deleted ' + customerName + '!.',
                            icon: 'success',
                            buttonsStyling: false,
                            confirmButtonText: 'Ok, got it!',
                            customClass: {
                                confirmButton: 'btn fw-bold btn-primary',
                            },
                        })
                            .then(function () {
                                // Remove current row
                                datatable.row($(parent)).remove().draw();
                            })
                            .then(function () {
                                // Detect checked checkboxes
                                toggleToolbars();
                            });
                    } else if (result.dismiss === 'cancel') {
                        Swal.fire({
                            text: customerName + ' was not deleted.',
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
        const checkboxes = table.querySelectorAll(
            '.form-check-input[type="checkbox"]'
        );

        // Select elements
        toolbarBase = document.querySelector(
            '[data-kt-security-last-ip-table-toolbar="base"]'
        );
        toolbarSelected = document.querySelector(
            '[data-kt-security-last-ip-table-toolbar="selected"]'
        );
        selectedCount = document.querySelector(
            '[data-kt-security-last-ip-table-select="selected_count"]'
        );
        const deleteSelected = document.querySelector(
            '[data-kt-security-last-ip-table-select="delete_selected"]'
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
                            const headerCheckbox = table.querySelectorAll(
                                '.form-check-input[type="checkbox"]'
                            )[0];
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
        const allCheckboxes = table.querySelectorAll(
            'tbody .form-check-input[type="checkbox"]'
        );

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
            '[data-kt-security-last-ip-table-filter="date"]'
        );

        // Init flatpickr
        $(datepicker).flatpickr({
            altInput: true,
            altFormat: 'F j, Y',
            dateFormat: 'Y-m-d',
            mode: 'range',
        });
    };

    // Block ip
    const blockBtnInt = async () => {
        // Use querySelectorAll to select all matching elements
        const blockBtns = document.querySelectorAll(
            '[data-kt-block-btn="block-btn"]'
        );

        // Check if there are any buttons found
        if (blockBtns.length === 0) {
            return;
        }
        blockBtns.forEach((button) => {
            button.addEventListener('click', async () => {
                const url = button.getAttribute('data-kt-block-url');

                try {
                    const response = await axios.patch(url, {
                        status: 'blocked',
                    });

                    // Display success message
                    Swal.fire({
                        text:
                            response?.data?.message ||
                            'Status has been updated successfully!',
                        icon: 'success',
                        buttonsStyling: false,
                        confirmButtonText: 'Ok, got it!',
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                        allowOutsideClick: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Reload the page after confirmation
                            location.reload();
                        }
                    });
                } catch (error) {
                    // Display error message
                    const errors =
                        error.response?.data?.message ||
                        error.response?.data?.errors;

                    Swal.fire({
                        html:
                            errors instanceof Array
                                ? `<ul class="text-start">${Object.values(
                                      error.response.data.errors
                                  )
                                      .map((err) => `<li>${err?.message}</li>`)
                                      .join('')}</ul>`
                                : errors,
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
            table = document.getElementById('kt_security_last_ip_table');

            if (!table) {
                return;
            }

            initDatatable();
            initToggleToolbar();
            blockBtnInt();
            handleSearch();
            handleRowDeletion();
            handleFilter();
            initFlatpickr();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTSecurityLastIPList.init();
});
