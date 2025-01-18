// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract GoalTracker {

    struct Goal {
        string description;
        uint256 reward;
        uint256 deadline;
        bool completed;
        bool claimed;
    }

    mapping(address => Goal[]) public userGoals;
    mapping(address => uint256) public userBalance;

    event GoalCreated(address indexed user, string description, uint256 deadline, uint256 reward);
    event GoalCompleted(address indexed user, uint256 goalId);
    event RewardClaimed(address indexed user, uint256 reward);

    function createGoal(string memory _description, uint256 _deadline) external payable {
        require(msg.value > 0, "The reward must be greater than 0!");
        require(_deadline > block.timestamp, "Deadline must be in the future");
        
        userGoals[msg.sender].push(Goal({
            description: _description,
            reward: msg.value,
            deadline: _deadline,
            completed: false,
            claimed: false
        }));

        userBalance[msg.sender] += msg.value;

        emit GoalCreated(msg.sender, _description, _deadline, msg.value);
    }

    function completeGoal(uint256 _goalId) external {
        require(_goalId < userGoals[msg.sender].length, "The goal doesn't exist!");

        Goal storage goal = userGoals[msg.sender][_goalId];
        require(!goal.completed, "The goal is already completed!");
        require(block.timestamp <= goal.deadline, "Deadline has passed!");

        goal.completed = true;

        emit GoalCompleted(msg.sender, _goalId);
    }

    function claimReward(uint256 _goalId) external {
        require(_goalId < userGoals[msg.sender].length, "The goal doesn't exist!");

        Goal storage goal = userGoals[msg.sender][_goalId];
        require(goal.completed, "The goal is not complete yet!");
        require(!goal.claimed, "The reward has already been claimed!");
        require(userBalance[msg.sender] >= goal.reward, "Insufficient Balance");

        goal.claimed = true;
        userBalance[msg.sender] -= goal.reward;

        (bool sent, ) = msg.sender.call{value: goal.reward}("");
        require(sent, "Failed to send reward");

        emit RewardClaimed(msg.sender, goal.reward);
    }

    function getGoals(address _user) external view returns (Goal[] memory) {
        return userGoals[_user];
    }
}
