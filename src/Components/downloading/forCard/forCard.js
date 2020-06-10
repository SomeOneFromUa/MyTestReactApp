import React, {Component} from "react";
import './forCardStyle.css'

export class ForCard extends Component{
    render() {
        return (
            <div className="loading">
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
            </div>
        )
    }


}