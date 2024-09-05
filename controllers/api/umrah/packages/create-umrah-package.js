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
            extraThumbnails,
            makkahHotelThumbnail,
            makkahHotelExtraThumbnails,
            madinahHotelThumbnail,
            madinahhHotelExtraThumbnails,
            umrahThumbnail,
        } = req.files;

        console.log(validatedData);

        // create umrah package
        const umrahPackage = new UmrahPackage({
            ...validatedData,
            schedule: validatedData.schedule.toLowerCase(),
            thumbnail: thumbnail.path,
            extraThumbnails: extraThumbnails?.map(
                (extraThumbnail) => extraThumbnail.path
            ),
            makkahHotelThumbnail: makkahHotelThumbnail.path,
            makkahHotelExtraThumbnails: makkahHotelExtraThumbnails?.map(
                (makkahHotelExtraThumbnail) => makkahHotelExtraThumbnail.path
            ),
            madinahHotelThumbnail: madinahHotelThumbnail.path,
            madinahhHotelExtraThumbnails: madinahhHotelExtraThumbnails?.map(
                (madinahhHotelExtraThumbnail) =>
                    madinahhHotelExtraThumbnail.path
            ),
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
