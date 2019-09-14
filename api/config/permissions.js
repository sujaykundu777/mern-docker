
module.exports.allowOnly = function (accessLevel, callback) {

    function checkUserRole(req, res) {
        if (!(accessLevel & req.user.role)) {
            // If the user does not have access, Forbidden
            res.sendStatus(403);
            return;
        }
            // Else pass on
        callback(req, res);
    } // end of check user role
    return checkUserRole;
};