/**
 * @file utils/global/prepare-role-defination.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 21 June, 2024
 * @update_date 05 Jul, 2024
 */

// export role defination function
module.exports = (user) => {
    const modifiedUser = { ...user };

    switch (modifiedUser.role) {
        case 'admin':
            modifiedUser.roleName = 'Administator';
            break;

        case 'manager':
            modifiedUser.roleName = 'Manager';
            break;

        case 'dev':
            modifiedUser.roleName = 'Developer';
            break;

        case 'support':
            modifiedUser.roleName = 'Support';
            break;

        case 'staff':
            modifiedUser.roleName = 'Staff';
            break;

        case 'customer':
            modifiedUser.roleName = 'Customer';
            break;

        default:
            modifiedUser.roleName = 'Staff';
            break;
    }

    return modifiedUser;
};
