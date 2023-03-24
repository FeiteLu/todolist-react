import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo_list: []
    }
  }

  async addTodo(newTodo) {
    if (newTodo.trim() === "") {
      alert("Please input title!");
      return;
    }
    const newTd = { newTodo };

    fetch(URL, {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json())
      .then((res) => {
        this.setState({ todo_list: [res, ...this.state.todo_list] });
      })
      .catch((err) => {
        alert(`add new task failed: ${err}`);
      });

  }

  async removeTodo(id) {
    fetch(URL + `/${id}`, {
      method: "DELETE",
    }).then((res) => res.json())
      .then(res => {
        const new_list = this.state.todo_list.filter(todo => +todo.id !== +id);
        this.setState({ todo_list: new_list });
      })
  }

  async getTodos() {
    fetch(URL).then((res) => res.json())
  }

}





export default App;
