import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import {
  Container,
  Header,
  List,
} from "semantic-ui-react";

export const LeaderBoard = () => {
  const [loading, setLoading] = useState(false)
  const [topList, setToplist] = useState([])

  const getTopList = () => {
    setLoading(true)
    console.log("calling...")
    Meteor.call("get_top_list", {
      limit: 25,
    },
    (err, res) => {
      setLoading(false)
      setToplist(res)
    });
  }

  useEffect(() => {
    getTopList()
  }, [])

  return (
    <Container fluid id="leaderboard-container" style={{ padding: "1rem" }}>
      <Header
        size="huge"
        as="h1"
      >
        <p style={{ textAlign: 'center' }}>Leaderboard (Top {topList.length})</p>
      </Header>

      <List ordered>
        {topList.map((user) => (<List.Item>
          <span style={{ textTransform: 'capitalize' }}>{user.name}</span>: {user.point} points
        </List.Item>))}
      </List>
    </Container>
  )
};

export default LeaderBoard;
