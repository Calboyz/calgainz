import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ProfileCollection. It encapsulates state and variable values for users.
 */
class ProfileCollection {
    constructor() {
        // The name of this collection.
        this.name = 'ProfileCollection';
        // Define the Mongo collection.
        this.collection = new Mongo.Collection(this.name);
        // Define the structure of each document in the collection.
        this.schema = new SimpleSchema({
            firstName: {
                type: String,
                defaultValue: '',
            },
            lastName: {
                type: String,
                defaultValue: '',
            },
            bio: {
                type: String,
                defaultValue: '',
                optional: true,
            },
            age: {
                type: String,
                defaultValue: '',
                optional: true,
            },
            weight: {
                type: String,
                defaultValue: '',
                optional: true,
            },
            misc: {
                type: String,
                defaultValue: '',
                optional: true,
            },
            owner: String,
        }, { tracker: Tracker });
        // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
        this.collection.attachSchema(this.schema);
        // Define names for publications and subscriptions
        this.profilePublicationName = `${this.name}.publication.user`;
        this.adminPublicationName = `${this.name}.publication.admin`;
    }
}

/**
 * The singleton instance of the ProfileCollection.
 * @type {ProfileCollection}
 */
export const Profiles = new ProfileCollection();