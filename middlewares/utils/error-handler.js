/**
 * @file middlewares/utils/error-handler.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 04 Jul, 2024
 * @update_date 04 Jul, 2024
 */

// export error handler middleware
module.exports = (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log('From Error Handler:: ', err);

    if (req.locals?.url.startsWith('/api')) {
        // send error response
        return res.status(err.status || 500).json({
            message:
                err?.message ||
                'Internal server error. Please try again later.',
        });
    } else {
        return res.redirect(`/dashboard/errors/${err.status || 500}`);
    }

    // render the error page
    // return res.status(err.status || 500).render('error');
};
