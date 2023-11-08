// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract TodoList {

  struct Task {
    uint id;
    string title;
    string description;
    bool isCompleted;
  }

  uint public taskCount = 0;

  mapping(uint => Task) public tasks;

  constructor() {
    createTask('Call SiGMA Inc.', 'Talk to Abigail/Sirine about blockchain development');
  }

  function createTask(string memory _title, string memory _description)  public {
    taskCount++;
    tasks[taskCount] = Task(taskCount, _title, _description, false);
  }
}
