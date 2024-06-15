/**
 * @file controllers/dashboard/settings/content/hotel-offers/view-hotel-offers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 15 June, 2024
 */

// dependencies
const { HotelOffer } = require('../../../../../models');

// export hotel offers view controller
module.exports = async (req, res) => {
    try {
        // get hotel offers
        const hotelOffers = await HotelOffer.find();

        // render hotel offers view
        return res.render('dashboard/settings/content/hotel-offers', {
            title: 'Hotel Offers',
            user: req.user,
            hotelOffers,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
