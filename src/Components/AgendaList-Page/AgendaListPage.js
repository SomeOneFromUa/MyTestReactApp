import React, {Component} from "react";
import {TodoCard} from "../Cards/TodoCard/TodoCard";
import {DropDown} from "../dropdown/DropDown";

const options = ['competed first', 'completed last', 'default'];

export class AgendaListPage extends Component{
    state = {
        todos: null,
        TodoCoppy: null,
        isDownloading: false,
        isDownloaded: false,
        error: '',
        selected: options[2],
        MyOwnTodos: [],
        isAvalisable: true
    };
    componentDidMount() {
        this.fetchToDos()
    }
    fetchToDos = async ()=>{
        this.setState({
            isDownloading: true
        });
        const resposne = await fetch('http://jsonplaceholder.typicode.com/todos');
        let json = await resposne.json();
        if (json && Array.isArray(json)) {
            this.setState({
                todos: json,
                TodoCoppy: [...json],
                isDownloading: false,
                isDownloaded: true,
            })
        }else this.setState({
            error: 'something went wrong',
            isDownloading: false,
        })
    };

    onSelect = (option)=>{
        switch (option) {
            case options[0]:
            this.onfirst();
            this.setState({
                selected: options[0]
            });
            break;
            case options[1]:
                this.onLast();
                this.setState({
                    selected: options[1]
                });
                break;
            case options[2]:
                this.onDefault();
                break;
            default: break;
        }
    };
    onfirst = ()=> {
        const {todos} = this.state;
        const forFirst = todos.filter(todo => todo.completed);
        const forLast = todos.filter(todo => !todo.completed);
        this.setState({
            TodoCoppy: [...forFirst, ...forLast]
        })
    };
    onLast = ()=> {
        const {todos} = this.state;
        const forFirst = todos.filter(todo => todo.completed);
        const forLast = todos.filter(todo => !todo.completed);
        this.setState({
            TodoCoppy: [...forLast, ...forFirst]
        })
    };
    onDefault = ()=>{
        this.setState({
            selected: options[2],
            TodoCoppy: [...this.state.todos]
        })
    };
    comleted = ()=>{
        const {todos} = this.state;
        const forFirst = todos.filter(todo => todo.completed);
        this.setState({
            TodoCoppy: [...forFirst],
        })
    };
    notComleted = ()=>{
        const {todos} = this.state;
        const forLast = todos.filter(todo => !todo.completed);
        this.setState({
            TodoCoppy: [...forLast],
        })
    };

componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.state.MyOwnTodos );
}

    handlerFromList = (id)=>{
    const flag = this.state.MyOwnTodos.includes(id);
    if (flag){
        let arr = [...this.state.MyOwnTodos];
        console.log(arr);
        arr.splice(this.state.MyOwnTodos.indexOf(id),1);
        console.log(arr);
        this.setState({
            MyOwnTodos: arr
        })
    }
         // this.state.MyOwnTodos.slice(this.state.MyOwnTodos.indexOf(id),1)
         else {
             this.setState({
            MyOwnTodos: [...this.state.MyOwnTodos, id]
        })
         }

    };
    toogleBar = ()=>{
        this.setState({
            isAvalisable: !this.state.isAvalisable
        })
    };
    onSave = ()=>{
        const {MyOwnTodos} = this.state;
        const {handler} = this.props;
        this.toogleBar();

        return handler(MyOwnTodos);

    };
    render() {
        const {todos, isDownloaded, isDownloading, error, selected, TodoCoppy, MyOwnTodos, isAvalisable} = this.state;
        return(
            <div className='container'>
               <div className='navbar navbar-light bg-light'>

                   {!isAvalisable &&
                   <div className='d-flex '>
                       {!!MyOwnTodos.length &&  <h5 className='navbar-brand'>{MyOwnTodos.length}</h5>}
                       <button className='btn btn-secondary' onClick={this.onSave}>save</button>
                   </div>
                  }
                   {isAvalisable && <button className='btn btn-secondary' onClick={this.toogleBar}>check</button>}
                   {isAvalisable && [
                       <div className="btn-group" role="group" aria-label="Basic example">
                           <button type="button" className="btn btn-secondary" onClick={this.comleted}>Completed</button>
                           <button type="button" className="btn btn-secondary" onClick={this.notComleted}>Not Completed</button>
                           <button type="button" className="btn btn-secondary" onClick={this.onDefault}>default</button>
                       </div>,
                       <DropDown onSelectFoo={this.onSelect} options={options} selectedItem={selected}/>
                   ]}
               </div>
                <div className='container d-flex flex-wrap'>
                    {isDownloading && <h6>Downloading...</h6>}
                    {!!error && <div>{error}</div>}
                    {!isDownloading && !error && isDownloaded && TodoCoppy.map(todo => <TodoCard foo={this.handlerFromList} todo={todo} key={todo.id} flag={!isAvalisable}/>)}
                </div>
            </div>

        );
    }
}