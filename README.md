## Apollo Client Assignment

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
GraphQL server will be running at [http://localhost:3000](http://localhost:4000), Available Queries and mutation are listed there.

### Tasks

1. Add `/` route which lists all tasks.

- Allow marking task as completed via checkbox
- Shows name of task
- On click should navigate to `/task/:id`
- Add Create Task button which redirects to `/task/create`

2. Add `/task/:id` route which shows current task and allows actions:

- Marking task as completed via checkbox
- Update Task name and description and show notification
- Delete Task and show notification

3. Add `/task/create` route to create route

- Takes name and description to create new task
- Redirect user to `/` and show a notification on complete.
