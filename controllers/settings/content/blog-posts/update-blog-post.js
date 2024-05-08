/**
 * @file /controllers/settings/content/blog-posts/get-blog-posts.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 08 May, 2024
 */

// dependencies
const { BlogPost } = require('../../../../models');

// export update blog post controller
module.exports = async (req, res, next) => {
    try {
        // get validated data
        const { id } = req.params;
        const validatedData = req.body;
        const { thumbnail, banner } = req.files;

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
            ...validatedData,
            thumbnail: thumbnail.path,
            banner: banner.path,
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
