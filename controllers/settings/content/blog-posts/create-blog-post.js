/**
 * @file /controllers/settings/content/blog-post/create-blog-post.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 06 May, 2024
 */

// dependencies
const { BlogPost } = require('../../../../models');

// export create blog post controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { link, status } = req.body;
        const { thumbnail } = req.files;

        // create blog post
        const blogPost = new BlogPost({
            link,
            status,
            thumbnail: thumbnail.path,
        });

        // save blog post
        await blogPost.save();

        // send response
        return res.status(201).send({
            message: 'Created blog post successfully',
            blogPost,
        });
    } catch (error) {
        return next(error);
    }
};
