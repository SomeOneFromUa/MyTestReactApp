import React, {Component} from "react";
import {TodoCard} from "../Cards/TodoCard/TodoCard";

export class MyTodo extends Component{
    state = {
        MyOwnTodos: [],
        text: '',
        checked: false,
        curID: null
    };
    componentDidMount() {
        const {myTodos} =  this.props;
        this.setState({MyOwnTodos: [...myTodos]})
    }
    onType = (event)=>{
        this.setState({
            text: event.target.value
        })
    };
    onCheck = (event)=>{
        this.setState({
            checked: event.target.checked
        })
    };
    onSubmit = (event)=>{
        event.preventDefault();

        const {text, checked,curID, MyOwnTodos} = this.state;

        // debugger
        //
        // if (MyOwnTodos.some(value => value.id === curID )){
        //
        //     let newArr = [...MyOwnTodos];
        //     newArr.splice(MyOwnTodos.findIndex(value => value.id === curID),1);
        //     this.setState({
        //         MyOwnTodos: newArr
        //     })
        //     console.log(this.state.MyOwnTodos);
        // }
        const newTodo = {
            title: text,
            completed: checked,
            id: curID || Math.floor(Math.random()*100)
        };
        this.setState({
            MyOwnTodos: [newTodo, ...this.state.MyOwnTodos],
            text: '',
            checked: false,
            curID: null
        })


    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state.MyOwnTodos);

    }
    EditFoo = (object)=>{
        const {id, title,completed} = object;
        this.setState({
            text: title,
            checked: completed,
            curID: id
        })
        const {MyOwnTodos} = this.state;
        if (MyOwnTodos.some(value => value.id === id)){
            let newArr = [...MyOwnTodos];
            newArr.splice(MyOwnTodos.findIndex(value => value.id === id),1);
            this.setState({
                MyOwnTodos: newArr
            })
        }
    };

    render() {

        const {text, MyOwnTodos, checked} = this.state;
        return(
            <div className='container d-flex flex-wrap'>
               <div className="card">
                   <form onSubmit={this.onSubmit}>
                       <div className="form-group">
                           <label htmlFor="formGroupExampleInput">to do:</label>
                           <input type="text" className="form-control" id="formGroupExampleInput"
                                  placeholder="Example input" value={text} onChange={this.onType} />
                       </div>
                       <div className="form-check">
                           <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={this.onCheck} checked={checked}/>
                               <label className="form-check-label" htmlFor="defaultCheck1">
                                   competed
                               </label>
                               </div>
                       <button className='btn btn-secondary' type="submit">submit</button>
                   </form>
               </div>
                {MyOwnTodos.map(todo => <TodoCard todo={todo} key={todo.id} edit={true} editFoo={this.EditFoo}/>)}
            </div>
        );
    }
}