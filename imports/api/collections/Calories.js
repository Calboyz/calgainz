import SimpleSchema from "simpl-schema";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check"

const Calories = new Meteor.Collection("Calories");

const caloryItemSchema = new SimpleSchema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  amount: {
    type: Number,
  },
})

const caloriesSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  date: {
    type: Date,
  },
  goal: {
    type: Number,
  },
  foods: {
    type: Array,
    defaultValue: [],
  },
  "foods.$": {
    type: caloryItemSchema,
  },
  exercise: {
    type: Array,
    defaultValue: [],
  },
  "exercise.$": {
    type: caloryItemSchema,
  },
}, { check });

Calories.attachSchema(caloriesSchema);

Meteor.methods({
  insert_calory(calory) {
    Calories.insert({
      userId: calory.userId,
      date: calory.date,
      goal: calory.goal,
    });
  },
  update_calory(update, caloryId) {
    Calories.update({ _id: caloryId }, { $set: update });
  },
  add_item_calory(update, caloryId, fieldName) {
    Calories.update({ _id: caloryId }, { $push: { [fieldName]: update } });
  },
  remove_calory(caloryId) {
    Calories.update(
      { _id: caloryId },
      { $set: { removed: true, removedAt: new Date() } }
    );
  },
  remove_all_calories() {
    Calories.remove({});
  },
});

export default Calories;
