/**
 * @file /controllers/api/settings/content/blog-posts/delete-many-blog-post.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 17 Jul, 2024
 * @update_date 17 Jul, 2024
 */

// dependencies
const fs = require('fs');
const path = require('path');
const { BlogPost } = require('../../../../../models');

// export delete many blog posts controller
module.exports = async (req, res, next) => {
    try {
        const { ids } = req.body;

        // find blog posts to delete
        const blogsPosts = await BlogPost.find({
            _id: { $in: ids },
        });

        // check if any blog posts not found
        if (blogsPosts.length === 0) {
            return res.status(404).send({
                message: 'No blog posts found with the provided IDs',
            });
        }

        // delete blog posts
        await FlightOffer.deleteMany({ _id: { $in: ids } });

        // delete blog offer thumbnails
        blogsPosts.forEach((flightOffer) => {
            if (flightOffer.thumbnail) {
                fs.unlinkSync(
                    path.join(
                        __dirname,
                        './../../../../../public',
                        flightOffer.thumbnail
                    )
                );
            }
        });

        // send response
        return res.status(200).send({
            message: 'Deleted blog posts successfully',
            deletedFlightPosts: blogsPosts,
        });
    } catch (error) {
        return next(error);
    }
};
