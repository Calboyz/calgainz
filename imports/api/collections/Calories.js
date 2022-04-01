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
    const calorie = Calories.findOne({ _id: caloryId })
    if (!calorie.goal) {
      return
    }
    const exerciseSum =
      calorie.exercise?.length > 0
        ? calorie.exercise.map((el) => el.amount).reduce((a, b) => a + b)
        : 0;
    const foodSum =
      calorie.foods?.length > 0
        ? calorie.foods.map((el) => el.amount).reduce((a, b) => a + b)
        : 0;
    const consum = foodSum - exerciseSum;
    const leftSum = calorie.goal - consum;
    if (leftSum <= 0) {
      Meteor.users.update(
        { _id: Meteor.userId() },
        { $addToSet:
          {
            "profile.points": {
              data: calorie.date,
              point: 10
            }
          } 
        }
      );
    }
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
  get_top_list({ limit }) {
    const allUsers = Meteor.users.find({}).fetch()
    const topList = allUsers.map((user) => ({
      _id: user._id,
      name: user.username,
      point: user.profile?.points.map((e) => e.point).reduce((a, b) => a + b, 0),
      points: user.profile?.points,
    }))
      .filter((e) => e.point > 0)
      .sort((a, b) => b.point - a.point)
      .slice(0, limit);
    return topList;
  }
});

export default Calories;
