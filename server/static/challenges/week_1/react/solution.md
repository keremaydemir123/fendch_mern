Hello readers! This is the first time I am writing an article on building something with React. So, I am also new to React and Frontend Frameworks. And the best way to make your first React project would be to make a simple Todo App.

Building a Todo App is easy and does not take much time but it teaches you some important concepts. It teaches you the principle of CRUD (Create, Read, Update and Delete) which are very important to understand for any developer.

Since this is our first project in the React world, we would keep things simple. We won’t be using Redux for state management and we would not use any kind of server to manage it.

Building a simple Todo list means we won’t be able to keep track of the todos once we refresh the page. So, it is not a perfect solution but a good start.

We will learn to build an advanced Todo App which would involve Redux and a server but for now, we would like to keep things simple. We would build a simple working React app with some styling.

So, let’s begin:

## Setting Up the Project
So, let’s start building our first React Todo app. We would be using create-react-app to help us bootstrap the React App for us.

```js
npm install create-react-app
```

Running the above command would install create-react-app in our project. Now, this would be ready for use.

To create a new project named ‘todo’, we would run the command as follows:-

```js
create-react-app todo
```

Now, this would create a folder named ‘todo’ in our current repository. Next, we should move inside the todo folder by doing:

```js
cd todo
```

Now, we will install two libraries using npm which would help us with using the Bootstrap library in our app to apply the styling.

```js
npm install react-bootstrap bootstrap
```

Running the above command will install both react-bootstrap and bootstrap libraries in our application.

Now, we are ready to build the app.

## App.css
Now, let’s write some custom CSS code to do some styling. Do not worry about this part. It is very simple styling to make our Todo app look a bit nicer.

```css
.app {
  padding: 30px;
  background-color: floralwhite;
}

.todo {
  align-items: center;
  display: flex;
  font-size: 18px;
  justify-content: space-between;
}
```

We will do the rest of the styling using react-bootstrap components.

## App.js
Next, we will start with the main part, the App.js file. We will start by importing the required things in our App.js file.


```js
import React from "react";
import "./App.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
```

We will use React Hooks to allow us to replace the class-based components with functional components and still use all features without any issues.

So, we start with the main function of the App. We will define a todos javascript list which would contain all our todos and also carries the status of each todo whether they are done or not. We will use setTodos and will use React.useState which is enabled by React Hooks.

```js
function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "This is a sampe todo",
      isDone: false
    }
  ]);
}
```

Next, we move to the part of adding todos. We will define an addTodo function and will define a newTodos which would take the todos list and append the new todo’s text to the list using the spread operator. We then use setTodos to set newTodos as todos.

```js
const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };
```

Next, we move to the part of marking Todos as done. We will define a markTodo function. We use the spread operator to copy all the todos in newTodos and then we mark the todo as done by using its index and then we set the newTodos as todos.

```js
const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };
```

Next, we move the part of deleting the todos. In the same way, this time we use the index to splice the list and remove the todo whose index matches and then we set the new todos.

```js
const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
```

We then finish off the App function by returning the JSX rendering which would be displayed on the website. We are using a FormTodo component which we will define later on. It accepts the addTodo as a parameter.

Then we display all the todos using the map operator. For each todo, we will pass it to the Todo component (will define later). We send the index, todo, the markTodo and removeTodo functions.

```js
return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                key={index}
                index={index}
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
```

Now, we will define the Todo component. It accepts the four parameters which we passed on earlier when we called the Todo component.

We return some JSX which would show each Todo. It will also show two buttons for marking Todos as Done and for removing the Todo respectively.

```js
function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div
      className="todo"
      
    >
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
      <div>
        <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div>
  );
}
```

Next, we would define the FormTodo function. It accepts the addTodo as a parameter. It handles the submission of a new Todo. If the value is not empty, then we call the addTodo function on that todo text and then set the value of the form to empty again.

We return a form which accepts a Todo and has a Submit button for submission of the todos. Clicking on the submit button would add the Todo in the Todo list.

```js
function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>Add Todo</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
    </Form.Group>
    <Button variant="primary mb-3" type="submit">
      Submit
    </Button>
  </Form>
  );
}
```

That was it! 