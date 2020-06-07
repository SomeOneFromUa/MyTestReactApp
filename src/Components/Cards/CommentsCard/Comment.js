import React, {Component} from "react";


export class Comment extends Component{

    render() {
        const {comment} = this.props;
        const {email, body, name} = comment;
        return (
            <div className="card text-dark">
                    <div className="card-body">
                        <h4 className="card-title">{name}</h4>
                        <p className="card-text">
                          {body}
                        </p>
                        <div className='card-subtitle' >{email}</div>
                    </div>
            </div>
        );
    }
}