/**
 * @file /controllers/api/umrah/packages/duplicate-package.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 09 May, 2024
 */

// dependencies
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { UmrahPackage } = require('../../../../models');

const duplicateFile = async (filePath, dir = '/umrah/package') => {
    if (!filePath) return null;

    const fileName = path.basename(filePath);
    const newFileName = `${uuidv4()}_${fileName}`;
    const newFilePath = path.join('/uploads/', `${dir}/${newFileName}`);
    const sourceFullPath = path.join(__dirname, '../../../../public', filePath);
    const destFullPath = path.join(
        __dirname,
        '../../../../public',
        newFilePath
    );

    try {
        await fs.copyFile(sourceFullPath, destFullPath);
        return newFilePath;
    } catch (error) {
        console.error(`Failed to duplicate file ${filePath}:`, error);
        return null; // Or handle the error as needed
    }
};

const duplicateMedia = async (media) => {
    const duplicatedMedia = {};

    for (const [key, value] of Object.entries(media)) {
        if (Array.isArray(value) && value.length > 0) {
            duplicatedMedia[key] = await Promise.all(
                value.map(async (item) => {
                    if (typeof item === 'string') {
                        return await duplicateFile(item);
                    } else if (
                        item &&
                        typeof item === 'object' &&
                        item.thumbnail
                    ) {
                        const newPath = await duplicateFile(item.thumbnail);
                        return {
                            ...item,
                            thumbnail: newPath,
                        };
                    }
                    return item;
                })
            );
        } else if (typeof value === 'string') {
            duplicatedMedia[key] = await duplicateFile(value);
        } else if (value && typeof value === 'object' && value.thumbnail) {
            duplicatedMedia[key] = {
                ...value,
                thumbnail: await duplicateFile(value.thumbnail),
            };
        } else {
            duplicatedMedia[key] = value;
        }
    }

    return duplicatedMedia;
};

// export delete umrah package controller
module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;
        const umrahPackage = await UmrahPackage.findById(id).select('-_id');

        if (!umrahPackage) {
            return res.status(404).json({ message: 'Umrah package not found' });
        }

        const mediaToUpdate = {
            thumbnail: umrahPackage.thumbnail,
            extraThumbnails: umrahPackage.extraThumbnails,
            makkahHotelThumbnail: umrahPackage.makkahHotelThumbnail,
            makkahHotelExtraThumbnails: umrahPackage.makkahHotelExtraThumbnails,
            madinahHotelThumbnail: umrahPackage.madinahHotelThumbnail,
            madinahHotelExtraThumbnails:
                umrahPackage.madinahHotelExtraThumbnails,
            umrahThumbnail: umrahPackage.umrahThumbnail,
            itineraryDays: umrahPackage.itineraryDays,
        };

        const updatedMedia = await duplicateMedia(mediaToUpdate);

        const duplicatedPackage = new UmrahPackage({
            ...umrahPackage.toObject(),
            ...updatedMedia,
            title: `${umrahPackage.title} (Copy)`,
            subtitle: `${umrahPackage.subtitle} (Copy)`,
        });

        await duplicatedPackage.save();

        res.status(201).json({
            message: 'Umrah package duplicated successfully',
            duplicatedPackage,
        });
    } catch (error) {
        next(error);
    }
};
