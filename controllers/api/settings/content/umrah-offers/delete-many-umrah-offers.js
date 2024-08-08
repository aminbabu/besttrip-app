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
const { UmrahOffer } = require('../../../../../models');

// export delete many hotel offers controller
module.exports = async (req, res, next) => {
    try {
        const { ids } = req.body;

        // find hotel offers to delete
        const umrahOffersToDelete = await UmrahOffer.find({
            _id: { $in: ids },
        });

        // check if any hotel offers not found
        if (umrahOffersToDelete.length === 0) {
            return res.status(404).send({
                message: 'No hotel offers found with the provided IDs',
            });
        }

        // delete hotel offers
        await HotelOffer.deleteMany({ _id: { $in: ids } });

        // delete hotel offer thumbnails
        umrahOffersToDelete.forEach((hotelOffer) => {
            if (hotelOffer.thumbnail) {
                fs.unlinkSync(
                    path.join(
                        __dirname,
                        './../../../../../public',
                        hotelOffer.thumbnail
                    )
                );
            }
        });

        // send response
        return res.status(200).send({
            message: 'Deleted hotel offers successfully',
            deletedHotelOffers: umrahOffersToDelete,
        });
    } catch (error) {
        return next(error);
    }
};
