/**
 * @file /controllers/api/settings/content/hotel-offers/delete-many-hotel-offers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 Jul, 2024
 * @update_date 17 Jul, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { FlightOffer } = require('../../../../../models');

// export delete many hotel offers controller
module.exports = async (req, res, next) => {
    try {
        const { ids } = req.body;

        // find hotel offers to delete
        const flightOffersToDelete = await FlightOffer.find({
            _id: { $in: ids },
        });

        // check if any hotel offers not found
        if (flightOffersToDelete.length === 0) {
            return res.status(404).send({
                message: 'No hotel offers found with the provided IDs',
            });
        }

        // delete hotel offers
        await FlightOffer.deleteMany({ _id: { $in: ids } });

        // delete hotel offer thumbnails
        flightOffersToDelete.forEach((flightOffer) => {
            if (flightOffer.thumbnail) {
                fs.unlinkSync(
                    path.join(
                        __dirname,
                        './../../../../../public',
                        flightOffer.thumbnail
                    )
                );
            }
        });

        // send response
        return res.status(200).send({
            message: 'Deleted hotel offers successfully',
            deletedFlightOffers: flightOffersToDelete,
        });
    } catch (error) {
        return next(error);
    }
};
