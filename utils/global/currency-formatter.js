/**
 * @file utils/global/currency-formatter.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 16 June, 2024
 * @update_date 16 June, 2024
 */

// dependencies
const currency = require('currency.js');

// export currency formatter function
module.exports = (price) =>
    currency(price, {
        precision: 2, // Set the number of decimal places
        formatWith: {
            symbol: ' BDT', // Add a space before "BDT" for better readability
            thousand: ',',
            decimal: '.',
            prefix: '',
            suffix: '',
            format: '{symbol}{prefix}{number}{fractional}', // Customize the format string
        },
    }).format(); // Outputs: 1,234.56 BDT
