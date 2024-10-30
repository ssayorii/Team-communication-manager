export const sections = [
  {
    title: "TO DO",
    tasks: [
      {
        id: 1,
        name: "Task 1",
        description: "lorem ipsumlorem ipsum",
        assignee: ["AAA", "BBB"],
        start: "Oct 20",
        end: "Oct 25",
        priority: "High",
        status: "TO DO",
        subtasks: [
          {
            name: "Sub Task 1",
            description: "lorem ipsumlorem ipsum",
            assignee: ["DDD", "EEE"],
            start: "Oct 20",
            end: "Oct 25",
            priority: "High",
            status: "TO DO",
          },
          {
            name: "Sub Task 2",
            description: "lorem ipsumlorem ipsum",
            assignee: ["DDD", "EEE"],
            start: "Oct 20",
            end: "Oct 25",
            priority: "High",
            status: "COMPLETED",
            completed: true,
          },
        ],
      },
      {
        id: 2,
        name: "Task 2",
        description: "lorem ipsumlorem ipsum",
        assignee: ["DDD", "EEE"],
        start: "Oct 20",
        end: "Oct 25",
        priority: "Medium",
        status: "TO DO",
      },
    ],
  },
  {
    title: "IN PROGRESS",
    tasks: [
      {
        id: 3,
        name: "Task 2",
        description: "lorem ipsumlorem ipsum",
        assignee: ["DDD", "EEE"],
        start: "Oct 20",
        end: "Oct 25",
        priority: "Low",
        status: "IN PROGRESS",
      },
    ],
  },
  {
    title: "COMPLETED",
    tasks: [
      {
        id: 4,
        name: "Task 2",
        description: "lorem ipsumlorem ipsum",
        assignee: ["DDD", "EEE"],
        start: "Oct 20",
        end: "Oct 25",
        priority: "High",
        status: "COMPLETED",
      },
    ],
  },
];
