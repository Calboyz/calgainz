import { Meteor } from "meteor/meteor";
import Calories from "/imports/api/collections/Calories";

Meteor.publish("calories", function () {
  const result = Calories.find({ userId: this.userId })
  if (!result) return this.ready()
  return result
});
