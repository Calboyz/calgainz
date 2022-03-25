import SimpleSchema from "simpl-schema";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check"

const Profiles = new Meteor.Collection("Profiles");

const profilesSchema = new SimpleSchema({
  userId: {
    required: false,
    type: String,
  },
  username: {
    type: String,
  },
  bio: {
    type: String,
  },
  age: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  misc: {
    type: String,
  },
}, { check });

Profiles.attachSchema(profilesSchema);

Meteor.methods({
  insert_profile(profile) {
    Profiles.insert({
      userId: profile.userId,
      username: profile.username,
      bio: profile.bio,
      age: profile.age,
      weight: profile.weight,
      misc: profile.misc,
    });
  },
  update_profile(update, profileId) {
    Profiles.update({ _id: profileId }, { $set: update });
  },
  add_item_profile(update, profileId, fieldName) {
    Profiles.update({ _id: profileId }, { $push: { [fieldName]: update } });
  },
});


export default Profiles;
