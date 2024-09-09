/**
 * @file controllers/dashboard/lgoin-history/view-blocked-ips.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 15 June, 2024
 * @update_date 21 June, 2024
 */

// dependencies
const { LoginHistory } = require('../../../models');

// export blocked ips view controller
module.exports = async (req, res) => {
    try {
        // Stage 1: matching stage
        const matchingStage = {
            $match: {
                status: 'blocked',
            },
        };

        // Stage 2: Lookup from the User collection
        const lookupUsersStage = {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'userDetails',
            },
        };

        // Stage 3: Lookup from the Customer collection
        const lookupCustomersStage = {
            $lookup: {
                from: 'customers',
                localField: 'user',
                foreignField: '_id',
                as: 'customerDetails',
            },
        };

        // Stage 4: Add fields for the user data
        const addFieldsStage = {
            $addFields: {
                user: {
                    $let: {
                        vars: {
                            // Get the first element from the userDetails array
                            userDetails: {
                                $arrayElemAt: ['$userDetails', 0],
                            },
                            // Get the first element from the customerDetails array
                            customerDetails: {
                                $arrayElemAt: ['$customerDetails', 0],
                            },
                        },
                        in: {
                            // Conditionally choose userDetails or customerDetails
                            $cond: {
                                if: {
                                    $gt: [
                                        { $type: '$$userDetails' },
                                        'missing', // Check if userDetails is present
                                    ],
                                },
                                then: {
                                    _id: '$$userDetails._id',
                                    name: '$$userDetails.name',
                                    email: '$$userDetails.email',
                                },
                                else: {
                                    _id: '$$customerDetails._id',
                                    name: '$$customerDetails.name',
                                    email: '$$customerDetails.email',
                                },
                            },
                        },
                    },
                },
            },
        };

        // Stage 5: Remove unnecessary fields
        const projectStage = {
            $project: {
                userDetails: 0,
                customerDetails: 0,
            },
        };

        // Stage 6: Sort by createdAt field in descending order
        const sortStage = {
            $sort: { createdAt: -1 },
        };

        // Define the aggregation pipeline
        const pipeline = [
            matchingStage,
            lookupUsersStage,
            lookupCustomersStage,
            addFieldsStage,
            projectStage,
            sortStage,
        ];

        // Execute the aggregation pipeline
        const blockedIps = await LoginHistory.aggregate(pipeline);

        // render blocked ips view
        return res.render('dashboard/login-history/blocked-ips', {
            title: 'Blocked IPs',
            blockedIps,
        });
    } catch (error) {
        return res.redirect('/error/500');
    }
};
