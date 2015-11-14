Feature: interaction with readers

  As a feed reader
  I want to be presented with relevant messages
  So that I am in the know on what is most important to me

  Background:
    Given messages and other readers exist

  @dev
  Scenario: new reader interaction
    When I am a new reader
    Then I am assigned a unique id

  @dev
  Scenario: known reader interaction
    When I am a known reader
    Then my unique id is recognized

  @dev
  Scenario: known reader gets most relevant message
    When I am a known reader
    Then I get the most relevant message

  @dev
  Scenario: reader considers message relevant
    When I mark current message as relevant
    Then my connection to its writer is strengthened
    And a new message is shown

  @ignore
  Scenario: reader considers message not relevant
    When I mark current message as not relevant
    Then my connection to its writer is weakened
    And a new message is shown
