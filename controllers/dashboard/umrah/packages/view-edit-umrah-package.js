/**
 * @file controllers/dashboard/umrah/packages/view-edit-umrah-package.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 22 June, 2024
 */

// dependencies
const mongoose = require('mongoose');
const {
    UmrahPackage,
    UmrahPackageDuration,
    UmrahPackageType,
} = require('../../../../models');

// export umrah package edit view controller
module.exports = async (req, res) => {
    try {
        // get id from request params
        const { id } = req.params;

        // get umrah package with aggregation
        const umrahPackage = await UmrahPackage.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: 'umrahpackagetypes',
                    localField: 'type',
                    foreignField: '_id',
                    as: 'typeDetails',
                },
            },
            {
                $unwind: '$typeDetails',
            },
            {
                $lookup: {
                    from: 'umrahpackagedurations',
                    localField: 'totalDaysAndNights',
                    foreignField: '_id',
                    as: 'durationDetails',
                },
            },
            {
                $unwind: {
                    path: '$durationDetails',
                    preserveNullAndEmptyArrays: true,
                },
            },
        ]).exec();

        const umrahPackageDurations = await UmrahPackageDuration.find({
            status: 'active',
        });

        const umrahPackageTypes = await UmrahPackageType.find({
            status: 'active',
        });

        // check if umrah package not found
        if (!umrahPackage.length) {
            return res.redirect('/errors/404');
        }

        console.log(umrahPackage[0]);

        const airlines = [
            {
                code: '3L',
                name: 'Intersky',
            },
            {
                code: '6E',
                name: 'IndiGo',
            },
            {
                code: 'AI',
                name: 'Air India',
            },
            {
                code: 'BG',
                name: 'Biman Bangladesh Airlines',
            },
            {
                code: 'EK',
                name: 'Emirates Airlines',
            },
            {
                code: 'EY',
                name: 'Etihad Airways',
            },
            {
                code: 'FZ',
                name: 'Fly Dubai',
            },
            {
                code: 'G9',
                name: 'Air Arabia',
            },
            {
                code: 'GF',
                name: 'Gulf Air',
            },
            {
                code: 'HR',
                name: 'Hahn Air Businessline',
            },
            {
                code: 'J9',
                name: 'Jazeera Airways',
            },
            {
                code: 'KU',
                name: 'Kuwait Airways',
            },
            {
                code: 'MH',
                name: 'Malaysia Airline',
            },
            {
                code: 'OD',
                name: 'Malindo Air',
            },
            {
                code: 'QR',
                name: 'Qatar Airways',
            },
            {
                code: 'SQ',
                name: 'Singapore Airlines',
            },
            {
                code: 'SV',
                name: 'Saudi Arabian Airlines',
            },
            {
                code: 'TG',
                name: 'Thai Airways',
            },
            {
                code: 'TK',
                name: 'Turkish Airlines',
            },
            {
                code: 'UK',
                name: 'Vistara Airways',
            },
            {
                code: 'WY',
                name: 'Oman Air',
            },
            {
                code: 'XY',
                name: 'Flynas Airline',
            },
            {
                code: 'MS',
                name: 'Egyptair',
            },
            {
                code: 'OV',
                name: 'Salam Air',
            },
        ];

        const airPorts = [
            {
                code: 'DAC',
                name: 'Hazrat Shahjalal Intl Arpt',
                citycode: 'DAC',
                city: 'Dhaka',
                country: 'Bangladesh',
                countrycode: 'BD',
            },
            {
                code: 'CGP',
                name: 'Shah Amanat International Airport',
                citycode: 'CGP',
                city: 'Chittagong',
                country: 'Bangladesh',
                countrycode: 'BD',
            },
            {
                code: 'SPD',
                name: 'Saidpur Airport',
                citycode: 'SPD',
                city: 'Saidpur',
                country: 'Bangladesh',
                countrycode: 'BD',
            },
            {
                code: 'CXB',
                name: 'Coxs Bazar Airport',
                citycode: 'CXB',
                city: 'Coxs Bazar',
                country: 'Bangladesh',
                countrycode: 'BD',
            },
            {
                code: 'ZYL',
                name: 'Civil Airport',
                citycode: 'ZYL',
                city: 'Sylhet',
                country: 'Bangladesh',
                countrycode: 'BD',
            },
            {
                code: 'RJH',
                name: 'Rajshahi Airport',
                citycode: 'RJH',
                city: 'Rajshahi',
                country: 'Bangladesh',
                countrycode: 'BD',
            },
            {
                code: 'JSR',
                name: 'Jessore Airport',
                citycode: 'JSR',
                city: 'Jessore',
                country: 'Bangladesh',
                countrycode: 'BD',
            },
            {
                code: 'BZL',
                name: 'Barisal Airport',
                citycode: 'BZL',
                city: 'Barisal',
                country: 'Bangladesh',
                countrycode: 'BD',
            },
            {
                code: 'JED',
                name: 'King Abdulaziz International Airport',
                citycode: 'JED',
                city: 'Jeddah',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'DMM',
                name: 'King Fahd International Airport',
                citycode: 'DMM',
                city: 'Dammam',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'RUH',
                name: 'King Khaled International Airport',
                citycode: 'RUH',
                city: 'Riyadh',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'ABT',
                name: 'Al-Aqiq Airport',
                citycode: 'ABT',
                city: 'Al Baha',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'AHB',
                name: 'Abha Regional Airport',
                citycode: 'AHB',
                city: 'Abha',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'AJF',
                name: 'Jouf Airport',
                citycode: 'AJF',
                city: 'Sakaka Al Jouf',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'AQI',
                name: 'Qaisumah Airport',
                citycode: 'AQI',
                city: 'Qaisumah',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'BHH',
                name: 'Bisha Domestic Airport',
                citycode: 'BHH',
                city: 'Bisha',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'DHA',
                name: 'King Abdulaziz Air Base',
                citycode: 'DHA',
                city: 'Dhahran',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'DWD',
                name: 'Dawadmi Airport',
                citycode: 'DWD',
                city: 'Dawadmi',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'EAM',
                name: 'Nejran Airport',
                citycode: 'EAM',
                city: 'Nejran',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'EJH',
                name: 'Wedjh Airport',
                citycode: 'EJH',
                city: 'Wedjh',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'ELQ',
                name: 'Prince Nayef bin Abdulaziz Regional Airport',
                citycode: 'ELQ',
                city: 'Buraidah',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'GIZ',
                name: 'Jazan Regional Airport',
                citycode: 'GIZ',
                city: 'Jazan',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'HAS',
                name: 'Hail Airport',
                citycode: 'HAS',
                city: 'Hail',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'HBT',
                name: 'Hambantota Seaplane Base',
                citycode: 'HBT',
                city: 'Hafr Albatin',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'HOF',
                name: 'Al-Ahsa Airport',
                citycode: 'HOF',
                city: 'Alahsa',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'KMC',
                name: 'Hafar Al-Batin Domestic Airport',
                citycode: 'KMC',
                city: 'King Khalid Mil.',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'MED',
                name: 'Prince Mohammad Bin Abdulaziz International Airport',
                citycode: 'MED',
                city: 'Madinah',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'RAE',
                name: 'Arar Airport',
                citycode: 'RAE',
                city: 'Arar',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'RAH',
                name: 'Rafha Airport',
                citycode: 'RAH',
                city: 'Rafha',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'SHW',
                name: 'Sharurah Airport',
                citycode: 'SHW',
                city: 'Sharurah',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'TIF',
                name: 'Taif Airport',
                citycode: 'TIF',
                city: 'Taif',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'TUI',
                name: 'Turaif Airport',
                citycode: 'TUI',
                city: 'Turaif',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'TUU',
                name: 'Tabuk Regional Airport',
                citycode: 'TUU',
                city: 'Tabuk',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'URY',
                name: 'Gurayat Airport',
                citycode: 'URY',
                city: 'Gurayat',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'WAE',
                name: 'Wadi Ad Dawasir Airport',
                citycode: 'WAE',
                city: 'Wadi Ad Dawasir',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'YNB',
                name: 'Yanbu Airport',
                citycode: 'YNB',
                city: 'Yanbu',
                country: 'Saudi Arabia',
                countrycode: 'SA',
            },
            {
                code: 'DXB',
                name: 'Dubai International Airport',
                citycode: 'DXB',
                city: 'Dubai',
                country: 'United Arab Emirates',
                countrycode: 'AE',
            },
        ];

        const aircraftModels = [
            'Airbus A320',
            'Boeing 737-800',
            'Airbus A321',
            'Airbus A319',
            'Boeing 777-300ER',
            'Boeing 737-700',
            'Airbus A330-300',
            'Airbus A330-200',
            'Boeing 737-900',
            'DH8D',
            'Boeing 767-300',
            'Boeing 777-200',
            'Boeing 787-8',
            'Boeing 757-200',
            'Airbus A380-800',
            'Boeing 747-400',
            'ATR 72-600',
            'Boeing 787-9',
            'ATR 72-500',
            'Airbus A350-900',
            'Boeing 737-400',
        ];

        const baggageOptions = [
            'SB',
            '1 Pices',
            '2 Pices',
            '1N',
            '2N',
            '0 KG',
            '2 KG',
            '5 KG',
            '7 KH',
            '10 KG',
            '12 KG',
            '15 KG',
            '20 KG',
            '22 KG',
            '23 KG',
            '23 KG 1 Pices',
            '23 KG 2 Pices',
            '25 KG',
            '25 KG 1 Pices',
            '25 KG 2 Pices',
            '27 KG',
            '30 KG',
            '30 KG 1 Pices',
            '30 KG 2 Pices',
            '35 KG',
            '35 KG 1 Pices',
            '35 KG 2 Pices',
            '40 KG',
            '40 KG 1 Pices',
            '40 KG 2 Pices',
            '45 KG',
            '45 KG 1 Pices',
            '45 KG 2 Pices',
            '46 KG',
            '46 KG 1 Pices',
            '46 KG 2 Pices',
            '50 KG',
            '50 KG 1 Pices',
            '50 KG 2 Pices',
            '56 KG',
            '56 KG 1 Pices',
            '56 KG 2 Pices',
        ];

        const cabinBaggageOptions = [
            'SB',
            'KG',
            '2 KG',
            '5 KG',
            '7 KG',
            '10 KG',
            '12 KG',
            '15 KG',
            '20 KG',
        ];

        // return render view
        return res.render('dashboard/umrah/packages/edit', {
            title: 'Edit Umrah Package',
            umrahPackage: umrahPackage[0],
            umrahPackageDurations,
            umrahPackageTypes,
            airlines,
            airPorts,
            aircraftModels,
            baggageOptions,
            cabinBaggageOptions,
        });
    } catch (error) {
        console.error(error);
        return res.redirect('/error/500');
    }
};
