import React, {Component} from "react";
import {withRouter} from 'react-router';
import {Link} from "react-router-dom";
import {Comment} from "../CommentsCard/Comment";
import {ForCard} from '../../downloading/forCard/forCard'
import './PostCardStyle.css'


export class PostCardComponent extends Component{
    state = {
        isOpen: false,
        author: '',
        idAuthor: '',
        postId: '',
        comments: [],
        downloading: false
    };
    componentDidMount() {
        this.getAuthot();
        this.getCommetns()
    }

    getAuthot = async ()=>{
        await this.setId();
        await fetch(`https://jsonplaceholder.typicode.com/users/${this.state.idAuthor}`)
            .then(respons => respons.json())
            .then(json => this.setState({author: json}))
};

    getCommetns = async ()=>{
        this.setState({
            downloading: true
        });
        await this.setIdPost();
        await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${this.state.postId}`)
            .then(respons => respons.json())
            .then(json => this.setState({comments: json, downloading: false }))

    };

setId = ()=>{
        const {post: {userId} } = this.props;
    this.setState({
        idAuthor: userId
    })
};
setIdPost = ()=>{
        const {post: {id} } = this.props;
        this.setState({
            postId: id
        })
    };
toogle = ()=>{
    this.setState({
        isOpen: !this.state.isOpen
    })
}
    render() {
        const {post, match: {url}} = this.props;
        if (!post) return null;
        const {author,comments, isOpen, downloading} = this.state;
        const {title, body, userId} = post;
        return(
            <div  className="card text-white bg-dark mb-3 align-self-center  w-100 myStyle">
                <div className='align-self-center'>
                    <img src={`http://placeimg.com/500/250/${Math.random()*100}`} alt="Card image cap"/>
                </div>

                <div className="card-body flex-column">
                    <div className="card-title align-self-center">
                        <h3> {title}</h3>
                    </div>
                    <h6 className="card-subtitle mb-2 text-muted"></h6>

                    <p className="card-text">
                        {body}
                    </p>
                    <div>{userId}
                    <Link to={`/users/${author.id}`}>{author.name}</Link></div>
                    {downloading && <ForCard/>}
                    {!downloading && !!comments.length && <button onClick={this.toogle} className='btn btn-secondary'>
                        {isOpen? 'hide commetns': 'show comments'}
                    </button>}
                    {isOpen && comments.map(comment => <Comment comment={comment} key={comment.id}/>)
                    }
                </div>
            </div>
        );
    }
}
export const PostCard = withRouter(PostCardComponent);