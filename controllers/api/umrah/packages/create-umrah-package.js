/**
 * @file /controllers/api/umrah/packages/create-umrah-package.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 17 May, 2024
 */

// dependencies
const { UmrahPackage } = require('../../../../models');

// export create umrah package controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const validatedData = req.body;
        const {
            thumbnail,
            madinahHotelThumbnail,
            makkahHotelThumbnail,
            umrahThumbnail,
        } = req.files;

        // create umrah package
        const umrahPackage = new UmrahPackage({
            ...validatedData,
            schedule: validatedData.schedule.toLowerCase(),
            thumbnail: thumbnail.path,
            extraThumbnails: validatedData?.extraThumbnails,
            makkahHotelThumbnail: makkahHotelThumbnail.path,
            makkahHotelExtraThumbnails:
                validatedData?.makkahHotelExtraThumbnails,
            madinahHotelThumbnail: madinahHotelThumbnail.path,
            madinahHotelExtraThumbnails:
                validatedData?.madinahHotelExtraThumbnails,
            itineraryDays: validatedData.itineraryDays?.map((itineraryDay) => ({
                ...itineraryDay,
                thumbnail: itineraryDay?.thumbnail?.path,
            })),
            umrahThumbnail: umrahThumbnail.path,
        });

        // save umrah package
        await umrahPackage.save();

        // send response
        return res.status(201).json({
            message: 'Created umrah package package successfully',
            umrahPackage,
        });
    } catch (error) {
        return next(error);
    }
};
