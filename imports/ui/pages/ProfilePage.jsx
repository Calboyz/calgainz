import React from 'react';
import {Container, Image, Divider, Grid, Segment, Header, List} from "semantic-ui-react";

const ProfilePage = () => {
    return (
        <Container>
            <Divider/>
            <Grid columns={2} divided>
                <Grid.Column>
                    <Segment textAlign={'center'}>
                        <Header as='h1'>Owner</Header>
                        <Header as='h4' style={{ marginTop: '5px', color: 'grey' }}
                        >Name</Header>
                        <Grid.Column>
                            <Image size='medium rounded' src='https://www.thenetworkadvisory.com/wp-content/uploads/2021/10/Nicki-Minaj-520x520.jpg' wrapped ui={true} centered/>
                        </Grid.Column>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment>
                        <Grid.Column>
                            <Header as='h3'>Bio</Header>
                            <Container>Bio Text</Container>
                            <List>
                                <List.Item>Age: N/A</List.Item>
                                <List.Item>Weight: N/A</List.Item>
                                <List.Item>Misc: N/A</List.Item>
                            </List>
                        </Grid.Column>
                    </Segment>
                </Grid.Column>
            </Grid>
            <Divider/>
        </Container>
    );
};

export default ProfilePage;