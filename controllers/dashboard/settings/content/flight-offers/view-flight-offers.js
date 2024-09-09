/**
 * @file controllers/dashboard/settings/content/flight-offers/view-flight-offers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { FlightOffer } = require('../../../../../models');

// export flight offers view controller
module.exports = async (req, res) => {
    try {
        // get flight offers
        const flightOffers = await FlightOffer.find();

        // render flight offers view
        return res.render('dashboard/settings/content/flight-offers', {
            title: 'Flight Offers',
            flightOffers,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
