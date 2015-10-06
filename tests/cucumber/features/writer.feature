Feature: interaction with writers

  As a feed  writer
  I want to send messages
  So that I can share what I know

  Background:
    Given I am a writer

  @ignore
  Scenario: send message
    When I send a message
    Then it is associated with my reader id
    And it is given a unique message id
    And it is made available to readers
