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

    render() {
        const {isChacked} = this.state;
        const {todo, foo, flag} = this.props;
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
                    </div>
            </div>
        );
    }
}
