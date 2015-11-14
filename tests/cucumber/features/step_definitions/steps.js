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
    client.refresh();
  });

  this.When(/^I am a known reader$/, function () {
    client.url(process.env.ROOT_URL);
    knownReaderId = server.call('fixtures/find-one-user')._id;
    client.localStorage('DELETE', keyUserId);
    client.localStorage('POST', {
        key: keyUserId,
        value: JSON.stringify({
          data: knownReaderId,
          expires: null
        })
    });
    client.refresh();
  });

  this.Then(/^I am assigned a unique id$/, function () {
    client.waitUntil(function () {
      return client.localStorage('GET', keyUserId).value !== null;
    }, 10000);

    expect(client.localStorage('GET', keyUserId).value.data)
      .not.toBe(null);
  });

  this.Then(/^my unique id is recognized$/, function () {
    expect(JSON.parse(client.localStorage('GET', keyUserId).value))
      .toEqual({
        data: knownReaderId,
        expires: null
      });
  });

  this.Then(/^I get the most relevant message$/, function () {
    expect(client.isVisible('#message')).toBe(true);
    client.waitUntil(function () {
      return client.getText('#message') !== 'Loading...';
    }, 10000);
    expect(client.getText('#message').length).not.toBe(0);
  });

  this.When(/^I mark current message as relevant$/, function () {
    // Write the automation code here
    pending();
  });

  this.Then(/^my connection to its writer is strengthened$/, function () {
    // Write the automation code here
    pending();
  });

  this.Then(/^a new message is shown$/, function () {
    // Write the automation code here
    pending();
  });

};
