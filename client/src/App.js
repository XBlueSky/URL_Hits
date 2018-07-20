import React, { Component } from 'react';
import TabList from './TabList.js'
import { Sticky, Rail, Segment, Grid } from 'semantic-ui-react'
import Calendar from 'react-calendar'

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
            <div>
                 <Grid>
                    <Grid.Row>
                        <Grid.Column width={13}>
                <div ref={this.handleContextRef}>
                    <TabList date={time} />
                </div>
                </Grid.Column>
                <Grid.Column width={3}>
                <Rail attached internal position='right'>
                    <Sticky context={this.state.contextRef}>
                        <Segment>
                            <Calendar
                                onChange={this.onChange}
                                value={this.state.date}
                            />
                        </Segment>
                    </Sticky>
                </Rail> 
                </Grid.Column>
                </Grid.Row>
                </Grid>
            </div>
        );
    }
} 
export default App;
