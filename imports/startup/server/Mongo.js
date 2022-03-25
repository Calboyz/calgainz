import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base';
import Profiles from '../../api/collections/Profile';

const addProfile = (data) => {
    console.log(`  Adding: ${data.username}`);
    data.userId = Accounts.findUserByUsername(data.username)._id
    Profiles.insert(data);
}

if (Profiles.find().count() === 0) {
    if (Meteor.settings.defaultProfiles) {
        console.log("Creating Default Data")
        Meteor.settings.defaultProfiles.map(data => addProfile(data))
    }
}