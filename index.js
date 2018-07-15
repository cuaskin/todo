Vue.component("todo-item", {
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  methods: {
    todoComplete: function(todos, index) {
      todos[index].isComplete = true;
      console.log(
        "Tamamlandı! " + todos[index].title + "-" + todos[index].isComplete
      );
    },
    todoDelete: function(todos, index) {
      todos.splice(index, 1);
      //todos.pop(index);
      console.log("Silindi! " + todos[index].title);
    }
  },
  template: `
  <div>
    <li v-for="(todo, index) in todos" v-if="!todo.isComplete">
      <span class="id">{{ index + 1 }}</span>
      <span class="title">{{ todo.title }}</span>
      <span class="type" @click="todoComplete(todos,index)"></span>
      <span class="delete" @click="todoDelete(todos,index)" />   
    </li>
  </div>
  `
});

var app = new Vue({
  el: "#app",
  name: "todo-app",
  data: {
    hi: "Welcome",
    username: "Cuneyt",
    isLoading: true,
    isLoggedIn: false,
    isAllCompleted: false,
    newTodoText: "",

    todos: [
      {
        id: "1",
        title: "kalem",
        isComplete: false
      },
      {
        id: 2,
        title: "Defter",
        isComplete: true
      },
      {
        id: 3,
        title: "Silgi",
        isComplete: false
      },
      {
        id: 4,
        title: "Çanta",
        isComplete: false
      }
    ],

    nextTodoId: 5
  },
  methods: {
    even: function(todos, index) {
      todos.filter();
    },

    addNewTodo: function() {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText,
        status: false
      });
      console.log("Added new Todo : " + this.newTodoText);
      this.newTodoText = "";
    },

    getAllTodo: function() {
      this.isWhichOne = true;
      console.log("All: " + this.todos.title + "-" + this.todos.status);
    },

    getActiveTodo: function() {
      this.isWhichOne = true;
      console.log("Active: " + this.todos.title + "-" + this.todos.status);
    },

    getCompletedTodo: function() {
      this.isWhichOne = false;
      console.log("Completed: " + this.todos.title + "-" + this.todos.status);
    }
  },
  filters: {},
  computed: {},

  created() {
    console.log("Running...");
    setTimeout(() => {
      fetch("./data.json")
        .then(res => {
          return res.json();
        })
        .then(res => {
          this.isLoading = false;
          console.log(res);
        });
    }, 1000);
  }
});
