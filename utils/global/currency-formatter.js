/**
 * @file utils/global/currency-formatter.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 16 June, 2024
 * @update_date 16 June, 2024
 */

// export currency formatter function
module.exports = (amount, locale = 'bn-BD') =>
    new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);
