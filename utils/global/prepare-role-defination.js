/**
 * @file utils/global/prepare-role-defination.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 21 June, 2024
 * @update_date 21 June, 2024
 */

// export role defination function
module.exports = (user) => 
{
    const modifiedUser = {...user};

    switch (modifiedUser.role) {
        case 'admin':
            return modifiedUser.roleName = 'Administator';
            
        case 'manager':
            return modifiedUser.roleName = 'Manager';
            
        case 'dev':
            return modifiedUser.roleName = 'Developer';
            
        case 'support':
            return modifiedUser.roleName = 'Support';
            
        case 'stuff':
            return modifiedUser.roleName = 'Stuff';
    
        default:
            return modifiedUser.roleName = 'Stuff';
    }

    return modifiedUser;
}

