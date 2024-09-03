/**
 * @file /controllers/api/umrah/packages/delete-umrah-package.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 09 May, 2024
 */

// dependencies
const { UmrahPackage } = require('../../../../models');
const fs = require('fs');
const path = require('path');

// helper function to delete a single file
const deleteFile = (filePath) => {
    try {
        fs.unlinkSync(filePath);
    } catch (error) {
        console.error(`Failed to delete file: ${filePath}`, error);
    }
};

// export delete umrah package controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;

        // get umrah package
        const umrahPackage = await UmrahPackage.findById(id);

        // check if umrah package exists
        if (!umrahPackage) {
            return res.status(404).json({
                message: 'Umrah package not found',
            });
        }

        // delete main thumbnail
        if (umrahPackage?.thumbnail) {
            deleteFile(
                path.join(
                    __dirname,
                    '../../../../../public',
                    umrahPackage.thumbnail
                )
            );
        }

        // delete extra thumbnails
        if (umrahPackage?.extraThumbnails?.length) {
            umrahPackage.extraThumbnails.forEach((thumbnail) => {
                deleteFile(
                    path.join(__dirname, '../../../../../public', thumbnail)
                );
            });
        }

        // delete makkah hotel thumbnails
        if (umrahPackage?.makkahHotelThumbnail) {
            deleteFile(
                path.join(
                    __dirname,
                    '../../../../../public',
                    umrahPackage.makkahHotelThumbnail
                )
            );
        }

        if (umrahPackage?.makkahHotelExtraThumbnails?.length) {
            umrahPackage.makkahHotelExtraThumbnails.forEach((thumbnail) => {
                deleteFile(
                    path.join(__dirname, '../../../../../public', thumbnail)
                );
            });
        }

        // delete madinah hotel thumbnails
        if (umrahPackage?.madinahHotelThumbnail) {
            deleteFile(
                path.join(
                    __dirname,
                    '../../../../../public',
                    umrahPackage.madinahHotelThumbnail
                )
            );
        }

        if (umrahPackage?.madinahHotelExtraThumbnails?.length) {
            umrahPackage.madinahHotelExtraThumbnails.forEach((thumbnail) => {
                deleteFile(
                    path.join(__dirname, '../../../../../public', thumbnail)
                );
            });
        }

        // delete itinerary day thumbnails
        if (umrahPackage?.itineraryDays?.length) {
            umrahPackage.itineraryDays.forEach((day) => {
                if (day.thumbnail) {
                    deleteFile(
                        path.join(
                            __dirname,
                            '../../../../../public',
                            day.thumbnail
                        )
                    );
                }
            });
        }

        // delete umrah thumbnail
        if (umrahPackage?.umrahThumbnail) {
            deleteFile(
                path.join(
                    __dirname,
                    '../../../../../public',
                    umrahPackage.umrahThumbnail
                )
            );
        }

        // delete umrah package
        await umrahPackage.deleteOne();

        // send response
        return res.status(200).json({
            message: 'Deleted umrah package successfully',
            umrahPackage,
        });
    } catch (error) {
        return next(error);
    }
};
