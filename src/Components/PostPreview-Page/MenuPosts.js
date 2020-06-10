import React, {Component} from "react";

export class MenuPosts extends Component{
    onSelect = (id)=>{
        window.scroll(0,0);
       const {onSelect} =  this.props;
       return ()=>{
           onSelect && onSelect(id)
       };

    };

    render() {
        const {posts, selected} = this.props;
        return(
            <ul className="list-group">
                {posts.map(post => {
                    return  <li href='#top' className={`list-group-item itemPosts ${selected === post.id? 'active': ''}`} key={post.id} onClick={this.onSelect(post.id)}>{post.title}</li>
                })}
            </ul>

        );
    }
}