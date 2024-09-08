/**
 * @file /controllers/api/umrah/packages/update-umrah-package.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 17 May, 2024
 */

// dependencies
const { UmrahPackage } = require('../../../../models');

// export update umrah package controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
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

        // get umrah package
        const umrahPackage = await UmrahPackage.findById(id);

        // check if umrah package exists
        if (!umrahPackage) {
            return res.status(404).json({
                message: 'Umrah package package not found',
            });
        }

        // Remove outbound flight layover details if outboundFlightStops is '0'
        if (validatedData.outboundFlightStops === '0') {
            delete validatedData.outboundLayoverFirstDuration;
            delete validatedData.outboundLayoverFirstAirport;
            delete validatedData.outboundLayoverSecondDuration;
            delete validatedData.outboundLayoverSecondAirport;
        } else if (validatedData.outboundFlightStops === '1') {
            delete validatedData.outboundLayoverSecondDuration;
            delete validatedData.outboundLayoverSecondAirport;
        }

        // Remove inbound flight layover details if inboundFlightStops is '0'
        if (validatedData.inboundFlightStops === '0') {
            delete validatedData.inboundLayoverFirstDuration;
            delete validatedData.inboundLayoverFirstAirport;
            delete validatedData.inboundLayoverSecondDuration;
            delete validatedData.inboundLayoverSecondAirport;
        } else if (validatedData.inboundFlightStops === '1') {
            delete validatedData.inboundLayoverSecondDuration;
            delete validatedData.inboundLayoverSecondAirport;
        }

        console.log(
            'Items to remove from Itinearys: ',
            Number(validatedData.itemsToRemoveFromItineary)
        );

        console.log('Items from Itinearys:', validatedData.itineraryDays);
        return;

        umrahPackage.set({
            ...validatedData,
            schedule: validatedData.schedule.toLowerCase(),
            thumbnail: thumbnail ? thumbnail.path : umrahPackage.thumbnail,
            extraThumbnails: extraThumbnails?.map(
                (extraThumbnail) => extraThumbnail.path
            ),
            makkahHotelThumbnail: makkahHotelThumbnail
                ? makkahHotelThumbnail.path
                : umrahPackage.makkahHotelThumbnail,
            makkahHotelExtraThumbnails: makkahHotelExtraThumbnails?.map(
                (makkahHotelExtraThumbnail) => makkahHotelExtraThumbnail.path
            ),
            madinahHotelThumbnail: madinahHotelThumbnail
                ? madinahHotelThumbnail.path
                : umrahPackage.madinahHotelThumbnail,
            madinahhHotelExtraThumbnails: madinahhHotelExtraThumbnails?.map(
                (madinahhHotelExtraThumbnail) =>
                    madinahhHotelExtraThumbnail.path
            ),
            itineraryDays: validatedData.itineraryDays?.map((itineraryDay) => ({
                ...itineraryDay,
                thumbnail: itineraryDay?.thumbnail?.path,
            })),
            umrahThumbnail: umrahThumbnail
                ? umrahThumbnail.path
                : umrahPackage.umrahThumbnail,
        });

        // save umrah package
        await umrahPackage.save();

        // send response
        return res.status(200).json({
            message: 'Updated umrah package package successfully',
            umrahPackage,
        });
    } catch (error) {
        return next(error);
    }
};
