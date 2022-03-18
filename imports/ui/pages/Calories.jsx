import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { withTracker } from "meteor/react-meteor-data";
import {
  Container,
  Header,
  Button,
  Progress,
  Grid,
  Label,
  Divider,
  Modal,
  Input,
} from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import moment from "moment";

import Calories from "/imports/api/collections/Calories";

const Colories = (props) => {
  const [date, setDate] = useState(new Date());
  const [foodName, setFoodName] = useState("");
  const [foodCalory, setFoodCalory] = useState(0);
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseCalory, setExerciseCalory] = useState(0);
  const [goal, setGoal] = useState(0);
  const [thisCalory, setThisCalory] = useState(null);
  const [openModalFood, setOpenModalFood] = useState(false);
  const [openModalExercise, setOpenModalExercise] = useState(false);
  const [openModalGoal, setOpenModalGoal] = useState(false);

  const { calories } = props;

  useEffect(() => {
    setThisCalory(
      calories.find(
        (el) =>
          moment(el.date).format("YYYYMMDD") ===
            moment(date).format("YYYYMMDD") && el.userId === Meteor.userId()
      ) || null
    );
  }, [calories, date]);

  const onChangeDate = (e, value) => {
    setDate(value.value);
  };
  
  const onAddCaloryWithGoal = () => {
    if (thisCalory) return;
    Meteor.call("insert_calory", {
      userId: Meteor.user()._id,
      date: moment(date).startOf("day").toDate(),
      goal,
      foods: [],
      exercise: []
    });
    setOpenModalGoal(false);
  };

  const onAddFood = () => {
    if (!foodName || !thisCalory) return;
    Meteor.call(
      "add_item_calory",
      {
        id: Random.id(),
        name: foodName,
        amount: foodCalory,
      },
      thisCalory._id,
      "foods"
    );
    setFoodName("");
    setFoodCalory(0);
    setOpenModalFood(false);
  };

  const onAddExercise = () => {
    if (!exerciseName || !exerciseCalory) return;
    Meteor.call(
      "add_item_calory",
      {
        id: Random.id(),
        name: exerciseName,
        amount: exerciseCalory,
      },
      thisCalory._id,
      "exercise"
    );
    setExerciseName("");
    setExerciseCalory(0);
    setOpenModalExercise(false);
  };
