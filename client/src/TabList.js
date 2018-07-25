import React, { Component } from 'react';
import ClickData from './ClickData.js'
import { Tab, Container } from 'semantic-ui-react'

class TabList extends Component{
    render(){
        return(
            <Container>
                <Tab menu={{ size: 'massive', color: 'teal', secondary: true, pointing: true }} panes={
                    [
                        { menuItem: 'Day',  render: () => <Tab.Pane><ClickData  text="day" date={this.props.date}/> </Tab.Pane> },
                        { menuItem: 'Week',  render: () => <Tab.Pane><ClickData  text="week" date={this.props.date}/></Tab.Pane> },
                        { menuItem: 'Month',  render: () => <Tab.Pane><ClickData  text="month" date={this.props.date}/></Tab.Pane> },
                    ]
                }/>
            </Container>
        );
    }
}
export default TabList;
