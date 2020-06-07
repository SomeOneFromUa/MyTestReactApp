import React, {Component} from "react";
import {TodoCard} from "../Cards/TodoCard/TodoCard";

export class MyTodo extends Component{
    state = {

    };
    render() {
        const {myTodos} =  this.props;
        console.log(myTodos);
        return(
            <div className='container d-flex flex-wrap'>
                {myTodos.map(todo => <TodoCard todo={todo} key={todo.id}/>)}
            </div>
        );
    }
}