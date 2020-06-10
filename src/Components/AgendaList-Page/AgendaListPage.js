import React, {Component} from "react";
import {TodoCard} from "../Cards/TodoCard/TodoCard";
import {DropDown} from "../dropdown/DropDown";
import {ForPage} from "../downloading/forPage/forPage";

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
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state.MyOwnTodos );
    }
    //Стягую данні з сервера
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


/////////////сортування///////////////////////////
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
///////////////////////////////////////////////////////////////////


//////////////ф-ї кнопок/////////////////////////////////////////
    onDefault = ()=>{
        this.setState({
            selected: options[2],
            TodoCoppy: [...this.state.todos]
        })
    };
    // completed = ()=>{
    //     const {todos} = this.state;
    //     const forFirst = todos.filter(todo => todo.completed);
    //     this.setState({
    //         TodoCoppy: [...forFirst],
    //     })
    // };
    // notCompleted = ()=>{
    //     const {todos} = this.state;
    //     const forLast = todos.filter(todo => !todo.completed);
    //     this.setState({
    //         TodoCoppy: [...forLast],
    //     })
    // };
////////////////////////////////////////////////////////////////

////ф-ї які хендлять вибрані туду-шки сетають їх в стейт і пересилають на сторінку MyTodo
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
    } else {
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
        //ця ф-я прилітає з app і закидує вибрані туду-шки в його стейт
        // після чого вони прокидуються в MyTodo & header
        const {handler} = this.props;
        this.toogleBar();
        return handler(MyOwnTodos);
/////////////////////////////////////////////////////////////////////////

    };
    render() {
        const {todos, isDownloaded, isDownloading, error, selected, TodoCoppy, MyOwnTodos, isAvalisable} = this.state;
        return(
            <div className='container'>
               <div className='navbar navbar-light bg-light justify-content-end'>


                   <div className="input-group-prepend ">
                       {!!MyOwnTodos.length && !isAvalisable &&  <h5 className='input-group-text'>{MyOwnTodos.length}</h5>}
                   </div>


                      {!isAvalisable && <button className='btn btn-secondary' onClick={this.onSave}>save</button>}


                   {isAvalisable && <button className='btn btn-secondary' onClick={this.toogleBar}>check</button>}

                        <div className='align-items-end'>
                       <div className="btn-group "
                            role="group"
                            aria-label="Basic example">
                           {/*<button type="button"*/}
                           {/*        className="btn btn-secondary"*/}
                           {/*        onClick={this.completed}>*/}
                           {/*    Completed*/}
                           {/*</button>*/}
                           {/*<button type="button"*/}
                           {/*        className="btn btn-secondary"*/}
                           {/*        onClick={this.notCompleted}>*/}
                           {/*    Not Completed*/}
                           {/*</button>*/}
                           <button type="button"
                                   className="btn btn-secondary"
                                   onClick={this.onDefault}>
                               default
                           </button>
                           <DropDown onSelectFunc={this.onSelect}
                                     options={options}
                                     selectedItem={selected}/>
                       </div>
               </div>

               </div>
                <div className='container d-flex flex-wrap'>
                    {isDownloading && <ForPage/>}
                    {!!error && <div>{error}</div>}
                    {!isDownloading && !error && isDownloaded && TodoCoppy.map(todo => <TodoCard func={this.handlerFromList}
                                                                                                 todo={todo}
                                                                                                 key={todo.id}
                                                                                                 flag={!isAvalisable}/>)}
                </div>
            </div>
        );
    }
}