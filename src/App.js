import React, {Component} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {UserList} from "./Components/UserList-page/UserList";
import {Header} from "./Components/header/HeaderFromLecture";
import {Footer} from "./Components/footer/Footer";
import {UserPage} from "./Components/User-page/UserPage";
import {PostList} from "./Components/PostList-page/PostListPage";
import {AgendaListPage} from "./Components/AgendaList-Page/AgendaListPage";
import {MyTodo} from './Components/AgendaList-Page/MyTodo'
import {PostPreview} from "./Components/PostPreview-Page/PostPreview";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';






class App extends Component {
    state = {
        arr: []
    };

    handler = (arr)=>{
        this.setState({
            arr: arr,
        })
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state.arr);
    }

    render() {
        const  {arr} = this.state;
        return (
            <div className='container-fluid'>
                <Router>
                    <Header flag={arr.length}/>
                    <Switch>
                        <Route path="/users/" exact
                               render={(routerProps) => {
                                   return (<UserList {...routerProps} />);
                               }}
                        />
                        <Route path="/users/:id"
                               render={(routerProps) => {
                                   return (<UserPage {...routerProps} />);
                               }}
                        />
                        <Route path="/posts/" exact
                               render={(routerProps) => {
                                   return (<PostList {...routerProps} />);
                               }}
                        />
                        <Route path="/agenda/" exact
                               render={(routerProps) => {
                                   return (<AgendaListPage {...routerProps} handler={this.handler} />);
                               }}
                        />

                        <Route path="/myTodo/" exact
                               render={(routerProps) => {
                                   return (<MyTodo {...routerProps} myTodos={arr} />);
                               }}
                        />
                        <Route path='/Post-preview/' exact component={PostPreview}/>
                    </Switch>
                    <Footer/>
                </Router>
            </div>
        );
    }


}

export default App;
