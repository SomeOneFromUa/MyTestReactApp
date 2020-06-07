import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { links, user } from '../../constants';
import Logo from '../../assets/react.png';

import { UserInfo } from '../user-info/UserInfoFromLecture';

import './Header.scss';

export class Header extends Component{
state = {
    isOpen: false
};
onClick = (ev)=>{
    let dataValue =  ev.target.getAttribute('data');
    if (dataValue === "My todos")
    this.setState({isOpen: false})
};
componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevProps);
    if (prevProps.flag !== this.props.flag){
        this.setState({isOpen: true})
    }else {
      return;
    }
}

    render() {
    const {isOpen}  = this.state;
    const {flag} = this.props;

    return (
        <div className="may-header navbar sticky-top">
            <img src={Logo} className="may-header-logo" />

            <div className="may-header-links-wrapper">
                {
                    links.map(item => {
                        return  (
                            <div className="nav-item d-flex flex-nowrap" key={item.url}>

                                <NavLink to={item.url} activeClassName="active" data={item.name} className="may-header-links-wrapper-link nav-link" onClick={this.onClick}>{item.name} {isOpen && item.name === "My todos" && <span className='text-danger'>new</span>}</NavLink>
                            </div>
                        )
                    })
                }
            </div>

            <UserInfo user={user} />
        </div>
    );
}


};
