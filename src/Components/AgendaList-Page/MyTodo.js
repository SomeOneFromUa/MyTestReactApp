import React, {Component} from "react";
import {TodoCard} from "../Cards/TodoCard/TodoCard";
import './styleAgenda.css'

export class MyTodo extends Component{
    state = {
        MyOwnTodos: [],
        text: '',
        checked: false,
        curID: null,
        curEditTodo: null
    };
    componentDidMount() {
        const {myTodos} =  this.props;
        this.setState({MyOwnTodos: [...myTodos]})
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state.MyOwnTodos);

    }


    //хендлю дані з форми:
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

    //збереження данних
    onSubmit = (event)=>{
        event.preventDefault();
        const {text, checked,curID} = this.state;
        const newTodo = {
            title: text,
            completed: checked,
            id: curID || Math.floor(Math.random()*100)
        };
        this.setState({
            MyOwnTodos: [newTodo, ...this.state.MyOwnTodos],
            text: '',
            checked: false,
            curID: null,
            curEditTodo: null
        })
    };


    //Функція кнопки edit
    EditFunc = (object)=>{
        //записую данні в стейт і вони автоматично засетаються в форму
        const {id, title,completed} = object;
        this.setState({
            text: title,
            checked: completed,
            curID: id,
            curEditTodo: object

        });
        //видалення із стейту об`єкту який редагується
        const {MyOwnTodos} = this.state;
            let newArr = [...MyOwnTodos];
            newArr.splice(MyOwnTodos.findIndex(value => value.id === id),1);
            this.setState({
                MyOwnTodos: newArr
            })
    };

    DelFunc = (id)=>{
        const {MyOwnTodos} = this.state;
        let newArr = [...MyOwnTodos];
        newArr.splice(MyOwnTodos.findIndex(value => value.id === id),1);
        this.setState({
            MyOwnTodos: newArr
        })
    };

    render() {

        const {text, MyOwnTodos, checked, curEditTodo} = this.state;
        return(
            <div className='container '>
                <div className='row justify-content-start bg-secondary'>
               <div className="card formCard bg-dark">

                   <form onSubmit={this.onSubmit}>

                       <div className="form-group">
                           <label htmlFor="formGroupExampleInput">to do:</label>
                           <input type="text"
                                  className="form-control"
                                  id="formGroupExampleInput"
                                  placeholder="Example input"
                                  value={text}
                                  onChange={this.onType}
                                  required/>
                       </div>

                       <div className="form-check">
                           <input className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="defaultCheck1"
                                  onChange={this.onCheck}
                                  checked={checked}/>
                               <label className="form-check-label"
                                      htmlFor="defaultCheck1">
                                   competed
                               </label>
                               </div>
                       <button className='btn btn-secondary' type="submit">submit</button>
                   </form>

               </div>

                        {!!curEditTodo &&  <TodoCard todo={curEditTodo} edit={false} />}

                </div>

                <div className='row bg-light'>
                {MyOwnTodos.map(todo => <TodoCard todo={todo}
                                                  key={todo.id}
                                                  edit={true}
                                                  editFunc={this.EditFunc}
                                                  delFunc={this.DelFunc}/>)}
            </div>
            </div>
        );
    }
}