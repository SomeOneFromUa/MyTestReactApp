import React, {Component} from "react";
import {UserCard} from "../Cards/UserCard/UserCard";
import { withRouter } from 'react-router';
import {PostList} from "../PostList-page/PostListPage";


export class UserPageComponent extends Component{
    state = {
        user: null,
        isDownloading: false,
        isDownloaded: false,
        error: ''
    };
    componentDidMount() {
        this.fetchUsers();
        this.fetchPosts();
    }
    fetchUsers = async ()=>{
        const {match: {params: {id}}} = this.props;
        this.setState({isDownloading: true});
        const resposne = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        let json = await resposne.json();
        if (typeof json === 'object') {
            this.setState({
                user: json,
                isDownloading: false,
                isDownloaded: true,
            })
        }else this.setState({
            error: 'something went wrong',
            isDownloading: false,
        })
    };
    fetchPosts = ()=>{
        return null
    };


    render() {
        const {user, error, isDownloading, isDownloaded} = this.state;

        return(
            <div className='container d-flex '>
                {isDownloading && <h6>Downloading...</h6>}
                {!!error && <div>{error}</div>}
                {!isDownloading && !error && isDownloaded && [
                <UserCard flag={true} user={user}/>,
                <PostList id={user.id} style='flex-column align-items-center'/>
                    ]}
            </div>
        );
    }
}
export const UserPage = withRouter(UserPageComponent);