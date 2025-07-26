// todo-app.js

// Import necessary classes from Lit
import { LitElement, html, css } from 'https://esm.sh/lit';

class TodoApp extends LitElement {
  // Define reactive properties
  static properties = {
    todos: { type: Array },   // The list of todo items
    inputValue: { type: String }, // The current input value
    dueDate: { type: String }
  };

  // Define styles for the component
  static styles = css`
    .todo-container {
      background: white;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      max-width: 400px;
    }

    input {
      width: 70%;
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      padding: 0.5rem 1rem;
      margin-left: 0.5rem;
      background: #6200ee;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    ul {
      margin-top: 1rem;
      padding: 0;
      list-style: none;
    }

    li {
      display: flex;
      justify-content: space-between;
      color: #333;
      font-size: 1rem;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
    }

    .completed {
      text-decoration: line-through;

      color: gray;
    }

    .delete-btn {
      background: transparent;
      border: none;
      color: crimson;
      font-size: 1.2rem;
      cursor: pointer;
    }
  `;

  // Constructor: initialize defaults
  constructor() {
    super();
    this.todos = [];
    this.inputValue = '';
  }

  // Lifecycle: load todos from backend if available
  connectedCallback() {
    super.connectedCallback();
    this._fetchTodos();
  }

  // Fetch todos from backend
  async _fetchTodos() {
    try {
      const res = await fetch('http://localhost:3000/todos');
      const data = await res.json();
      this.todos = data;
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  }

  // Save todos to localStorage
  /*
  _saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
  */

  // Handle input change
  _updateInput(e) {
    this.inputValue = e.target.value;
  }

  // Add a new todo
  async _addTodo() {
    const task = this.inputValue.trim();
    if (task) {
      const newTask = {
        text: task,
        dueDate: this.dueDate,
        completed: false
      };

      try {
        const res = await fetch('http://localhost:3000/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTask)
        });

        const savedTask = await res.json();
        this.todos = [...this.todos, savedTask]; // Update UI
        this.inputValue = '';
        this.dueDate = '';
      } catch (error) {
        console.error('Failed to save task:', error);
      }
    }
  }

  // Toggle a todo's completion state
  _toggleComplete(index) {
    this.todos = this.todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    // this._saveTodos();
  }

  // Delete a todo item
  _deleteTodo(index) {
    this.todos = this.todos.filter((_, i) => i !== index);
    // this._saveTodos();
  }

  // Render the component UI
  render() {
    return html`
      <div class="todo-container">
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
            <input
                .value=${this.inputValue}
                @input=${this._updateInput}
                placeholder="Task..."
            />
            <input
                type="date"
                .value=${this.dueDate}
                @input=${e => this.dueDate = e.target.value}
            />
            <button @click=${this._addTodo}>Add</button>
            </div>


        <ul>
          ${this.todos.map((todo, index) => html`
            <li>
              <button
                class="delete-btn"
                @click=${() => this._deleteTodo(index)}
                title="Delete task"
                >
                ✖
              </button>
            </li>
          `)}
        </ul>
      </div>
    `;
  }
}

// Register the component
customElements.define('todo-app', TodoApp);