// Meteor.call("remove_all_calories")
  const calcConunter = () => {
    if (!thisCalory)
      return {
        goal: 0,
        consum: 0,
        exerciseSum: 0,
        foodSum: 0,
        leftSum: 0,
      };
    const goal = thisCalory.goal || 0;
    const exerciseSum =
      thisCalory.exercise?.length > 0
        ? thisCalory.exercise.map((el) => el.amount).reduce((a, b) => a + b)
        : 0;
    const foodSum =
      thisCalory.foods?.length > 0
        ? thisCalory.foods.map((el) => el.amount).reduce((a, b) => a + b)
        : 0;
    const consum = foodSum - exerciseSum
    const leftSum = goal - consum
    return { goal, exerciseSum, foodSum, consum, leftSum };
  };

  return (
    <Container fluid id="dashboard-container" style={{ padding: "1rem" }}>
      <Header
        size="huge"
        as="h1"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p style={{ margin: 0 }}>Calorie Counter</p>
          <Header.Subheader>Track your calories for today!</Header.Subheader>
        </div>
        <div style={{ display: "flex" }}>
          <SemanticDatepicker
            value={date}
            size="mini"
            onChange={onChangeDate}
          />
          <Button
            secondary
            disabled={!thisCalory}
            onClick={() => setOpenModalFood(true)}
          >
            Add Food
          </Button>
          <Button
            secondary
            disabled={!thisCalory}
            onClick={() => setOpenModalExercise(true)}
          >
            Add Exerise
          </Button>
          <Button
            secondary
            disabled={!!thisCalory}
            onClick={() => setOpenModalGoal(true)}
          >
            Add Goal
          </Button>
        </div>
      </Header>
      <Divider />
      <div>
        <div
          style={{
            padding: "2.5rem 1rem",
            background: "rgb(238,238,238)",
            background:
              "radial-gradient(circle, rgba(238,238,238,1) 0%, rgba(216,217,232,1) 100%)",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <Grid style={{ width: "100%" }} divided>
            <Grid.Column width={13}>
              <div>
                <span
                  style={{
                    marginRight: "0.5rem",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "green",
                  }}
                >
                  {calcConunter().goal}
                </span>
                <span
                  style={{ textTransform: "uppercase", fontWeight: "bold" }}
                >
                  Calorie Goal
                </span>
              </div>
              <Progress
                total={calcConunter().goal}
                value={calcConunter().consum}
                indicating={!thisCalory}
                color="green"
                style={{ margin: "0.5rem 0 1rem" }}
              />
              <Grid columns={2}>
                <Grid.Column>
                  <Label
                    color="teal"
                    style={{ width: "100%", marginBottom: "1rem" }}
                  >
                    {`FOOD : ${calcConunter().foodSum}`}
                  </Label>
                  {thisCalory && thisCalory.foods?.map(food => (
                    <div key={food.id} style={{ marginBottom: "1rem" }}>
                      {`${food.name} ${food.amount}`}
                      <Progress
                        total={calcConunter().foodSum}
                        value={food.amount}
                        color="teal"
                        size="tiny"
                        style={{ margin: 0 }}
                      />
                    </div>
                  ))}
                </Grid.Column>
                <Grid.Column>
                  <Label
                    color="red"
                    style={{ width: "100%", marginBottom: "1rem" }}
                  >
                    {`EXERISE : ${calcConunter().exerciseSum}`}
                  </Label>
                  {thisCalory && thisCalory.exercise?.map(item => (
                    <div key={item.id} style={{ marginBottom: "1rem" }}>
                      {`${item.name} ${item.amount}`}
                      <Progress
                        total={calcConunter().exerciseSum}
                        value={item.amount}
                        color="red"
                        size="tiny"
                        style={{ margin: 0 }}
                      />
                    </div>
                  ))}
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column width={3}>
              <div style={{ textAlign: "center" }}>
                <h2
                  style={{
                    fontSize: "4rem",
                    fontWeight: 900,
                    color: "royalblue",
                  }}
                >
                  { calcConunter().leftSum }
                </h2>
                <p style={{ margin: 0, fontWeight: 600 }}>Calories</p>
                <p style={{ margin: 0, fontWeight: 600 }}>Left</p>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </div>

      <Modal
        size="mini"
        onClose={() => setOpenModalFood(false)}
        onOpen={() => setOpenModalFood(true)}
        open={openModalFood}
      >
        <Modal.Header>Add Food</Modal.Header>
        <Modal.Content>
          <Input
            type="text"
            fluid
            placeholder="Food Name"
            style={{ marginBottom: "1rem" }}
            value={foodName}
            onChange={(e, v) => setFoodName(v.value)}
          />
          <Input
            type="number"
            fluid
            placeholder="Calory Number"
            value={foodCalory}
            onChange={(e, v) => setFoodCalory(v.value)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpenModalFood(false)}>
            Cancel
          </Button>
          <Button
            content="Add"
            labelPosition="right"
            icon="checkmark"
            positive
            onClick={() => onAddFood()}
          />
        </Modal.Actions>
      </Modal>

      <Modal
        size="mini"
        onClose={() => setOpenModalExercise(false)}
        onOpen={() => setOpenModalExercise(true)}
        open={openModalExercise}
      >
        <Modal.Header>Add Exercise</Modal.Header>
        <Modal.Content>
          <Input
            type="text"
            fluid
            placeholder="Exercise Name"
            style={{ marginBottom: "1rem" }}
            value={exerciseName}
            onChange={(e, v) => setExerciseName(v.value)}
          />
          <Input
            type="number"
            fluid
            placeholder="Calory Number"
            value={exerciseCalory}
            onChange={(e, v) => setExerciseCalory(v.value)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpenModalExercise(false)}>
            Cancel
          </Button>
          <Button
            content="Add"
            labelPosition="right"
            icon="checkmark"
            positive
            onClick={() => onAddExercise()}
          />
        </Modal.Actions>
      </Modal>

      <Modal
        size="mini"
        onClose={() => setOpenModalGoal(false)}
        onOpen={() => setOpenModalGoal(true)}
        open={openModalGoal}
      >
        <Modal.Header>Calorie Goal</Modal.Header>
        <Modal.Content>
          <Input
            type="number"
            fluid
            placeholder="Goal Number"
            value={goal}
            onChange={(e, v) => setGoal(v.value)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpenModalGoal(false)}>
            Cancel
          </Button>
          <Button
            content="Add"
            labelPosition="right"
            icon="checkmark"
            positive
            onClick={() => onAddCaloryWithGoal()}
          />
        </Modal.Actions>
      </Modal>
    </Container>
  );
};

export default withTracker((props) => {
  Meteor.subscribe("calories");
  const calories = Calories.find({
    userId: Meteor.userId,
  }).fetch();
  return { ...props, calories };
})(Colories);
