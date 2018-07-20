import React, { Component } from 'react';
import ClickData from './ClickData.js'
import { Tab, Dropdown, Rail, Container, Button } from 'semantic-ui-react'


class TabList extends Component{
    constructor(props){
        super(props);
        this.state = {
            cate: [],
            value: "All"
        }
    }
    componentDidMount(){
        fetch('/category/'+this.props.date)
        .then(res => res.json())
        .then(Cate => {
            var cate = [];
            Cate[0].category.forEach(item => {
                cate.push({key: item, value: item, text: item});
            });
            this.setState({cate: cate});
        });
    }
    componentWillReceiveProps(newProps) {
        fetch('/category/'+newProps.date)
        .then(res => res.json())
        .then(Cate => {
            var cate = [];
            Cate[0].category.forEach(item => {
                cate.push({key: item, value: item, text: item});
            });
            cate.push({key: "All", value: "All", text: "All"});
            cate.push({key: "Other", value: "Other", text: "Other"});
            cate.sort(function(a,b) {return (a.key > b.key) ? 1 : ((b.key > a.key) ? -1 : 0);});
            this.setState({cate: cate});
        });
    }
    handleChange = (e, { value }) => this.setState({ value: value })
    render(){
        return(
            <Container>
                <Tab menu={{ size: 'massive', color: 'teal', secondary: true, pointing: true }} panes={
                    [
                        { menuItem: 'Day', render: () => <Tab.Pane><ClickData text="day" date={this.props.date}/> </Tab.Pane> },
                        { menuItem: 'Week', render: () => <Tab.Pane><ClickData text="week" date={this.props.date}/></Tab.Pane> },
                        { menuItem: 'Month', render: () => <Tab.Pane><ClickData text="month" date={this.props.date} cate={this.state.value}/></Tab.Pane> },
                    ]
                } />
                <Rail internal position='right'>
                    <Button.Group color='teal'>
                        <Dropdown
                            text="Category"
                            button
                            search 
                            floating
                            selection
                            options={this.state.cate}
                            onChange={this.handleChange}
                            value={this.state.value}
                        />
                    </Button.Group>
                </Rail>
            </Container>
        );
    }
}
export default TabList;
