import { Meteor } from "meteor/meteor";
import Calories from "/imports/api/collections/Calories";
import Profile from "/imports/api/collections/Profile"

Meteor.publish("calories", function () {
  const result = Calories.find({ userId: this.userId })
  if (!result) return this.ready()
  return result
});

Meteor.publish("profile", function() {
  if (this.userId) {
    return Profile.find ({userId: this.userId})
  }
  return this.ready()
})
