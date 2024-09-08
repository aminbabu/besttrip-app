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
            madinahHotelThumbnail,
            makkahHotelThumbnail,
            umrahThumbnail,
        } = req.files;

        // get umrah package
        const umrahPackage = await UmrahPackage.findById(id);

        // check if umrah package exists
        if (!umrahPackage) {
            return res.status(404).json({
                message: 'Umrah package not found',
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

        // Handle itinerary days: merge existing and incoming
        const existingItineraryDays = umrahPackage.itineraryDays || [];
        const incomingItineraryDays = validatedData.itineraryDays || [];

        // Create a map to update by index
        const updatedItineraryDays = [];

        incomingItineraryDays.forEach((incomingDay, index) => {
            if (existingItineraryDays[index]) {
                // Update existing day
                updatedItineraryDays[index] = {
                    ...existingItineraryDays[index],
                    ...incomingDay,
                    thumbnail: incomingDay?.thumbnail
                        ? incomingDay.thumbnail.path
                        : existingItineraryDays[index].thumbnail,
                };
            } else {
                // Insert new day
                updatedItineraryDays[index] = {
                    ...incomingDay,
                    thumbnail: incomingDay?.thumbnail
                        ? incomingDay.thumbnail.path
                        : '',
                };
            }
        });

        // Set the updated itinerary days and other fields
        umrahPackage.set({
            ...validatedData,
            schedule: validatedData.schedule.toLowerCase(),
            thumbnail: thumbnail ? thumbnail.path : umrahPackage.thumbnail,
            extraThumbnails: validatedData?.extraThumbnails
                ? [
                      ...validatedData?.extraThumbnails,
                      ...umrahPackage.extraThumbnails,
                  ]
                : umrahPackage.extraThumbnails,
            makkahHotelThumbnail: makkahHotelThumbnail
                ? makkahHotelThumbnail.path
                : umrahPackage.makkahHotelThumbnail,
            makkahHotelExtraThumbnails:
                validatedData?.makkahHotelExtraThumbnails
                    ? [
                          ...validatedData?.makkahHotelExtraThumbnails,
                          ...umrahPackage.makkahHotelExtraThumbnails,
                      ]
                    : umrahPackage.makkahHotelExtraThumbnails,
            madinahHotelThumbnail: madinahHotelThumbnail
                ? madinahHotelThumbnail.path
                : umrahPackage.madinahHotelThumbnail,
            madinahHotelExtraThumbnails:
                validatedData?.madinahHotelExtraThumbnails
                    ? [
                          ...validatedData?.madinahHotelExtraThumbnails,
                          ...umrahPackage.madinahHotelExtraThumbnails,
                      ]
                    : umrahPackage.madinahHotelExtraThumbnails,
            itineraryDays: updatedItineraryDays,
            umrahThumbnail: umrahThumbnail
                ? umrahThumbnail.path
                : umrahPackage.umrahThumbnail,
        });

        // save umrah package
        await umrahPackage.save();

        // send response
        return res.status(200).json({
            message: 'Updated umrah package successfully',
            umrahPackage,
        });
    } catch (error) {
        return next(error);
    }
};
