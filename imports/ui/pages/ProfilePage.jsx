import React, { useState } from 'react';
import { Container, Image, Divider, Grid, Segment, Header, List, Modal, Input, Button } from "semantic-ui-react";
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { useParams } from "react-router-dom";
import Calories from '../../api/collections/Calories';
import Profile from '../../api/collections/Profile';

const ProfilePage = (props) => {
  const [bioString, setBioString] = useState();
  const [ageNumber, setAgeNumber] = useState();
  const [weightNumber, setWeightNumber] = useState();
  const [miscString, setMiscString] = useState();
  const [openModalBio, setOpenModalBio] = useState(false);

  const onAddBioUpdate = () => {
    if (bioString) return;
    Meteor.call("insert_profile", {
      userId: Meteor.user()._id,

    })
  }

    return ( (props.ready) ? (
        <Container>
        <Divider/>
        <Grid columns={2} divided>
            <Grid.Column>
                <Segment textAlign={'center'}>
                    <Header as='h1'>Owner: {props.profile.username}</Header>
                    <Header as='h4' style={{ marginTop: '5px', color: 'grey' }}
                    >Name</Header>
                    <Grid.Column>
                        {/*<Image size='medium rounded' src='https://www.thenetworkadvisory.com/wp-content/uploads/2021/10/Nicki-Minaj-520x520.jpg' wrapped ui={true} centered/>*/}
                        <Image size='medium rounded' src='https://i.pravatar.cc/520' wrapped ui={true} centered/>
                    </Grid.Column>
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment>
                    <Grid.Column>
                        <Header as='h3'>Bio</Header>
                        <Modal size="mini"
                               onClose={() => setBioString(false)}
                               onOpen={() => setBioString(true)}
                               open={openModalBio}>
                            <Modal.Header>Bio</Modal.Header>
                            <Modal.Content>
                                <Input
                                    type="string"
                                    fluid
                                    placeholder={props.profile.bio}
                                    value={bioString}
                                    onChange={(e,v) => setBioString(v.value)}
                                />
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color="black" onClick={() => setOpenModalBio(false)}> Cancel </Button>
                                <Button
                                    content="Add"
                                    labelPosition="right"
                                    icon="checkmark"
                                    positive
                                    onClick={() => on}
                                />
                            </Modal.Actions>
                        </Modal>
                        <Container>Bio Text</Container>
                        <Header as='h3'>Age</Header>
                        <Container>{props.profile.age}</Container>
                        <Header as='h3'>Weight</Header>
                        <Container>{props.profile.weight}</Container>
                        <Header as='h3'>Misc</Header>
                        <Container>{props.profile.misc}</Container>
                    </Grid.Column>
                </Segment>
            </Grid.Column>
        </Grid>
        <Divider/>
    </Container>) : ''
    );
};



export default withTracker((props) => {
    const documentId = useParams()._id
    const sub = Meteor.subscribe("profile");
    const ready = sub.ready()
    const profile = Profile.findOne({userId: documentId});
    return { profile, ready };
})(ProfilePage);