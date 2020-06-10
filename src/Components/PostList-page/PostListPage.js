import React, {Component} from "react";
import {ForPage} from "../downloading/forPage/forPage";
import {PostCard} from "../Cards/PostCard/PostCard";



export class PostList extends Component{
    state = {
        UserId: '',
        posts: null,
        isDownloading: false,
        isDownloaded: false,
        error: ''
    };
    componentDidMount() {

        this.fetchPosts();
    }
    fetchPosts = async ()=>{

        await this.setUserId();
        this.setState({isDownloading: true});
        const resposne = await fetch(`https://jsonplaceholder.typicode.com/posts${this.state.UserId}`);
        let json = await resposne.json();
        if (json && Array.isArray(json)) {
            console.log(json);
            this.setState({
                posts: json,
                isDownloading: false,
                isDownloaded: true,
            })
        }else this.setState({
            error: 'something went wrong',
            isDownloading: false,
        })


    };

setUserId = ()=>{
    const {id} = this.props;
    if (id) { this.setState({
        UserId: `?userId=${id}`
    });
    }else  this.setState({
        UserId: ''
    });


}

    render() {
        const {style} = this.props;
        const {posts, error, isDownloading, isDownloaded} = this.state;
        return(
            <div className={`${style || 'container d-flex flex-wrap'}`}>
                {isDownloading && <ForPage/>}
                {!!error && <div>{error}</div>}
                {!isDownloading && !error && isDownloaded && posts.map(post => <PostCard post={post} key={post.id}/>)}
            </div>
        );
    }
}
