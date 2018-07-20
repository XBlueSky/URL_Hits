import React, { Component } from 'react';
import ClickData from './ClickData.js'

class Button extends Component{
    constructor(props){
        super(props);
        this.state = {isButtonOn: false};
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState(prevState =>({
            isButtonOn: !prevState.isButtonOn
        }));
    }
    render(){
        return(
            <div>
                <button onClick={this.handleClick}>
                    {this.props.text}
                </button>
                <ClickData text={this.props.text} isButtonOn={this.state.isButtonOn}/>  
            </div>
        );
    }
}
export default Button;
