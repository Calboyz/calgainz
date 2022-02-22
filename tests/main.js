import assert from "assert";
import { Meteor } from 'meteor/meteor';

// eslint-disable-next-line no-undef
describe("calgainz", function () {
  // eslint-disable-next-line no-undef
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "calgainz");
  });

  if (Meteor.isClient) {
    // eslint-disable-next-line no-undef
    it("client is not server", function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    // eslint-disable-next-line no-undef
    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});
