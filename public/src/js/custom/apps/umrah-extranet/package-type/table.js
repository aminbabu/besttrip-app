"use strict";

var KTUmrahExtranetPackagetypeList = (function () {
  // Define shared variables
  var table;
  var datatable;
  var toolbarBase;
  var toolbarSelected;
  var selectedCount;

  // Private functions
  var initDatatable = function () {
    // Set date data order
    const tableRows = table.querySelectorAll("tbody tr");

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
    datatable.on("draw", function () {
      initToggleToolbar();
      handleRowDeletion();
      toggleToolbars();
    });
  };

  // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
  var handleSearch = function () {
    const filterSearch = document.querySelector(
      '[data-kt-umrah-extranet-package-type-table-filter="search"]'
    );
    filterSearch.addEventListener("keyup", function (e) {
      datatable.search(e.target.value).draw();
    });
  };

  // Delete package
  var handleRowDeletion = function () {
    // Select all delete buttons
    const deleteButtons = table.querySelectorAll(
      '[data-kt-umrah-extranet-package-type-table-filter="delete_row"]'
    );

    deleteButtons.forEach((d) => {
      // Delete button on click
      d.addEventListener("click", function (e) {
        e.preventDefault();

        // Select parent row
        const parent = e.target.closest("tr");

        // Get package name
        const packageName = parent.querySelectorAll("td")[1].innerText;

        // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
        Swal.fire({
          text: "Are you sure you want to delete " + packageName + "?",
          icon: "warning",
          showCancelButton: true,
          buttonsStyling: false,
          confirmButtonText: "Yes, delete!",
          cancelButtonText: "No, cancel",
          customClass: {
            confirmButton: "btn fw-bold btn-danger",
            cancelButton: "btn fw-bold btn-active-light-primary",
          },
        }).then(function (result) {
          if (result.value) {
            Swal.fire({
              text: "You have deleted " + packageName + "!.",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-primary",
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
          } else if (result.dismiss === "cancel") {
            Swal.fire({
              text: packageName + " was not deleted.",
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

  // Init toggle toolbar
  var initToggleToolbar = () => {
    // Toggle selected action toolbar
    // Select all checkboxes
    const checkboxes = table.querySelectorAll(
      '.form-check-input-toggle[type="checkbox"]'
    );

    // Select elements
    toolbarBase = document.querySelector(
      '[data-kt-umrah-extranet-package-type-table-toolbar="base"]'
    );
    toolbarSelected = document.querySelector(
      '[data-kt-umrah-extranet-package-type-table-toolbar="selected"]'
    );
    selectedCount = document.querySelector(
      '[data-kt-umrah-extranet-package-type-table-select="selected_count"]'
    );
    const deleteSelected = document.querySelector(
      '[data-kt-umrah-extranet-package-type-table-select="delete_selected"]'
    );

    // Toggle delete selected toolbar
    checkboxes.forEach((c) => {
      // Checkbox on click event
      c.addEventListener("click", function () {
        setTimeout(function () {
          toggleToolbars();
        }, 50);
      });
    });

    // Deleted selected rows
    deleteSelected.addEventListener("click", function () {
      // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
      Swal.fire({
        text: "Are you sure you want to delete selected packages?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Yes, delete!",
        cancelButtonText: "No, cancel",
        customClass: {
          confirmButton: "btn fw-bold btn-danger",
          cancelButton: "btn fw-bold btn-active-light-primary",
        },
      }).then(function (result) {
        if (result.value) {
          Swal.fire({
            text: "You have deleted all selected packages!.",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn fw-bold btn-primary",
            },
          })
            .then(function () {
              // Remove all selected packages
              checkboxes.forEach((c) => {
                if (c.checked) {
                  datatable
                    .row($(c.closest("tbody tr")))
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
        } else if (result.dismiss === "cancel") {
          Swal.fire({
            text: "Selected packages was not deleted.",
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
      toolbarBase.classList.add("d-none");
      toolbarSelected.classList.remove("d-none");
    } else {
      toolbarBase.classList.remove("d-none");
      toolbarSelected.classList.add("d-none");
    }
  };

  return {
    // Public functions
    init: function () {
      table = document.getElementById("kt_umrah_extranet_package_type_table");

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
  KTUmrahExtranetPackagetypeList.init();
});
