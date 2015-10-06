module.exports = function () {

  this.Given(/^messages and other readers exist$/, function () {
    server.call('fixtures/clean');
    server.call('fixtures/factory');
  });

  this.When(/^I am a new reader$/, function () {
    client.url(process.env.ROOT_URL);
    client.localStorage('DELETE', '__amplify__userId');
  });

  this.When(/^I access the system$/, function () {
    client.url(process.env.ROOT_URL);
  });

  this.Then(/^I am assigned a unique id$/, function () {
    client.waitUntil(function () {
      return client.localStorage('GET', '__amplify__userId').value !== null;
    }, 10000);

    expect(client.localStorage('GET', '__amplify__userId').value)
      .not.toBe(null);
  });

};
