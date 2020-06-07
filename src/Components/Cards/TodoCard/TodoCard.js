import React, {Component} from "react";


export class TodoCard extends Component{
    state = {
        isChacked: false
    };
    setCard = ()=>{
        this.toogle();
        const {todo, foo} = this.props;
         return foo(todo)

    };
    toogle = ()=>{
        this.setState({
            isChacked: !this.state.isChacked
        })
    };
onEdit = ()=>{
    const {editFoo, todo} = this.props;
    return editFoo(todo)
};
    render() {
        const {isChacked} = this.state;
        const {todo, foo, flag, edit} = this.props;
        const {id, title, completed} = todo;
        return (
            <div
                className={`card ${completed? 'text-white bg-primary': 'text-white bg-dark'} w-25 `}
            >
                    <div className="card-body">
                        <h4 className="card-title">{id}</h4>
                        <p className="card-text">
                            {title}
                        </p>
                        <p>
                            {completed? 'complete': 'not complete'}
                        </p>
                        {flag && <button className={isChacked? 'btn btn-success': 'btn btn-light'} onClick={this.setCard}>{isChacked? 'chacked': 'check'}</button>}
                        {edit && <button className='btn btn-info text-white' onClick={this.onEdit}> edit </button>}
                    </div>
            </div>
        );
    }
}
