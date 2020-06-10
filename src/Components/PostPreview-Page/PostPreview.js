import React, {Component} from "react";
import {MenuPosts} from "./MenuPosts";
import {PostCard} from "../Cards/PostCard/PostCard";
import {ForPage} from "../downloading/forPage/forPage";
import './style.css'

export class PostPreview extends Component{
    state = {
        posts: [],
        Downloadin: false,
        curPostId: '',
        curPost: {},
        error: ''
    };
    componentDidMount() {
        this.fetchPosts()

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.curPostId !== this.state.curPostId) {
            this.setState({
                curPost: this.state.posts.find(post => post.id === this.state.curPostId)
            })
        }else return
    }

    fetchPosts = async ()=>{
        this.setState({
            Downloadin: true
        });
       let response =  await fetch('https://jsonplaceholder.typicode.com/posts');
       if (response.ok) {
           let json = await response.json();

           if (Array.isArray(json)){
               this.setState({
                   posts:json,
                   Downloadin: false,
                   curPostId: json[0].id,
                   curPost: json[0]
               });

           }
       }

    };
    setCurPost = (id)=>{
        this.setState({
            curPostId: id
        })
    };

    render() {
        const {posts,curPostId, curPost, Downloadin} = this.state;
        return(
            <div className='d-flex '>
                <div className='w-25'>
                    {Downloadin && <ForPage/>}
                        {!Downloadin && <MenuPosts posts={posts} onSelect={this.setCurPost} selected={curPostId}/>}
                </div>
                <div className='w-50 pos'>
                    {Downloadin && <div>Loading...</div>}
                    {!Downloadin && <PostCard post={curPost}/>}
                </div>
            </div>
        );
    }
}