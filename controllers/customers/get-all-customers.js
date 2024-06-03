/**
 * @file /controllers/api/customers/get-all-customers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March, 2024
 * @update_date 08 April, 2024
 */

// dependencies
const { Customer } = require('../../models');

// export get all customers controller
module.exports = async (req, res, next) => {
    try {
        // get all customers and total count using aggregation
        const [{ customers, totalCount }] = await Customer.aggregate([
            {
                $group: {
                    _id: null,
                    customers: { $push: '$$ROOT' },
                    totalCount: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    customers: 1,
                    totalCount: 1,
                },
            },
        ]);

        // return response
        return res.status(200).json({
            message: 'Fetched customers successfully',
            customers,
            totalCount,
        });
    } catch (error) {
        return next(error);
    }
};
