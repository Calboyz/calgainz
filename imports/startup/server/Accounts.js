import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/** Create user based off email password and role */
function createUser(username, email, password, role) {
    const userID = Accounts.createUser({
        username: username,
        email: email,
        password: password,
    });
    if (role === 'admin') {
        Roles.createRole(role, { unlessExists: true });
        Roles.addUsersToRoles(userID, 'admin');
    }
}

/* pass settings file to setup default user accounts */
if (Meteor.users.find().count() === 0) {
    if (Meteor.settings.defaultAccounts) {
        console.log('Creating the default Account(s)');
        Meteor.settings.defaultAccounts.map(({username, email, password, role}) => createUser(username, email, password, role));
    } else {
        console.log('Error ocurred')
    }
}