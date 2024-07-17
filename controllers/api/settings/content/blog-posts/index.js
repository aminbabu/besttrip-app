/**
 * @file /controllers/api/settings/content/blog-posts/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// export blog posts controllers
module.exports = {
    getBlogPosts: require('./get-blog-posts'),
    getBlogPost: require('./get-blog-post'),
    createBlogPost: require('./create-blog-post'),
    updateBlogPost: require('./update-blog-post'),
    updateBlogPostStatus: require('./update-blog-post-status'),
    deleteBlogPost: require('./delete-blog-post'),
    deleteManyBlogPosts: require('./delete-many-blog-post'),
};
