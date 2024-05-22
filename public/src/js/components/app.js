// Class definition
const KTApp = (function () {
    let initialized = false;
    const select2FocusFixInitialized = false;
    let countUpInitialized = false;

    const createBootstrapTooltip = function (el, options) {
        if (el.getAttribute('data-kt-initialized') === '1') {
            return;
        }

        const delay = {};

        // Handle delay options
        if (el.hasAttribute('data-bs-delay-hide')) {
            delay.hide = el.getAttribute('data-bs-delay-hide');
        }

        if (el.hasAttribute('data-bs-delay-show')) {
            delay.show = el.getAttribute('data-bs-delay-show');
        }

        if (delay) {
            options.delay = delay;
        }

        // Check dismiss options
        if (el.hasAttribute('data-bs-dismiss') && el.getAttribute('data-bs-dismiss') == 'click') {
            options.dismiss = 'click';
        }

        // Initialize popover
        const tp = new bootstrap.Tooltip(el, options);

        // Handle dismiss
        if (options.dismiss && options.dismiss === 'click') {
            // Hide popover on element click
            el.addEventListener('click', (e) => {
                tp.hide();
            });
        }

        el.setAttribute('data-kt-initialized', '1');

        return tp;
    };

    const createBootstrapTooltips = function () {
        const tooltipTriggerList = [].slice.call(
            document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );

        const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
            createBootstrapTooltip(tooltipTriggerEl, {});
        });
    };

    const createBootstrapPopover = function (el, options) {
        if (el.getAttribute('data-kt-initialized') === '1') {
            return;
        }

        const delay = {};

        // Handle delay options
        if (el.hasAttribute('data-bs-delay-hide')) {
            delay.hide = el.getAttribute('data-bs-delay-hide');
        }

        if (el.hasAttribute('data-bs-delay-show')) {
            delay.show = el.getAttribute('data-bs-delay-show');
        }

        if (delay) {
            options.delay = delay;
        }

        // Handle dismiss option
        if (el.getAttribute('data-bs-dismiss') == 'true') {
            options.dismiss = true;
        }

        if (options.dismiss === true) {
            options.template =
                '<div class="popover" role="tooltip"><div class="popover-arrow"></div><span class="popover-dismiss btn btn-icon"></span><h3 class="popover-header"></h3><div class="popover-body"></div></div>';
        }

        // Initialize popover
        const popover = new bootstrap.Popover(el, options);

        // Handle dismiss click
        if (options.dismiss === true) {
            const dismissHandler = function (e) {
                popover.hide();
            };

            el.addEventListener('shown.bs.popover', () => {
                const dismissEl = document.getElementById(el.getAttribute('aria-describedby'));
                dismissEl.addEventListener('click', dismissHandler);
            });

            el.addEventListener('hide.bs.popover', () => {
                const dismissEl = document.getElementById(el.getAttribute('aria-describedby'));
                dismissEl.removeEventListener('click', dismissHandler);
            });
        }

        el.setAttribute('data-kt-initialized', '1');

        return popover;
    };

    const createBootstrapPopovers = function () {
        const popoverTriggerList = [].slice.call(
            document.querySelectorAll('[data-bs-toggle="popover"]')
        );

        const popoverList = popoverTriggerList.map((popoverTriggerEl) => {
            createBootstrapPopover(popoverTriggerEl, {});
        });
    };

    const createBootstrapToasts = function () {
        const toastElList = [].slice.call(document.querySelectorAll('.toast'));
        const toastList = toastElList.map((toastEl) => {
            if (toastEl.getAttribute('data-kt-initialized') === '1') {
                return;
            }

            toastEl.setAttribute('data-kt-initialized', '1');

            return new bootstrap.Toast(toastEl, {});
        });
    };

    const createButtons = function () {
        const buttonsGroup = [].slice.call(document.querySelectorAll('[data-kt-buttons="true"]'));

        buttonsGroup.map((group) => {
            if (group.getAttribute('data-kt-initialized') === '1') {
                return;
            }

            const selector = group.hasAttribute('data-kt-buttons-target')
                ? group.getAttribute('data-kt-buttons-target')
                : '.btn';
            const activeButtons = [].slice.call(group.querySelectorAll(selector));

            // Toggle Handler
            KTUtil.on(group, selector, 'click', function (e) {
                activeButtons.map((button) => {
                    button.classList.remove('active');
                });

                this.classList.add('active');
            });

            group.setAttribute('data-kt-initialized', '1');
        });
    };

    const createDateRangePickers = function () {
        // Check if jQuery included
        if (typeof jQuery === 'undefined') {
            return;
        }

        // Check if daterangepicker included
        if (typeof $.fn.daterangepicker === 'undefined') {
            return;
        }

        const elements = [].slice.call(
            document.querySelectorAll('[data-kt-daterangepicker="true"]')
        );
        let start = moment().subtract(29, 'days');
        let end = moment();

        elements.map((element) => {
            if (element.getAttribute('data-kt-initialized') === '1') {
                return;
            }

            const display = element.querySelector('div');
            const attrOpens = element.hasAttribute('data-kt-daterangepicker-opens')
                ? element.getAttribute('data-kt-daterangepicker-opens')
                : 'left';
            const range = element.getAttribute('data-kt-daterangepicker-range');

            const cb = function (start, end) {
                const current = moment();

                if (display) {
                    if (current.isSame(start, 'day') && current.isSame(end, 'day')) {
                        display.innerHTML = start.format('D MMM YYYY');
                    } else {
                        display.innerHTML = `${start.format('D MMM YYYY')} - ${end.format('D MMM YYYY')}`;
                    }
                }
            };

            if (range === 'today') {
                start = moment();
                end = moment();
            }

            $(element).daterangepicker(
                {
                    startDate: start,
                    endDate: end,
                    opens: attrOpens,
                    ranges: {
                        Today: [moment(), moment()],
                        Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [
                            moment().subtract(1, 'month').startOf('month'),
                            moment().subtract(1, 'month').endOf('month'),
                        ],
                    },
                },
                cb
            );

            cb(start, end);

            element.setAttribute('data-kt-initialized', '1');
        });
    };

    const createSelect2 = function () {
        // Check if jQuery included
        if (typeof jQuery === 'undefined') {
            return;
        }

        // Check if select2 included
        if (typeof $.fn.select2 === 'undefined') {
            return;
        }

        const elements = [].slice.call(
            document.querySelectorAll('[data-control="select2"], [data-kt-select2="true"]')
        );

        elements.map((element) => {
            if (element.getAttribute('data-kt-initialized') === '1') {
                return;
            }

            const options = {
                dir: document.body.getAttribute('direction'),
            };

            if (element.getAttribute('data-hide-search') == 'true') {
                options.minimumResultsForSearch = Infinity;
            }

            $(element).select2(options);

            // Handle Select2's KTMenu parent case
            if (element.hasAttribute('data-dropdown-parent') && element.hasAttribute('multiple')) {
                const parentEl = document.querySelector(
                    element.getAttribute('data-dropdown-parent')
                );

                if (parentEl && parentEl.hasAttribute('data-kt-menu')) {
                    let menu = KTMenu.getInstance(parentEl);

                    if (!menu) {
                        menu = new KTMenu(parentEl);
                    }

                    if (menu) {
                        $(element).on('select2:unselect', (e) => {
                            element.setAttribute('data-multiple-unselect', '1');
                        });

                        menu.on('kt.menu.dropdown.hide', (item) => {
                            if (element.getAttribute('data-multiple-unselect') === '1') {
                                element.removeAttribute('data-multiple-unselect');
                                return false;
                            }
                        });
                    }
                }
            }

            element.setAttribute('data-kt-initialized', '1');
        });
    };

    const createAutosize = function () {
        if (typeof autosize === 'undefined') {
            return;
        }

        const inputs = [].slice.call(document.querySelectorAll('[data-kt-autosize="true"]'));

        inputs.map((input) => {
            if (input.getAttribute('data-kt-initialized') === '1') {
                return;
            }

            autosize(input);

            input.setAttribute('data-kt-initialized', '1');
        });
    };

    const createCountUp = function () {
        if (typeof countUp === 'undefined') {
            return;
        }

        const elements = [].slice.call(
            document.querySelectorAll('[data-kt-countup="true"]:not(.counted)')
        );

        elements.map((element) => {
            if (KTUtil.isInViewport(element) && KTUtil.visible(element)) {
                if (element.getAttribute('data-kt-initialized') === '1') {
                    return;
                }

                const options = {};

                let value = element.getAttribute('data-kt-countup-value');
                value = parseFloat(value.replace(/,/g, ''));

                if (element.hasAttribute('data-kt-countup-start-val')) {
                    options.startVal = parseFloat(
                        element.getAttribute('data-kt-countup-start-val')
                    );
                }

                if (element.hasAttribute('data-kt-countup-duration')) {
                    options.duration = parseInt(element.getAttribute('data-kt-countup-duration'));
                }

                if (element.hasAttribute('data-kt-countup-decimal-places')) {
                    options.decimalPlaces = parseInt(
                        element.getAttribute('data-kt-countup-decimal-places')
                    );
                }

                if (element.hasAttribute('data-kt-countup-prefix')) {
                    options.prefix = element.getAttribute('data-kt-countup-prefix');
                }

                if (element.hasAttribute('data-kt-countup-separator')) {
                    options.separator = element.getAttribute('data-kt-countup-separator');
                }

                if (element.hasAttribute('data-kt-countup-suffix')) {
                    options.suffix = element.getAttribute('data-kt-countup-suffix');
                }

                const count = new countUp.CountUp(element, value, options);

                count.start();

                element.classList.add('counted');

                element.setAttribute('data-kt-initialized', '1');
            }
        });
    };

    const createCountUpTabs = function () {
        if (typeof countUp === 'undefined') {
            return;
        }

        if (countUpInitialized === false) {
            // Initial call
            createCountUp();

            // Window scroll event handler
            window.addEventListener('scroll', createCountUp);
        }

        // Tabs shown event handler
        const tabs = [].slice.call(
            document.querySelectorAll('[data-kt-countup-tabs="true"][data-bs-toggle="tab"]')
        );
        tabs.map((tab) => {
            if (tab.getAttribute('data-kt-initialized') === '1') {
                return;
            }

            tab.addEventListener('shown.bs.tab', createCountUp);

            tab.setAttribute('data-kt-initialized', '1');
        });

        countUpInitialized = true;
    };

    const createTinySliders = function () {
        if (typeof tns === 'undefined') {
            return;
        }

        // Sliders
        const elements = Array.prototype.slice.call(
            document.querySelectorAll('[data-tns="true"]'),
            0
        );

        if (!elements && elements.length === 0) {
            return;
        }

        elements.forEach((el) => {
            if (el.getAttribute('data-kt-initialized') === '1') {
                return;
            }

            const obj = initTinySlider(el);
            KTUtil.data(el).set('tns', tns);

            el.setAttribute('data-kt-initialized', '1');
        });
    };

    var initTinySlider = function (el) {
        if (!el) {
            return;
        }

        const tnsOptions = {};

        // Convert string boolean
        const checkBool = function (val) {
            if (val === 'true') {
                return true;
            }
            if (val === 'false') {
                return false;
            }
            return val;
        };

        // get extra options via data attributes
        el.getAttributeNames().forEach((attrName) => {
            // more options; https://github.com/ganlanyuan/tiny-slider#options
            if (/^data-tns-.*/g.test(attrName)) {
                const optionName = attrName
                    .replace('data-tns-', '')
                    .toLowerCase()
                    .replace(/(?:[\s-])\w/g, (match) => match.replace('-', '').toUpperCase());

                if (attrName === 'data-tns-responsive') {
                    // fix string with a valid json
                    const jsonStr = el
                        .getAttribute(attrName)
                        .replace(
                            /(\w+:)|(\w+ :)/g,
                            (matched) => `"${matched.substring(0, matched.length - 1)}":`
                        );
                    try {
                        // convert json string to object
                        tnsOptions[optionName] = JSON.parse(jsonStr);
                    } catch (e) {}
                } else {
                    tnsOptions[optionName] = checkBool(el.getAttribute(attrName));
                }
            }
        });

        const opt = {
            container: el,
            slideBy: 'page',
            autoplay: true,
            center: true,
            autoplayButtonOutput: false,
            ...tnsOptions,
        };

        if (el.closest('.tns')) {
            KTUtil.addClass(el.closest('.tns'), 'tns-initiazlied');
        }

        return tns(opt);
    };

    const initSmoothScroll = function () {
        if (initialized === true) {
            return;
        }

        if (typeof SmoothScroll === 'undefined') {
            return;
        }

        new SmoothScroll('a[data-kt-scroll-toggle][href*="#"]', {
            speed: 1000,
            speedAsDuration: true,
            offset(anchor, toggle) {
                // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
                // This example is a function, but you could do something as simple as `offset: 25`

                // An example returning different values based on whether the clicked link was in the header nav or not
                if (anchor.hasAttribute('data-kt-scroll-offset')) {
                    const val = KTUtil.getResponsiveValue(
                        anchor.getAttribute('data-kt-scroll-offset')
                    );

                    return val;
                }
                return 0;
            },
        });
    };

    const initCard = function () {
        // Toggle Handler
        KTUtil.on(document.body, '[data-kt-card-action="remove"]', 'click', function (e) {
            e.preventDefault();

            const card = this.closest('.card');

            if (!card) {
                return;
            }

            const confirmMessage = this.getAttribute('data-kt-card-confirm-message');
            const confirm = this.getAttribute('data-kt-card-confirm') === 'true';

            if (confirm) {
                // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                Swal.fire({
                    text: confirmMessage || 'Are you sure to remove ?',
                    icon: 'warning',
                    buttonsStyling: false,
                    confirmButtonText: 'Confirm',
                    denyButtonText: 'Cancel',
                    customClass: {
                        confirmButton: 'btn btn-primary',
                        denyButton: 'btn btn-danger',
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        card.remove();
                    }
                });
            } else {
                card.remove();
            }
        });
    };

    const initModal = function () {
        const elements = Array.prototype.slice.call(
            document.querySelectorAll('[data-bs-stacked-modal]')
        );

        if (elements && elements.length > 0) {
            elements.forEach((element) => {
                if (element.getAttribute('data-kt-initialized') === '1') {
                    return;
                }

                element.setAttribute('data-kt-initialized', '1');

                element.addEventListener('click', function (e) {
                    e.preventDefault();

                    const modalEl = document.querySelector(
                        this.getAttribute('data-bs-stacked-modal')
                    );

                    if (modalEl) {
                        const modal = new bootstrap.Modal(modalEl, { backdrop: false });
                        modal.show();
                    }
                });
            });
        }
    };

    const initCheck = function () {
        if (initialized === true) {
            return;
        }

        // Toggle Handler
        KTUtil.on(document.body, '[data-kt-check="true"]', 'change', function (e) {
            const check = this;
            const targets = document.querySelectorAll(check.getAttribute('data-kt-check-target'));

            KTUtil.each(targets, (target) => {
                if (target.type == 'checkbox') {
                    target.checked = check.checked;
                } else {
                    target.classList.toggle('active');
                }
            });
        });
    };

    const initBootstrapCollapse = function () {
        if (initialized === true) {
            return;
        }

        KTUtil.on(document.body, '.collapsible[data-bs-toggle="collapse"]', 'click', function (e) {
            if (this.classList.contains('collapsed')) {
                this.classList.remove('active');
                this.blur();
            } else {
                this.classList.add('active');
            }

            if (this.hasAttribute('data-kt-toggle-text')) {
                const text = this.getAttribute('data-kt-toggle-text');
                var target = this.querySelector('[data-kt-toggle-text-target="true"]');
                var target = target || this;

                this.setAttribute('data-kt-toggle-text', target.innerText);
                target.innerText = text;
            }
        });
    };

    const initBootstrapRotate = function () {
        if (initialized === true) {
            return;
        }

        KTUtil.on(document.body, '[data-kt-rotate="true"]', 'click', function (e) {
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                this.blur();
            } else {
                this.classList.add('active');
            }
        });
    };

    const initLozad = function () {
        // Check if lozad included
        if (typeof lozad === 'undefined') {
            return;
        }

        const observer = lozad(); // lazy loads elements with default selector as '.lozad'
        observer.observe();
    };

    const showPageLoading = function () {
        document.body.classList.add('page-loading');
        document.body.setAttribute('data-kt-app-page-loading', 'on');
    };

    const hidePageLoading = function () {
        // CSS3 Transitions only after page load(.page-loading or .app-page-loading class added to body tag and remove with JS on page load)
        document.body.classList.remove('page-loading');
        document.body.removeAttribute('data-kt-app-page-loading');
    };

    return {
        init() {
            initLozad();

            initSmoothScroll();

            initCard();

            initModal();

            initCheck();

            initBootstrapCollapse();

            initBootstrapRotate();

            createBootstrapTooltips();

            createBootstrapPopovers();

            createBootstrapToasts();

            createDateRangePickers();

            createButtons();

            createSelect2();

            createCountUp();

            createCountUpTabs();

            createAutosize();

            createTinySliders();

            initialized = true;
        },

        initTinySlider(el) {
            initTinySlider(el);
        },

        showPageLoading() {
            showPageLoading();
        },

        hidePageLoading() {
            hidePageLoading();
        },

        createBootstrapPopover(el, options) {
            return createBootstrapPopover(el, options);
        },

        createBootstrapTooltip(el, options) {
            return createBootstrapTooltip(el, options);
        },
    };
})();

// Declare KTApp for Webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTApp;
}
