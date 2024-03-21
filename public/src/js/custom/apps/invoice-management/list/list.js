"use strict";

// Class definition
var KTInvoiceList = (function () {
  // Define shared variables
  var datatable;
  var datepicker;
  var filterBookingType;
  var table;

  // Private functions
  var initInvoiceList = function () {
    // Set date data order
    const tableRows = table.querySelectorAll("tbody tr");

    tableRows.forEach((row) => {
      const dateRow = row.querySelectorAll("td");
      const realDate = moment(dateRow[5].innerHTML, "DD MMM YYYY, LT").format(); // select date from 5th column in table
      dateRow[5].setAttribute("data-order", realDate);
    });

    // Init datatable --- more info on datatables: https://datatables.net/manual/
    datatable = $(table).DataTable({
      info: false,
      order: [],
      columnDefs: [
        { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
        { orderable: false, targets: 7 }, // Disable ordering on column 7 (actions)
      ],
    });

    // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
    datatable.on("draw", function () {
      initToggleToolbar();
      handleDownloadRows();
      toggleToolbars();
      KTMenu.init(); // reinit KTMenu instances
    });
  };

  // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
  var handleSearchDatatable = () => {
    const filterSearch = document.querySelector(
      '[data-kt-invoice-table-filter="search"]'
    );
    filterSearch.addEventListener("keyup", function (e) {
      datatable.search(e.target.value).draw();
    });
  };

  // Filter Datatable
  var handleFilterDatatable = () => {
    // Select filter options
    filterBookingType = document.querySelector(
      '[data-kt-invoice-table-filter="booking_type"]'
    );
    const filterButton = document.querySelector(
      '[data-kt-invoice-table-filter="filter"]'
    );

    // Filter datatable on submit
    filterButton.addEventListener("click", function () {
      // Get filter values
      let bookingTypeValue = filterBookingType.value;

      // Build filter string from filter options
      const filterString = bookingTypeValue;

      // Filter datatable --- official docs reference: https://datatables.net/reference/api/search()
      datatable.search(filterString).draw();
    });
  };

  // Download invoice
  var handleDownloadRows = () => {
    // Select all download buttons
    const downloadButtons = table.querySelectorAll(
      '[data-kt-invoice-table-filter="download_row"]'
    );

    downloadButtons.forEach((d) => {
      // Download button on click
      d.addEventListener("click", function (e) {
        e.preventDefault();

        // Select parent row
        const parent = e.target.closest("tr");

        // Get invoice name
        const invoiceName = parent.querySelectorAll("td")[1].innerText;

        // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
        Swal.fire({
          text: "Are you sure you want to download " + invoiceName + "?",
          icon: "warning",
          showCancelButton: true,
          buttonsStyling: false,
          confirmButtonText: "Yes, download!",
          cancelButtonText: "No, cancel",
          customClass: {
            confirmButton: "btn fw-bold btn-danger",
            cancelButton: "btn fw-bold btn-active-light-primary",
          },
        }).then(function (result) {
          if (result.value) {
            Swal.fire({
              text: "You have downloaded " + invoiceName + "!.",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-primary",
              },
            }).then(function () {
              // Remove current row
              datatable.row($(parent)).remove().draw();
            });
          } else if (result.dismiss === "cancel") {
            Swal.fire({
              text: invoiceName + " was not downloaded.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-primary",
              },
            });
          }
        });
      });
    });
  };

  // Reset Filter
  var handleResetForm = () => {
    // Select reset button
    const resetButton = document.querySelector(
      '[data-kt-invoice-table-filter="reset"]'
    );

    // Reset datatable
    resetButton.addEventListener("click", function () {
      // Reset month
      $(filterBookingType).val(null).trigger("change");

      // Reset bookingType type
      filterBookingType.value = "";

      // Reset datepicker
      $(datepicker).val("");

      // Reset datatable --- official docs reference: https://datatables.net/reference/api/search()
      datatable.search("").draw();
    });
  };

  // Init toggle toolbar
  var initToggleToolbar = () => {
    // Toggle selected action toolbar
    // Select all checkboxes
    const checkboxes = table.querySelectorAll('[type="checkbox"]');

    // Select elements
    const downloadSelected = document.querySelector(
      '[data-kt-invoice-table-select="download_selected"]'
    );

    // Toggle download selected toolbar
    checkboxes.forEach((c) => {
      // Checkbox on click event
      c.addEventListener("click", function () {
        setTimeout(function () {
          toggleToolbars();
        }, 50);
      });
    });

    // Downloaded selected rows
    downloadSelected.addEventListener("click", function () {
      // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
      Swal.fire({
        text: "Are you sure you want to download selected invoice?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Yes, download!",
        cancelButtonText: "No, cancel",
        customClass: {
          confirmButton: "btn fw-bold btn-danger",
          cancelButton: "btn fw-bold btn-active-light-primary",
        },
      }).then(function (result) {
        if (result.value) {
          Swal.fire({
            text: "You have downloaded all selected invoice!.",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn fw-bold btn-primary",
            },
          }).then(function () {
            // Remove header checked box
            const headerCheckboxes =
              table.querySelectorAll('[type="checkbox"]');

            headerCheckboxes.forEach((c) => {
              c.checked = false;
            });

            // Remove selected action toolbar
            toggleToolbars();

            // Download selected invoices
          });
        } else if (result.dismiss === "cancel") {
          Swal.fire({
            text: "Selected invoice was not downloaded.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn fw-bold btn-primary",
            },
          });
        }
      });
    });
  };

  // Toggle toolbars
  const toggleToolbars = () => {
    // Define variables
    const toolbarBase = document.querySelector(
      '[data-kt-invoice-table-toolbar="base"]'
    );
    const toolbarSelected = document.querySelector(
      '[data-kt-invoice-table-toolbar="selected"]'
    );
    const selectedCount = document.querySelector(
      '[data-kt-invoice-table-select="selected_count"]'
    );

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
      toolbarBase.classList.add("d-none");
      toolbarSelected.classList.remove("d-none");
    } else {
      toolbarBase.classList.remove("d-none");
      toolbarSelected.classList.add("d-none");
    }
  };

  var initForm = function () {
    // Handle datepicker range -- For more info on flatpickr plugin, please visit: https://flatpickr.js.org/
    $('[data-kt-invoice-table-filter][name="date"]').flatpickr({
      altInput: true,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      mode: "range",
    });
  };

  // Public methods
  return {
    init: function () {
      table = document.querySelector("#kt_invoice_table");

      if (!table) {
        return;
      }

      initInvoiceList();
      initToggleToolbar();
      handleSearchDatatable();
      handleFilterDatatable();
      handleDownloadRows();
      handleResetForm();
      initForm();
    },
  };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  KTInvoiceList.init();
});
