'use strict';

var KTContentUmrahOffers = (function () {
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

        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            info: false,
            order: [],
            pageLength: 10,
            // lengthChange: false,
            columnDefs: [
                { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
                { orderable: false, targets: 4 }, // Disable ordering on column 4 (actions)
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
            '[data-kt-content-umrah-offers-table-filter="search"]'
        );
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    };

    // Delete package
    var handleRowDeletion = function () {
        // Select all delete buttons
        const deleteButtons = table.querySelectorAll(
            '[data-kt-content-umrah-offers-table-filter="delete_row"]'
        );

        deleteButtons.forEach((d) => {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();

                const url = d.getAttribute('href');

                // Select parent row
                const parent = e.target.closest('tr');

                // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                Swal.fire({
                    text: 'Are you sure you want to delete this offer?',
                    icon: 'warning',
                    showCancelButton: true,
                    buttonsStyling: false,
                    confirmButtonText: 'Yes, delete!',
                    cancelButtonText: 'No, cancel',
                    customClass: {
                        confirmButton: 'btn btn-primary',
                        cancelButton: 'btn btn-active-light-primary',
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
                                            'The offer has been deleted successfully!',
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
                            text: 'The offer was not deleted.',
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
        });
    };

    // Init toggle toolbar
    var initToggleToolbar = () => {
        // Toggle selected action toolbar
        // Select all checkboxes
        const checkboxes = table.querySelectorAll(
            '.form-check-input-toggle[type="checkbox"]'
        );

        // Select elements
        toolbarBase = document.querySelector(
            '[data-kt-content-umrah-offers-table-toolbar="base"]'
        );
        toolbarSelected = document.querySelector(
            '[data-kt-content-umrah-offers-table-toolbar="selected"]'
        );
        selectedCount = document.querySelector(
            '[data-kt-content-umrah-offers-table-select="selected_count"]'
        );
        const deleteSelected = document.querySelector(
            '[data-kt-content-umrah-offers-table-select="delete_selected"]'
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
                text: 'Are you sure you want to delete selected packages?',
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
                        text: 'You have deleted all selected packages!.',
                        icon: 'success',
                        buttonsStyling: false,
                        confirmButtonText: 'Ok, got it!',
                        customClass: {
                            confirmButton: 'btn fw-bold btn-primary',
                        },
                    })
                        .then(function () {
                            // Remove all selected packages
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
                        text: 'Selected packages was not deleted.',
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
            'tbody .form-check-input-toggle[type="checkbox"]'
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

    return {
        // Public functions
        init: function () {
            table = document.getElementById('kt_content_umrah_offers_table');

            if (!table) {
                return;
            }

            initDatatable();
            initToggleToolbar();
            handleSearch();
            handleRowDeletion();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTContentUmrahOffers.init();
});
