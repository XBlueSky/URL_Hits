import React, { Component } from 'react';
import TabList from './TabList.js'
import { Segment } from 'semantic-ui-react'
import Calendar from 'react-calendar'
import Slider from 'react-viewport-slider';

function pad(n) {return n < 10 ? "0"+n : n;}

class App extends Component{
    state = {
        date: new Date(),
        contextRef: {}
    }
    onChange = date => this.setState({ date: date })
    handleContextRef = contextRef => this.setState({ contextRef: contextRef })
    render(){
        var time = this.state.date.getFullYear().toString()+pad(this.state.date.getMonth()+1)+pad(this.state.date.getDate());
        return(
            <Slider>
                <Slider.Item style={{ backgroundColor: '#a2d7c7' }}>
                    <div className="title">URL Hits.</div>
                </Slider.Item>
                <Slider.Item style={{ backgroundColor: '#353330' }}>
                    <Segment>
                        <Calendar
                            onChange={this.onChange}
                            value={this.state.date}
                        />
                    </Segment>
                    <div className="content">Choose Day You Like?</div>
                </Slider.Item>
                <div  style={{ backgroundColor: '#F4F1BB', height: '100vh',  margin: 0 }} ref={this.handleContextRef}>
                    <TabList date={time} />
                </div>
            </Slider>
        );
    }
} 
export default App;
