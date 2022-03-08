import React from 'react';
import {Container, Image, Divider, Grid, Segment, Header, List} from "semantic-ui-react";
import ProgressBar from "@ramonak/react-progress-bar";

export const Dashboard = () => {
    return (

        <Container>

          <Grid celled>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header as='h1'>
                  Previous Calories Burned:
                </Header>
              </Grid.Column>
              <Grid.Column width={13}>
                <Header as='h2'>
                  69 Calories
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid celled>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header as='h1'>
                  Calories Burned Today:
                </Header>
              </Grid.Column>
              <Grid.Column width={13}>
                <Header as='h2'>
                  100 Calories
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid celled>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header as='h1'>
                  Goal:
                </Header>
              </Grid.Column>
              <Grid.Column width={13}>
                <Header as='h2'>
                  <ProgressBar completed={50} customLabel="100/200" />
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid celled>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header as='h1'>
                  Points:
                </Header>
              </Grid.Column>
              <Grid.Column width={13}>
                <Header as='h2'>
                420 Points
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>

        </Container>
    );
};
