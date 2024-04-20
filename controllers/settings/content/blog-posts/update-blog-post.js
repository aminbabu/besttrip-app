/**
 * @file /controllers/settings/content/blog-posts/get-blog-posts.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// dependencies
const { BlogPost } = require('../../../../models');

// export update blog post controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const { link, status } = req.body;

        // get blog post
        const blogPost = await BlogPost.findById(id);

        // check if blog post exists
        if (!blogPost) {
            return res.status(404).send({
                message: 'Blog post not found',
            });
        }

        // update blog post
        blogPost.set({
            link,
            status,
        });

        // save blog post
        await blogPost.save();

        // send response
        return res.send({
            message: 'Updated blog post successfully',
            blogPost,
        });
    } catch (error) {
        return next(error);
    }
};
