import React, {Component} from "react";



export class TodoCard extends Component{
    state = {
        isChacked: false
    };

    ///
    setCard = ()=>{
        this.toogle();
        const {todo, func} = this.props;
         return func(todo)

    };

//це ефект для AgendaListPage
toogle = ()=>{
    this.setState({
        isChacked: !this.state.isChacked
    })
};

//для MyTodo
onEdit = ()=>{
    const {editFunc, todo} = this.props;
    return editFunc(todo)
};
onDel = ()=>{
    const {delFunc, todo} = this.props;
    return delFunc(todo.id)
};


    render() {
        const {isChacked} = this.state;
        const {todo, flag, edit} = this.props;
        const {id, title, completed} = todo;
        return (
            <div
                className={`card ${completed? 'text-white bg-primary': 'text-white bg-dark'} w-25 `}
            >
                    <div className="card-body">
                        <h4 className="card-title">{id}</h4>
                        <p className="card-text">{title}</p>
                        <p>{completed? 'complete': 'not complete'}</p>

                        {/*це AgendaListPage*/}
                        {flag && <button className={isChacked? 'btn btn-success': 'btn btn-light'}
                                         onClick={this.setCard}>
                            {isChacked? 'chacked': 'check'}
                        </button>}

                        {/*для MyTodo*/}
                        {edit && [
                            <button className='btn btn-info text-white'
                                    onClick={this.onEdit}>
                                edit
                            </button>,
                            <button className='btn btn-danger text-white'
                                    onClick={this.onDel}>
                                Delete
                            </button>
                        ]}
                    </div>
            </div>
        );
    }
}
