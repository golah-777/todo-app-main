
class App{
  constructor(){
   this.mode = document.querySelector('#mode');
   this.boDy = document.querySelector('#body');
   this.main = document.querySelector('.main-div');
   this.createNote = document.querySelector('.create-note');
  
   this.footer = document.querySelector('#footer');
   this.input = document.querySelector('#input');
   this.tasks = document.querySelector('.tasks');

   this.number = document.querySelector('.number');

   this.all = document.querySelector('.active');
   this.active = document.querySelector('.active-tasks');
   this.completed = document.querySelector('.completed');
   this.clearCompleted = document.querySelector('.clear-completed');

   this.body = document.querySelector('#body');
  
   this.toDos = JSON.parse(localStorage.getItem('todo') || []);
   this.iD = '';

   this.toggle = false;

   this.addEventlisters();
   this.readTask();
   this.numberOfItems();
   this.cssStyles();
  }

  addEventlisters(){
   document.body.addEventListener("click",(event)=>{
    this.handleClicks(event);
    this.checkedTask(event);
    this.completedTasks(event);
    this.activeTasks(event);
    this.allTasks(event);
    this.deleteAllCompletedTask(event);
   });

   document.body.addEventListener("mouseover",(event)=>{
    this.mouseOverTask(event);
   });

   document.body.addEventListener("mouseout",(event)=>{
    this.mouseOutTask(event);
   })

    document.addEventListener('keydown', (event)=> {
      // Check if the pressed key is Enter
      if (event.key === 'Enter') {
        // Your code to handle the Enter key press goes here
        this.createTask(event);
      }
    });
  
  }

  //CRUD

  //CREATE
  
  createTask(event){
    let inputValue = this.input.value;

    if(inputValue != ''){
      const note = {
        id: cuid(),
        todo: this.input.value
      }
      this.toDos = [...this.toDos,note];
      this.input.value = '';
      localStorage.setItem('todo', JSON.stringify(this.toDos));
    }
    
    this.readTask();
    this.numberOfItems();
    this.cssStyles();
    this.allTasks(event);
    this.active.classList.remove('active');
    this.completed.classList.remove('active');
    this.all.classList.add('active');
  }

  //READ

  readTask(){
    this.tasks.innerHTML = '';
    this.toDos.map((todo)=>
     this.tasks.innerHTML += `<div class="task" id=${todo.id}>
     <div class="circle-task">
     <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"  class="check"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
     </div>
      <div class="flex">
        <span class="texts">${todo.todo}</span>
        <div class="delete">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
        </div >
      </div>
     </div>` 
    )
  }

  //DELETE
  
  deleteTodo(id){
    this.toDos = this.toDos.filter(todo=> todo.id != id);
    localStorage.setItem('todo', JSON.stringify(this.toDos));
  }

  deleteAllCompletedTask(event){
    const clear = this.clearCompleted.contains(event.target);

    if(clear){
      this.toDos = this.toDos.filter(todos => todos.marked != 'good');
      this.readTask();
      localStorage.setItem('todo', JSON.stringify(this.toDos));
    }


  }

  //CRUD END

  handleClicks(event){
    const modeClicked = this.mode.contains(event.target);

    if(modeClicked && this.toggle === false){
      this.toggle = true;
      this.mode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>`;
      this.boDy.classList.add('js-style-body');
      this.main.classList.add('js-main-div');
      this.createNote.classList.add('js-create-none-task-footer');
      this.tasks.style.background = 'white';
      this.footer.classList.add('js-create-none-task-footer');
      this.input.style.color = 'hsl(235, 21%, 11%)';
    } else if(modeClicked && this.toggle === true){
      this.toggle = false;
      this.mode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>`;
      this.boDy.classList.remove('js-style-body');
      this.main.classList.remove('js-main-div');
      this.createNote.classList.remove('js-create-none-task-footer');
      this.tasks.style.background = 'hsl(235, 24%, 19%)';
      this.footer.classList.remove('js-create-none-task-footer');
      this.input.style.color = 'aliceblue';
    }

    const deleteTodo = event.target.closest('.delete');

    const todo = event.target.closest(".task");

    if(todo && deleteTodo){
      this.deleteTodo(this.iD);
      this.readTask();
      this.numberOfItems();
      this.cssStyles();
    }
  }

