var serverURL = "https://cs2021tododz.herokuapp.com";

var app = new Vue ({
        el:"#app",
    data:{
        todos:[
            {
                name:"Get groceries",
                description: "Go to this store blah blah",
                linkType: "Web Page",
                instructions: "https://dsudosborn.github.io",
                done: false,
                editing: false,
                assigned: new Date().toLocaleDateString(),
                updated: new Date().toLocaleDateString(),
                deadline: new Date().toLocaleDateString()
            },

        ],
        new_todo_name: "",
        new_todo_description: "",
        new_todo_instructions: "https://dsudosborn.github.io",
        new_todo_linkType: "Google Doc",
        new_todo_deadline: "",
        new_todo_assigned: "",
        new_todo_updated: "",

        },

    created: function(){
      this.getTodos();
    },

    methods:{

        addNewTask: function(){
                var new_todo = {
                    name: this.new_todo_name,
                    description: this.new_todo_description,
                    instructions: this.new_todo_instructions,
                    done: false,
                    editing: false,
                    deadline: this.new_todo_deadline,
                    assigned: this.new_todo_assigned,
                    updated: this.new_todo_updated
                };
                this.todos.unshift( new_todo );
                this.new_todo = "";
        },

        addNewTodo: function(){
            var request_body= {
                name: this.new_todo_name,
                description: this.new_todo_description,
                done: false,
                deadline: this.new_todo_deadline
            };
            fetch(`${serverURL}/todo`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(request_body)
            }).then(function(response){
                if(response.status == 400){
                    response.json().then(function(data){
                        alert(data.msg)
                    })
                }else if(response.status == 201){
                    app.new_todo_name="";
                    app.new_todo_description="";
                    app.new_todo_deadline="";
                    app.getTodos();
                }
            });

        },

        getTodos: function(){
          fetch(`${serverURL}/todo`).then(function(response){
            response.json().then(function(data){
              app.todos = data;
            })
          })
        },

        deleteTodo: function ( todo ) {
             fetch(`${serverURL}/todo/`+todo,{
                 method:"DELETE",
                 headers:{
                     "Content-Type":"application/json"
                 }
             }).then(function(){
                 app.getTodos()})

         },

        editTodo: function(todo){
          console.log("set todo.editing");
            this.$set(todo, "editing", true);
        },

        saveTodo: function(todo){
          var post_body= {
              name: todo.name,
              description: todo.description,
              done: todo.done,
              deadline: todo.deadline
          };
          fetch(`${serverURL}/todo` + todo._id, {
              method:"PUT",
              headers:{
                  "Content-Type":"application/json"
              },
              body:JSON.stringify(post_body)
            });
            this.$set(todo, "editing" ,false);

        },

        cancelSave: function(todo) {
            todo.editing = false;

        },

        saveList: function() {
          localStorage.setItem("LocalTaskList", JSON.stringify(todos));
        }

    }
});