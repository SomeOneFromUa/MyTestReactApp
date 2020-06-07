import React, {Component} from "react";
import {UserCard} from "../Cards/UserCard/UserCard";


export class UserList extends Component{
state = {
    users: null,
    isDownloading: false,
    isDownloaded: false,
    error: ''
};
    componentDidMount() {
    this.fetchUsers();
    }
    fetchUsers = async ()=>{
        this.setState({isDownloading: true});
        const resposne = await fetch('https://jsonplaceholder.typicode.com/users');
        let json = await resposne.json();
        if (json && Array.isArray(json)) {
            this.setState({
                users: json,
                isDownloading: false,
                isDownloaded: true,
            })
        }else this.setState({
            error: 'something went wrong',
            isDownloading: false,
        })
    };



    render() {
        console.log(this.props);
        const {users, error, isDownloading, isDownloaded} = this.state;
        return(
            <div className='container d-flex flex-wrap'>
                {isDownloading && <h6>Downloading...</h6>}
                {!!error && <div>{error}</div>}
                {!isDownloading && !error && isDownloaded &&users.map(user => <UserCard flag={false} user={user} key={user.id}/>)}
            </div>
        );
    }
}