  checkedTask(event){
    const todo = event.target.closest(".task");
    const deleteTodo = event.target.closest('.delete');

    if(todo && !deleteTodo){
      const id = todo.id;
      this.iD = id;

      const e = "#";
      const todoClicked = this.tasks.querySelector(e+this.iD);

      const checked = todoClicked.querySelector('.check');
      const crossed = todoClicked.querySelector('.texts');
      checked.style.display = 'inline';
      crossed.classList.add('texts-js');

      const backGround = todoClicked.querySelector('.circle-task');
      backGround.style.background = "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))";

      this.toDos.map((note)=>{
        if(this.iD === note.id){
          note.marked = 'good';
        }
      });

      localStorage.setItem('todo', JSON.stringify(this.toDos));
      this.numberOfItems();
    }
  }

  cssStyles(){
    const storedArray = JSON.parse(localStorage.getItem('todo'));
 
    storedArray.map(todo=> {
      
      if(todo.marked === 'good'){

        let e = '#';
        let element = todo.id

        const todoTasks = this.tasks.querySelector(e+element);

        const checked = todoTasks.querySelector('.check');
        const crossed = todoTasks.querySelector('.texts');
        checked.style.display = 'inline';
        crossed.classList.add('texts-js');

        const backGround = todoTasks.querySelector('.circle-task');
        backGround.style.background = "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
      }
    })
  }
  

  completedTasks(event){
    const complete = this.completed.contains(event.target);

    if(complete){
      this.completed.classList.add('active');
      this.active.classList.remove('active');
      this.all.classList.remove('active');

      const markedTodo = this.toDos.filter(items=> items.marked === 'good');

      this.tasks.innerHTML = '';
      markedTodo.forEach(todo =>{
        this.tasks.innerHTML += `<div class="task" id=${todo.id}>
        <div class="circle-task">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"  class="check"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
        </div>
          <div class="flex">
            <span class="texts">${todo.todo}</span>
            <div class="delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
            </div >
          </div>
        </div>` 
      })
      this.cssStyles();
    }
  }

  activeTasks(event){
    const active = this.active.contains(event.target);

    if(active){
      this.active.classList.add('active');
      this.completed.classList.remove('active');
      this.all.classList.remove('active');
      
      const markedTodo = this.toDos.filter(items=> !items.marked);

      this.tasks.innerHTML = '';
      markedTodo.forEach(todo =>{
        this.tasks.innerHTML += `<div class="task" id=${todo.id}>
        <div class="circle-task">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"  class="check"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
        </div>
          <div class="flex">
            <span class="texts">${todo.todo}</span>
            <div class="delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
            </div >
          </div>
        </div>` 
      })
    }
  }

  allTasks(event){
    const all = this.all.contains(event.target);

    if(all){
      this.active.classList.remove('active');
      this.completed.classList.remove('active');
      this.all.classList.add('active');
      this.readTask();
      this.cssStyles();
    }
  }

  mouseOverTask(event){
    this.task = this.tasks.querySelector('.task');
    const taskHoverd = event.target.closest('.task');

    if(taskHoverd){
      const id = taskHoverd.id
      this.iD = id;

      const e = "#";
      let todo =  this.tasks.querySelector(e + this.iD);

      this.delete = todo.querySelector('.delete');
      this.circle =  todo.querySelector('.circle-task');
       
      this.delete.style.display = 'inline';
      this.circle.style.border = '1px solid hsl(192, 100%, 67%)';
    }
  }

  mouseOutTask(event){
    this.task = this.tasks.querySelector('.task');
    const taskOut = event.target.closest('.task');

    if(taskOut){
      const id = taskOut.id
      this.iD = id;

      const e = "#";
      let todo =  this.tasks.querySelector(e + this.iD);

      this.delete = todo.querySelector('.delete');
      this.circle =  todo.querySelector('.circle-task');
       
      this.delete.style.display = 'none';
      this.circle.style.border = '1px solid hsl(233, 14%, 35%)';
    }
  }

  numberOfItems(){
    let number = [];
    this.toDos.filter(todo=>{
      if(todo.marked !='good'){
       number = [...number, todo];

       this.number.innerHTML = `${number.length} items left`;
      }
    }
    )
  }

}

const app = new App();