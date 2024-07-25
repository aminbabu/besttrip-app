'use strict';

// Class definition
var KTCreatePackage = (function () {
    // Elements
    var stepper;
    var form;
    var formSubmitButton;
    var formContinueButton;

    // Variables
    var stepperObj;
    var validations = [];
    var ktFileUploaderContent;

    // Private Functions
    var initStepper = function () {
        // Initialize Stepper
        stepperObj = new KTStepper(stepper);

        // Stepper change event
        stepperObj.on('kt.stepper.changed', function (stepper) {
            if (stepperObj.getCurrentStepIndex() === 11) {
                formSubmitButton.classList.remove('d-none');
                formSubmitButton.classList.add('d-inline-block');
                formContinueButton.classList.add('d-none');
            } else if (stepperObj.getCurrentStepIndex() === 12) {
                formSubmitButton.classList.add('d-none');
                formContinueButton.classList.add('d-none');
            } else {
                formSubmitButton.classList.remove('d-inline-block');
                formSubmitButton.classList.remove('d-none');
                formContinueButton.classList.remove('d-none');
            }
        });

        // Validation before going to next page
        stepperObj.on('kt.stepper.next', function (stepper) {
            console.log('stepper.next');

            // Validate form before change stepper step
            var validator = validations[stepper.getCurrentStepIndex() - 1]; // get validator for currnt step

            if (validator) {
                validator.validate().then(function (status) {
                    if (status == 'Valid') {
                        stepper.goNext();

                        KTUtil.scrollTop();
                    } else {
                        Swal.fire({
                            text: 'Sorry, looks like there are some errors detected, please try again.',
                            icon: 'error',
                            buttonsStyling: false,
                            confirmButtonText: 'Ok, got it!',
                            customClass: {
                                confirmButton: 'btn btn-light',
                            },
                        }).then(function () {
                            KTUtil.scrollTop();
                        });
                    }
                });
            } else {
                stepper.goNext();

                KTUtil.scrollTop();
            }
        });

        // Prev event
        stepperObj.on('kt.stepper.previous', function (stepper) {
            console.log('stepper.previous');

            stepper.goPrevious();
            KTUtil.scrollTop();
        });
    };

    var handleForm = function () {
        formSubmitButton.addEventListener('click', function (e) {
            // Validate form before change stepper step
            var validator = validations[3]; // get validator for last form

            validator.validate().then(function (status) {
                if (status == 'Valid') {
                    // Show loading indication
                    formSubmitButton.setAttribute('data-kt-indicator', 'on');

                    // Disable button to avoid multiple click
                    formSubmitButton.disabled = true;

                    /* ===================================== */

                    axios
                        .post(
                            formSubmitButton
                                .closest('form')
                                .getAttribute('action'),
                            new FormData(form)
                        )
                        .then((response) => {
                            if (response) {
                                // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                Swal.fire({
                                    text:
                                        response?.data?.message ||
                                        'Form has been successfully submitted!',
                                    icon: 'success',
                                    buttonsStyling: false,
                                    confirmButtonText: 'Ok, got it!',
                                    customClass: {
                                        confirmButton: 'btn btn-primary',
                                    },
                                    allowOutsideClick: false,
                                }).then(() => {
                                    // Reset form
                                    form.reset();

                                    location.reload();
                                });
                            } else {
                                // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                Swal.fire({
                                    text: 'Sorry, looks like there are some errors detected, please try again.',
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
                        })
                        .then(() => {
                            // Hide loading indication
                            formSubmitButton.removeAttribute(
                                'data-kt-indicator'
                            );

                            // Enable button
                            formSubmitButton.disabled = false;
                        });
                } else {
                    // Show popup warning. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                    Swal.fire({
                        text: 'Sorry, looks like there are some errors detected, please try again.',
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

        // Expiry month. For more info, plase visit the official plugin site: https://select2.org/
        $(form.querySelector('[name="card_expiry_month"]')).on(
            'change',
            function () {
                // Revalidate the field when an option is chosen
                validations[3].revalidateField('card_expiry_month');
            }
        );

        // Expiry year. For more info, plase visit the official plugin site: https://select2.org/
        $(form.querySelector('[name="card_expiry_year"]')).on(
            'change',
            function () {
                // Revalidate the field when an option is chosen
                validations[3].revalidateField('card_expiry_year');
            }
        );

        // Expiry year. For more info, plase visit the official plugin site: https://select2.org/
        $(form.querySelector('[name="business_type"]')).on(
            'change',
            function () {
                // Revalidate the field when an option is chosen
                validations[2].revalidateField('business_type');
            }
        );
    };

    var initValidation = function () {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        // Step 1
        validations.push(
            FormValidation.formValidation(form, {
                fields: {
                    thumbnail: {
                        validators: {
                            notEmpty: {
                                message: 'Thumbnail is required',
                            },
                        },
                    },
                    title: {
                        validators: {
                            notEmpty: {
                                message: 'Package title is required',
                            },
                        },
                    },
                    subtitle: {
                        validators: {
                            notEmpty: {
                                message: 'Package subtitle is required',
                            },
                        },
                    },
                    departureLocation: {
                        validators: {
                            notEmpty: {
                                message: 'Departure location is required',
                            },
                        },
                    },
                    schedule: {
                        validators: {
                            notEmpty: {
                                message: 'Schedule start date is required',
                            },
                        },
                    },
                    journeyDate: {
                        validators: {
                            notEmpty: {
                                message: 'Journey date is required',
                            },
                        },
                    },
                    expiryDate: {
                        validators: {
                            notEmpty: {
                                message: 'Expiry Date is required',
                            },
                        },
                    },
                    'basic_package_duration_days_&_nights': {
                        validators: {
                            notEmpty: {
                                message: 'Total days and is required',
                            },
                        },
                    },
                    type: {
                        validators: {
                            notEmpty: {
                                message: 'Package type is required',
                            },
                        },
                    },
                    status: {
                        validators: {
                            notEmpty: {
                                message: 'Package status is required',
                            },
                        },
                    },
                    adultPrice: {
                        validators: {
                            notEmpty: {
                                message: 'Adult package price is required',
                            },
                            integer: {
                                message: 'The value must be a number',
                            },
                            greaterThan: {
                                min: 0,
                                inclusive: false,
                                message:
                                    'Adult package price must be a positive number',
                            },
                        },
                    },
                    childPrice: {
                        validators: {
                            notEmpty: {
                                message: 'Child package price is required',
                            },
                            integer: {
                                message: 'The value must be a number',
                            },
                            greaterThan: {
                                min: 0,
                                inclusive: false,
                                message:
                                    'Child package price must be a positive number',
                            },
                        },
                    },
                    infantPrice: {
                        validators: {
                            notEmpty: {
                                message: 'Infant package price is required',
                            },
                            integer: {
                                message: 'The value must be a number',
                            },
                            greaterThan: {
                                min: 0,
                                inclusive: false,
                                message:
                                    'Infant package price must be a positive number',
                            },
                        },
                    },
                    seats: {
                        validators: {
                            notEmpty: {
                                message: 'Seat available is required',
                            },
                            integer: {
                                message: 'The value must be a number',
                            },
                            greaterThan: {
                                min: 0,
                                inclusive: false,
                                message:
                                    'Seat available must be a positive number',
                            },
                        },
                    },
                    inclusions: {
                        validators: {
                            notEmpty: {
                                message: 'Inclusions is required',
                            },
                        },
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: '',
                    }),
                },
            })
        );

        // Step 2
        validations.push(
            FormValidation.formValidation(form, {
                fields: {
                    outboundAirlineCode: {
                        validators: {
                            notEmpty: {
                                message: 'Airline code is required',
                            },
                        },
                    },
                    outboundFlightNumber: {
                        validators: {
                            notEmpty: {
                                message: 'Flight number is required',
                            },
                        },
                    },
                    outboundBookingClass: {
                        validators: {
                            notEmpty: {
                                message: 'Flight class is required',
                            },
                        },
                    },
                    outboundAirCraftModel: {
                        validators: {
                            notEmpty: {
                                message: 'Airline model is required',
                            },
                        },
                    },
                    outboundDepartureAirport: {
                        validators: {
                            notEmpty: {
                                message: 'Departure from is required',
                            },
                        },
                    },
                    outboundArrivalAirport: {
                        validators: {
                            notEmpty: {
                                message: 'Arrival to is required',
                            },
                        },
                    },
                    outboundDepartureDatetime: {
                        validators: {
                            notEmpty: {
                                message: 'Departure datetime is required',
                            },
                        },
                    },
                    outboundArrivalDatetime: {
                        validators: {
                            notEmpty: {
                                message: 'Arrival datetime is required',
                            },
                        },
                    },
                    outboundFlightStops: {
                        validators: {
                            notEmpty: {
                                message: 'Flight stops is required',
                            },
                        },
                    },
                    outboundAdultBaggageCheckin: {
                        validators: {
                            notEmpty: {
                                message: 'Adult baggage check-in is required',
                            },
                        },
                    },
                    outboundAdultBaggageCabin: {
                        validators: {
                            notEmpty: {
                                message: 'Adult baggage cabin is required',
                            },
                        },
                    },
                    outboundChildBaggageCheckin: {
                        validators: {
                            notEmpty: {
                                message: 'Child baggage check-in is required',
                            },
                        },
                    },
                    outboundChildBaggageCabin: {
                        validators: {
                            notEmpty: {
                                message: 'Child baggage cabin is required',
                            },
                        },
                    },
                    outboundInfantBaggageCheckin: {
                        validators: {
                            notEmpty: {
                                message: 'Infant baggage check-in is required',
                            },
                        },
                    },
                    outboundInfantBaggageCabin: {
                        validators: {
                            notEmpty: {
                                message: 'Infant baggage cabin is required',
                            },
                        },
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: '',
                    }),
                },
            })
        );

        // Step 3
        validations.push(
            FormValidation.formValidation(form, {
                fields: {
                    makkahHotelThumbnail: {
                        validators: {
                            notEmpty: {
                                message: 'Thumbnail is required',
                            },
                        },
                    },
                    makkah_hotel_stay_duration: {
                        validators: {
                            notEmpty: {
                                message: 'Stay duration is required',
                            },
                        },
                    },
                    makkahHotelName: {
                        validators: {
                            notEmpty: {
                                message: 'Hotel name is required',
                            },
                        },
                    },
                    makkahHotelAddress: {
                        validators: {
                            notEmpty: {
                                message: 'Address is required',
                            },
                        },
                    },
                    makkahHotelRating: {
                        validators: {
                            notEmpty: {
                                message: 'Rating is required',
                            },
                        },
                    },
                    makkahHotelDistance: {
                        validators: {
                            notEmpty: {
                                message: 'Distance from Haram is required',
                            },
                        },
                    },
                    makkahHotelDistanceUnit: {
                        validators: {
                            notEmpty: {
                                message: 'Distance unit is required',
                            },
                        },
                    },
                    makkahHotelWalkDuration: {
                        validators: {
                            notEmpty: {
                                message:
                                    'Walking distance from Haram is required',
                            },
                        },
                    },
                    makkahHotelLocation: {
                        validators: {
                            notEmpty: {
                                message: 'Google map link is required',
                            },
                        },
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: '',
                    }),
                },
            })
        );

        // Step 4
        validations.push(
            FormValidation.formValidation(form, {
                fields: {
                    madinahHotelThumbnail: {
                        validators: {
                            notEmpty: {
                                message: 'Thumbnail is required',
                            },
                        },
                    },
                    madinahHotelNoOfNights: {
                        validators: {
                            notEmpty: {
                                message: 'Stay duration is required',
                            },
                        },
                    },
                    madinahHotelName: {
                        validators: {
                            notEmpty: {
                                message: 'Hotel name is required',
                            },
                        },
                    },
                    madinahHotelAddress: {
                        validators: {
                            notEmpty: {
                                message: 'Address is required',
                            },
                        },
                    },
                    madinahHotelRating: {
                        validators: {
                            notEmpty: {
                                message: 'Rating is required',
                            },
                        },
                    },
                    madinahHotelDistance: {
                        validators: {
                            notEmpty: {
                                message:
                                    'Distance from Masjid-e-Nabwi is required',
                            },
                        },
                    },
                    madinahHotelDistanceUnit: {
                        validators: {
                            notEmpty: {
                                message: 'Distance unit is required',
                            },
                        },
                    },
                    madinahHotelWalkDuration: {
                        validators: {
                            notEmpty: {
                                message:
                                    'Walking distance from Masjid-e-Nabwi is required',
                            },
                        },
                    },
                    madinahHotelLocation: {
                        validators: {
                            notEmpty: {
                                message: 'Google map link is required',
                            },
                        },
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: '',
                    }),
                },
            })
        );

        // Step 5
        validations.push(
            FormValidation.formValidation(form, {
                fields: {
                    inboundAirlineCode: {
                        validators: {
                            notEmpty: {
                                message: 'Airline code is required',
                            },
                        },
                    },
                    inboundFlightNumber: {
                        validators: {
                            notEmpty: {
                                message: 'Flight number is required',
                            },
                        },
                    },
                    inboundBookingClass: {
                        validators: {
                            notEmpty: {
                                message: 'Flight class is required',
                            },
                        },
                    },
                    inboundAirCraftModel: {
                        validators: {
                            notEmpty: {
                                message: 'Airline model is required',
                            },
                        },
                    },
                    inboundDepartureAirport: {
                        validators: {
                            notEmpty: {
                                message: 'Departure from is required',
                            },
                        },
                    },
                    inboundArrivalAirport: {
                        validators: {
                            notEmpty: {
                                message: 'Arrival to is required',
                            },
                        },
                    },
                    inboundDepartureDatetime: {
                        validators: {
                            notEmpty: {
                                message: 'Departure datetime is required',
                            },
                        },
                    },
                    inboundArrivalDatetime: {
                        validators: {
                            notEmpty: {
                                message: 'Arrival datetime is required',
                            },
                        },
                    },
                    inboundFlightStops: {
                        validators: {
                            notEmpty: {
                                message: 'Flight stops is required',
                            },
                        },
                    },
                    inboundAdultBaggageCheckin: {
                        validators: {
                            notEmpty: {
                                message: 'Adult baggage check-in is required',
                            },
                        },
                    },
                    inboundAdultBaggageCabin: {
                        validators: {
                            notEmpty: {
                                message: 'Adult baggage cabin is required',
                            },
                        },
                    },
                    inboundChildBaggageCheckin: {
                        validators: {
                            notEmpty: {
                                message: 'Child baggage check-in is required',
                            },
                        },
                    },
                    inboundChildBaggageCabin: {
                        validators: {
                            notEmpty: {
                                message: 'Child baggage cabin is required',
                            },
                        },
                    },
                    inboundInfantBaggageCheckin: {
                        validators: {
                            notEmpty: {
                                message: 'Infant baggage check-in is required',
                            },
                        },
                    },
                    inboundInfantBaggageCabin: {
                        validators: {
                            notEmpty: {
                                message: 'Infant baggage cabin is required',
                            },
                        },
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: '',
                    }),
                },
            })
        );

        // Step 6
        validations.push(
            FormValidation.formValidation(form, {
                fields: {
                    visaType: {
                        validators: {
                            notEmpty: {
                                message: 'Visa type is required',
                            },
                        },
                    },
                    visaNoOfEntries: {
                        validators: {
                            notEmpty: {
                                message: 'Visa entries is required',
                            },
                        },
                    },
                    visaDuration: {
                        validators: {
                            notEmpty: {
                                message: 'Visa duration is required',
                            },
                            positive: {
                                message:
                                    'Visa validity must be a positive number',
                            },
                            greaterThan: {
                                min: 0,
                                inclusive: false,
                                message:
                                    'Visa validity must be a positive number',
                            },
                        },
                    },
                    visaValidity: {
                        validators: {
                            notEmpty: {
                                message: 'Visa validity is required',
                            },
                            positive: {
                                message:
                                    'Visa validity must be a positive number',
                            },
                            greaterThan: {
                                min: 0,
                                inclusive: false,
                                message:
                                    'Visa validity must be a positive number',
                            },
                        },
                    },
                    visaOptions: {
                        validators: {
                            notEmpty: {
                                message: 'Value is required',
                            },
                        },
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: '',
                    }),
                },
            })
        );

        // Step 7
        validations.push(
            FormValidation.formValidation(form, {
                fields: {
                    transportType: {
                        validators: {
                            notEmpty: {
                                message: 'Transport type is required',
                            },
                        },
                    },
                    transportAirportToHotel: {
                        validators: {
                            notEmpty: {
                                message: 'Airport to hotel is required',
                            },
                        },
                    },
                    transportVisitorPlaces: {
                        validators: {
                            notEmpty: {
                                message: 'Visitor place is required',
                            },
                        },
                    },
                    transportHotelToAirport: {
                        validators: {
                            notEmpty: {
                                message: 'Hotel to airport is required',
                            },
                        },
                    },
                    transportServices: {
                        validators: {
                            notEmpty: {
                                message: 'Value is required',
                            },
                        },
                    },
                    transportServiceTypes: {
                        validators: {
                            notEmpty: {
                                message: 'Bus service type is required',
                            },
                        },
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: '',
                    }),
                },
            })
        );

        // Step 8
        validations.push(
            FormValidation.formValidation(form, {
                fields: {
                    ziyarahDays: {
                        validators: {
                            notEmpty: {
                                message: 'The value is required',
                            },
                        },
                    },
                    ziyarahMakkah: {
                        validators: {
                            notEmpty: {
                                message: 'The value is required',
                            },
                        },
                    },
                    ziyarahMadinah: {
                        validators: {
                            notEmpty: {
                                message: 'The value is required',
                            },
                        },
                    },
                    ziyarahTaif: {
                        validators: {
                            notEmpty: {
                                message: 'The value is required',
                            },
                        },
                    },
                    ziyarahMakkaDetails: {
                        validators: {
                            notEmpty: {
                                message: 'Makkah ziyara details is required',
                            },
                        },
                    },
                    ziyarahMadinaDetails: {
                        validators: {
                            notEmpty: {
                                message: 'Madinah ziyara details is required',
                            },
                        },
                    },
                    ziyarahTaifDetails: {
                        validators: {
                            notEmpty: {
                                message: 'Taif ziyara details is required',
                            },
                        },
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: '',
                    }),
                },
            })
        );

        // Step 9
        validations.push(
            FormValidation.formValidation(form, {
                fields: {},
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: '',
                    }),
                },
            })
        );

        // Step 10
        validations.push(
            FormValidation.formValidation(form, {
                fields: {
                    umrahThumbnail: {
                        validators: {
                            notEmpty: {
                                message: 'Thumbnail is required',
                            },
                        },
                    },
                    umrahTitle: {
                        validators: {
                            notEmpty: {
                                message: 'Title is required',
                            },
                        },
                    },
                    about_umrah_short_description: {
                        validators: {
                            notEmpty: {
                                message: 'Short description is required',
                            },
                        },
                    },
                    about_umrah_description: {
                        validators: {
                            notEmpty: {
                                message: 'Description is required',
                            },
                        },
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: '',
                    }),
                },
            })
        );

        // Step 11
        validations.push(
            FormValidation.formValidation(form, {
                fields: {
                    termsConditions: {
                        validators: {
                            notEmpty: {
                                message: 'Description is required',
                            },
                        },
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap Framework Integration
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: '',
                    }),
                },
            })
        );
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

    // Add more thumbnails
    const addMoreThumbnails = () => {
        const dropZoneBasicThumbnails = new Dropzone(
            '#kt_dropzonejs_basic_thumbnails',
            {
                url: 'https://keenthemes.com/scripts/void.php', // Set the url for your upload script location
                paramName: 'file', // The name that will be used to transfer the file
                maxFiles: 10,
                maxFilesize: 10, // MB
                addRemoveLinks: true,
                accept: function (file, done) {
                    if (file.name == 'wow.jpg') {
                        done("Naha, you don't.");
                    } else {
                        done();
                    }
                },
            }
        );
        const dropZoneMakkahThumbnails = new Dropzone(
            '#kt_dropzonejs_makkah_hotel_thumbnails',
            {
                url: 'https://keenthemes.com/scripts/void.php', // Set the url for your upload script location
                paramName: 'file', // The name that will be used to transfer the file
                maxFiles: 10,
                maxFilesize: 10, // MB
                addRemoveLinks: true,
                accept: function (file, done) {
                    if (file.name == 'wow.jpg') {
                        done("Naha, you don't.");
                    } else {
                        done();
                    }
                },
            }
        );
        const dropZoneMadinahThumbnails = new Dropzone(
            '#kt_dropzonejs_madinah_hotel_thumbnails',
            {
                url: 'https://keenthemes.com/scripts/void.php', // Set the url for your upload script location
                paramName: 'file', // The name that will be used to transfer the file
                maxFiles: 10,
                maxFilesize: 10, // MB
                addRemoveLinks: true,
                accept: function (file, done) {
                    if (file.name == 'wow.jpg') {
                        done("Naha, you don't.");
                    } else {
                        done();
                    }
                },
            }
        );
    };

    // Init flatpickr
    var initFlatPickr = function () {
        const datepicker = form.querySelectorAll(
            '[data-flatpickr=package_date_picker]'
        );
        const datetimepicker = form.querySelectorAll(
            '[data-flatpickr=package_datetime_picker]'
        );
        const timepicker = form.querySelectorAll(
            '[data-flatpickr=package_time_picker]'
        );

        // Handle datepicker -- For more info on flatpickr plugin, please visit: https://flatpickr.js.org/
        $(datepicker).flatpickr({
            altInput: true,
            altFormat: 'j F, Y',
            minDate: 'today',
            maxDate: new Date().fp_incr(365), // 365 days from now
        });

        // Handle datetimepicker -- For more info on flatpickr plugin, please visit: https://flatpickr.js.org/
        $(datetimepicker).flatpickr({
            enableTime: true,
            altInput: true,
            time_24hr: true,
            minuteIncrement: 1,
            altFormat: 'j F, Y H:i',
            minDate: 'today',
            maxDate: new Date().fp_incr(365), // 365 days from now
        });

        // Handle timepicker -- For more info on flatpickr plugin, please visit: https://flatpickr.js.org/
        $(timepicker).flatpickr({
            enableTime: true,
            noCalendar: true,
            dateFormat: 'H:i',
            time_24hr: true,
            minuteIncrement: 1,
        });
    };

    // Flight stops handler
    const handleFlightStops = () => {
        const select = $('[data-kt-umrah-extranet-flight-stops-select="true"]');
        let stepper;
        let firstTimepicker;
        let secondTimepicker;
        let firstAirportInput;
        let secondAirportInput;

        $(select).on('change', function (e) {
            const value = e.target.value;
            stepper = $(this).closest('[data-kt-stepper-element="content"]');
            firstTimepicker = $(stepper).find('[data-flatpickr-time="1st"]');
            secondTimepicker = $(stepper).find('[data-flatpickr-time="2nd"]');
            firstAirportInput = $(stepper).find('[data-layover-airport="1st"]');
            secondAirportInput = $(stepper).find(
                '[data-layover-airport="2nd"]'
            );

            switch (value) {
                case 'one-stop': {
                    showFirstTimePicker();
                    showFirstAirportInput();
                    hideSecondTimePicker();
                    hideSecondAirportInput();
                    break;
                }
                case 'two-stop': {
                    showFirstTimePicker();
                    showFirstAirportInput();
                    showSecondTimePicker();
                    showSecondAirportInput();
                    break;
                }
                case 'non-stop': {
                    hideFirstTimePicker();
                    hideFirstAirportInput();
                    hideSecondTimePicker();
                    hideSecondAirportInput();
                    break;
                }
                default:
                    break;
            }
        });

        // Handle timepicker
        const showFirstTimePicker = () => {
            $(firstTimepicker).parent().parent().removeClass('d-none');
        };

        const hideFirstTimePicker = () => {
            $(firstTimepicker).parent().parent().addClass('d-none');
        };

        const showSecondTimePicker = () => {
            $(secondTimepicker).parent().parent().removeClass('d-none');
        };

        const hideSecondTimePicker = () => {
            $(secondTimepicker).parent().parent().addClass('d-none');
        };

        // Handle airport inputs
        const showFirstAirportInput = () => {
            $(firstAirportInput).parent().parent().removeClass('d-none');
        };

        const hideFirstAirportInput = () => {
            $(firstAirportInput).parent().parent().addClass('d-none');
        };

        const showSecondAirportInput = () => {
            $(secondAirportInput).parent().parent().removeClass('d-none');
        };

        const hideSecondAirportInput = () => {
            $(secondAirportInput).parent().parent().addClass('d-none');
        };
    };

    // Repeater handler
    const handleRepeater = () => {
        $(
            '#kt_repeater_visa_required, #kt_repeater_transport_service, #kt_repeater_day_wise_itinearies, #kt_repeater_ziyara_makkah_details, #kt_repeater_ziyara_madinah_details, #kt_repeater_ziyara_taif_details'
        ).repeater({
            initEmpty: false,

            show: function () {
                $(this).slideDown();
            },

            hide: function (deleteElement) {
                $(this).slideUp(deleteElement);
            },

            isFirstItemUndeletable: true,
        });
    };

    // CKEditors
    const initCKEditors = () => {
        const textareas = [
            'kt_docs_ckeditor_about_us_description',
            'kt_docs_ckeditor_terms_&_conditions_description',
        ];

        textareas.forEach((id) => {
            ClassicEditor.create(document.getElementById(id))
                .then((editor) => {
                    console.log(editor);
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    };

    // Day wise itinearies
    const handleDayWiseItinearies = () => {
        const addDayWiseItineary = (days) => {
            let html = '';

            for (let i = 0; i < days; i++) {
                html += `
        <div class="row border-bottom">
        <div class="col-lg-12">
          <h3 class="fs-4 mb-4 pb-4 border-bottom">
            Day ${i + 1 > 9 ? i + 1 : '0' + (i + 1)}
          </h3>
        </div>
        <div class="col-lg-12">
          <!--begin::Input group-->
          <div class="fv-row mb-10">
            <!--begin::Label-->
            <label class="form-label">Thumbnail</label>
            <!--end::Label-->
            <!--begin::Input group-->
            <div class="fv-row">
              <!--begin::Preview Container-->
              <div class="kt-file-uploader">
                <!--begin::Message-->
                <label
                  class="kt-file-uploader-label d-flex flex-column flex-xl-row align-items-center align-items-xl-start text-center text-xl-start"
                  for="day_wise_itineary_thumbnail_${i + 1}"
                >
                  <i
                    class="ki-duotone ki-file-up fs-3x text-primary"
                    ><span class="path1"></span
                    ><span class="path2"></span>
                  </i>
                  <!--begin::Info-->
                  <div class="ms-xl-4 mt-4 mt-xl-0">
                    <h3
                      class="fs-5 fw-bold text-gray-900 mb-1"
                    >
                      Upload thumbnail
                    </h3>
                    <span
                      class="fs-7 fw-semibold text-gray-500"
                    >
                      PNG, JPG, JPEG up to 10MB
                    </span>
                  </div>
                  <!--end::Info-->
                </label>
                <!--end::Message-->
                <!--begin::Input-->
                <input
                  type="file"
                  name="day_wise_itineary_thumbnail_1"
                  id="day_wise_itineary_thumbnail_${i + 1}"
                  accept=".png, .jpg, .jpeg"
                  data-kt-file-uploader-max-size="10"
                  hidden
                  class="d-none"
                />
                <!--end::Input-->
                <!--begin::Error Message -->
                <div
                  class="invalid-feedback d-block"
                ></div>
                <!--end::Error Message-->
              </div>
              <!--end::Preview Container-->
            </div>
            <!--end::Input group-->
          </div>
          <!--end::Input group-->
        </div>
        <div class="col-lg-12">
          <!--begin::Input group-->
          <div class="fv-row mb-10">
            <!--begin::Label-->
            <label class="form-label">Title</label>
            <!--end::Label-->
            <!--begin::Input-->
            <input
              type="text"
              class="form-control form-control-solid"
              name="day_wise_itineary_title_${i + 1}"
              placeholder=""
              value=""
            />
            <!--end::Input-->
          </div>
          <!--end::Input group-->
        </div>
        <div class="col-lg-12">
          <!--begin::Input group-->
          <div class="fv-row mb-10">
            <!--begin::Label-->
            <label class="form-label"
              >Description</label
            >
            <!--end::Label-->
            <!--begin::Input-->
            <textarea
              class="form-control form-control-solid"
              name="day_wise_itineary_description_${i + 1}"
              rows="3"
              placeholder=""
            ></textarea>
            <!--end::Input-->
          </div>
          <!--end::Input group-->
        </div>
      </div>`;
            }

            $('#day_wise_itinearies_row').html(html);
        };

        $('[name="basic_package_duration_days_&_nights"]').on(
            'select2:select',
            function (e) {
                var data = e.params.data;
                addDayWiseItineary(data.id);
            }
        );
    };

    // Select2 initialization
    const initSelect2 = async () => {
        console.log();
        // read json data and create select2
        $.getJSON('../../../../../json/umrah/airlines.json', function (data) {
            const airlines = data.map((item) => {
                return {
                    id: item.code,
                    text: `${item.code} - ${item.name}`,
                };
            });

            // Create select2
            $('[data-control="select2-country"]').select2({
                placeholder: 'Select an option',
                data: airlines,
            });
        });
    };

    return {
        // Public Functions
        init: function () {
            stepper = document.querySelector(
                '#kt_umrah_extranet_package_add_stepper'
            );

            if (!stepper) {
                return;
            }

            form = stepper.querySelector('#kt_umrah_extranet_package_add_form');
            formSubmitButton = stepper.querySelector(
                '[data-kt-stepper-action="submit"]'
            );
            formContinueButton = stepper.querySelector(
                '[data-kt-stepper-action="next"]'
            );

            initStepper();
            initValidation();
            handleForm();
            initFileUploader();
            addMoreThumbnails();
            initFlatPickr();
            handleFlightStops();
            handleRepeater();
            initCKEditors();
            handleDayWiseItinearies();
            initSelect2();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTCreatePackage.init();
});
