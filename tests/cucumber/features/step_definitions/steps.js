module.exports = function () {

  var knownReaderId;
  var keyUserId = '__amplify__userId';

  this.Given(/^messages and other readers exist$/, function () {
    server.call('fixtures/clean');
    server.call('fixtures/factory');
  });

  this.When(/^I am a new reader$/, function () {
    client.url(process.env.ROOT_URL);
    client.localStorage('DELETE', keyUserId);
    client.url(process.env.ROOT_URL);
  });

  this.When(/^I am a known reader$/, function () {
    client.url(process.env.ROOT_URL);
    knownReaderId = server.call('fixtures/find-one-user')._id;
    client.localStorage('POST', {
        key: keyUserId,
        value: knownReaderId
    });
    client.url(process.env.ROOT_URL);
  });

  this.Then(/^I am assigned a unique id$/, function () {
    client.waitUntil(function () {
      return client.localStorage('GET', keyUserId).value !== null;
    }, 10000);

    expect(client.localStorage('GET', keyUserId).value)
      .not.toBe(null);
  });

  this.Then(/^my unique id is recognized$/, function () {
    expect(client.localStorage('GET', keyUserId).value)
      .toBe(knownReaderId);
  });

  this.Then(/^I get the most relevant message$/, function () {
    // Write the automation code here
    pending();
  });

};
