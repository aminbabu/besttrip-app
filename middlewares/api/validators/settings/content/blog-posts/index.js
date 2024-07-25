/**
 * @file /middlewares/api/validators/settings/content/blog-posts/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 20 April, 2024
 * @update_date 20 April, 2024
 */

// export
module.exports = {
    validateBlogPostStatus: require('./validate-blog-post-status'),
    validateBlogPostId: require('./validate-blog-post-id'),
    validateBlogPostIds: require('./validate-blog-post-ids'),
    validateBlogPost: require('./validate-blog-post'),
    validateBlogPostThumbnail: require('./validate-blog-post-thumbnail'),
    validateBlogPostBanner: require('./validate-blog-post-banner'),
};
