'use strict';

var KTContentExclusiveOffers = (function () {
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
            '[data-kt-content-exclusive-offers-table-filter="search"]'
        );
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    };

    // Delete package
    var handleRowDeletion = function () {
        // Select all delete buttons
        const deleteButtons = table.querySelectorAll(
            '[data-kt-content-exclusive-offers-table-filter="delete_row"]'
        );

        deleteButtons.forEach((d) => {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();

                // Select parent row
                const parent = e.target.closest('tr');

                // Get package name
                const packageName = parent.querySelectorAll('td')[1].innerText;

                // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                Swal.fire({
                    text:
                        'Are you sure you want to delete ' + packageName + '?',
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
                            text: 'You have deleted ' + packageName + '!.',
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
                            text: packageName + ' was not deleted.',
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
            '.form-check-input-toggle[type="checkbox"]'
        );

        // Select elements
        toolbarBase = document.querySelector(
            '[data-kt-content-exclusive-offers-table-toolbar="base"]'
        );
        toolbarSelected = document.querySelector(
            '[data-kt-content-exclusive-offers-table-toolbar="selected"]'
        );
        selectedCount = document.querySelector(
            '[data-kt-content-exclusive-offers-table-select="selected_count"]'
        );
        const deleteSelected = document.querySelector(
            '[data-kt-content-exclusive-offers-table-select="delete_selected"]'
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

    // Init File Uploader
    const initFileUploader = () => {
        const handleFileInputChange = (input) => {
            const previewContainer = input.closest('.kt-file-uploader');
            const label = previewContainer.querySelector(
                '.kt-file-uploader-label'
            );
            const maxFileSize = parseInt(
                input.getAttribute('data-kt-file-uploader-max-size')
            );
            const invalidMessage =
                previewContainer.querySelector('.invalid-feedback');
            const file = input.files[0];

            if (!file) {
                return;
            }

            // remove error message
            invalidMessage.classList.add('d-none');

            // create preview element and append to the container
            const preview = document.createElement('img');

            if (file?.size > 1024 * 1024 * maxFileSize) {
                const message = `File size should not exceed ${maxFileSize}MB`;

                if (ktFileUploaderContent) {
                    // restore label content
                    label.innerHTML = ktFileUploaderContent;
                }

                // empty input value
                input.value = '';

                // append error message
                invalidMessage.innerHTML = message;
                invalidMessage.classList.remove('d-none');
                return;
            }

            // add was-invalid class to the container
            if (!previewContainer.classList.contains('was-invalided')) {
                ktFileUploaderContent = label.innerHTML;
                previewContainer.classList.add('was-invalided');
            }

            // remove content and append preview
            label.innerHTML = '';
            preview.classList.add('kt-file-uploader-preview');
            preview.src = URL.createObjectURL(file);
            preview.alt = file.name;
            label.appendChild(preview);
        };

        form.addEventListener('change', function (event) {
            const target = event.target;

            // Check if the changed element is an input with type file
            if (target.tagName === 'INPUT' && target.type === 'file') {
                handleFileInputChange(target);
            }
        });
    };

    return {
        // Public functions
        init: function () {
            table = document.getElementById(
                'kt_content_exclusive_offers_table'
            );

            if (!table) {
                return;
            }

            initDatatable();
            initToggleToolbar();
            handleSearch();
            handleRowDeletion();
            initFileUploader();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTContentExclusiveOffers.init();
});
