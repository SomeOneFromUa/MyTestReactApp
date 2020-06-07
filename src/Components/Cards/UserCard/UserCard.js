import React, {Component} from "react";
import {withRouter} from 'react-router';
import {Link} from "react-router-dom";
import './UserCardStyle.css'


export class UserCardComponent extends Component{
    state = {
        isOpen: false
    };
    toogle = ()=>{
        this.setState({isOpen: !this.state.isOpen})
    };

    render() {
         const {user, flag, match: {url}} = this.props;
         const {isOpen} = this.state;
         console.log(this.props);
         const {name,
                username,
                email,
                address: {street, suite, city, zipcode},
                phone, website,
                company: {name: companyName, catchPhrase, bs}
         } = user;
        return(
            <div className={`card text-white bg-dark mb-3  justify-content-center myStyle ${flag? 'w-50': 'w-25'}`}>
                <div className='align-self-center'>
                <img className="rounded-circle"  src={`http://placeimg.com/200/200/${Math.random()*100}`} alt="Card image cap"/>
                </div>
                <div className="card-title align-self-center">
                   <h2> {username}</h2>
                </div>
                    <div className="card-body">
                        <h4 className="card-title">{name}</h4>
                        <h6 className="card-subtitle mb-2 text-muted">{email}</h6>


                        {isOpen && <div>
                            <li className="list-group-item text-white bg-dark">Phone: {phone}</li>
                            <li className="list-group-item text-white bg-dark">Website: {website}</li>
                            <li className="list-group-item text-white bg-dark">Company: {companyName}</li>
                            <li className="list-group-item text-white bg-dark">Address: {street},{suite},{city},{zipcode}</li>
                            <li className="list-group-item text-white bg-dark">Company: {companyName},{suite},{city},{zipcode}</li>
                        </div>
                        }
                        {flag &&  <button className='btn btn-secondary' onClick={this.toogle}>{isOpen? 'hide': 'show'}</button>}
                        <div className='align-self-center'>
                        {!flag &&  <Link to={`${url}/${user.id}`}>personal page</Link>}
                        </div>
                    </div>
            </div>
        );
    }
}
export const UserCard = withRouter(UserCardComponent);