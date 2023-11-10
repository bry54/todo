// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract TodoList {

  struct Task {
    uint id;
    string title;
    string description;
    bool isCompleted;
  }

  address public owner;
  uint public taskCount = 0;

  mapping(uint => Task) public tasks;

  constructor() {
    createTask('Call SiGMA Inc.', 'Talk to Abigail/Sirine about blockchain development');
  }

  event TaskCreated(uint256 id, Task task);

  function createTask(string memory _title, string memory _description)  public {
    taskCount++;
    Task task = Task(taskCount, _title, _description, false);
    tasks[taskCount] = task;

    emit TaskCreated(taskCount, task);
  }

  function toggleTaskStatus(uint256 _taskId) public {
    //require(_taskId > 0 && _taskId <= taskCount, "Invalid task ID");
    tasks[_taskId].completed = !tasks[_taskId].completed;
  }
}
