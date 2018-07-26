import React, { Component } from 'react';
import { Table, Icon, Grid, Dropdown, Button } from 'semantic-ui-react'
import PolyData from './PolyData.js'
import Routes from './Routes.js'

class ClickData extends Component{
    constructor(props){
        super(props);
        this.state = {
            web: [],
            url: String,
            clicks: String,
            cate: [],
            value: "All"
        }
    }
    componentDidMount() {
        this.getWeb(this.props.text, this.props.date, null);
        this.getCate(this.props.date);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.text === "month"){
            this.getWeb(newProps.text, newProps.date, null);
            this.getCate(newProps.date);
        }else {
            this.getWeb(newProps.text, newProps.date, null);
        }
    }
    getWeb(text, date, cate){
        cate === null ? (
            fetch('/'+text+'/'+date)
            .then(res => res.json())
            .then(web => this.setState({ web: web }))
        ) : (
            fetch('/'+text+'/'+date+'/'+cate)
            .then(res => res.json())
            .then(web => this.setState({ web: web }))
        )
    }
    getCate(date){
        fetch('/category/'+date)
        .then(res => res.json())
        .then(Cate => {
            var cate = [];
            if (typeof Cate[0] === "undefined") cate = undefined;
            else{
                Cate[0].category.forEach(item => {
                    cate.push({key: item, value: item, text: item});
                });
                cate.push({key: "All", value: "All", text: "All"});
                cate.push({key: "Other", value: "Other", text: "Other"});
                cate.sort(function(a,b) {return (a.key > b.key) ? 1 : ((b.key > a.key) ? -1 : 0);});
            }
            this.setState({cate: cate});
        });
    }
    handleChange = (e, { value }) => {
        if (value === "All")
            this.getWeb(this.props.text, this.props.date, null);
        else if(value === "Other")
            this.getWeb(this.props.text, this.props.date, 'null');
        else
            this.getWeb(this.props.text, this.props.date, value);
    }
    render(){
        return(
            <div className='background'>
                <Table  color='teal' celled striped size='large' textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell><h2>Rank</h2></Table.HeaderCell>
                            <Table.HeaderCell><h2>URL</h2></Table.HeaderCell>
                            <Table.HeaderCell><h2>Clicks</h2></Table.HeaderCell>
                            { this.props.text === "month" && ( 
                            <Table.HeaderCell>
                                <Button.Group color='teal' size='huge'>
                                <Dropdown
                                    text="Category"
                                    button
                                    floating
                                    labeled
                                    search
                                    className='icon'
                                    icon='filter'
                                    options={this.state.cate}
                                    onChange={this.handleChange}
                                    value={this.state.value}
                                />
                                </Button.Group>
                            </Table.HeaderCell> )}
                            { this.props.text === "day" && ( <Table.HeaderCell><h2>Change</h2></Table.HeaderCell> )}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {this.state.web.map((web,index) =>
                        <Table.Row key={web.url}>
                            <Table.Cell id={web.url}><h3>{index+1}</h3></Table.Cell>
                            <Table.Cell selectable >
                                { this.props.text === "month" ? (
                                    <Routes url={web.url} clicks={web.clicktimes} date={this.props.date}/>
                                ) : (
                                    <div align="center"><h3>{web.url}</h3></div>
                                )}
                            </Table.Cell>
                            <Table.Cell selectable>
                                { this.props.text === "month" ? (
                                    <PolyData url={web.url} clicks={web.clicktimes} date={this.props.date}/>
                                ) : (
                                    <div align="center"><h3>{web.clicktimes}</h3></div>
                                )}
                            </Table.Cell>
                            { this.props.text === "month" && (
                                <Table.Cell><h3>{ web.category !== null ? web.category : 'Other' }</h3></Table.Cell>
                            )}
                            { this.props.text === "day" && (
                                <Table.Cell>{ typeof web.change === "undefined" ? (
                                    <h3>NEW</h3>
                                ) : (
                                    <Grid columns={2}>
                                        <Grid.Column textAlign='right'>
                                    {(() => {
                                        switch(true) {
                                            case (web.change < 0) :
                                                return <Icon name="caret up" size='large' color='teal'/>;
                                            case (web.change > 0):
                                                return <Icon name="caret down" size='large' color='red'/>;
                                            case (web.change === 0):
                                                return <Icon name="minus"  color='grey'/>;
                                            default:
                                                return null;
                                        }
                                    })()}
                                        </Grid.Column>
                                        <Grid.Column textAlign='left'>
                                            { web.change !== 0 && ( <h3>{Math.abs(web.change)}</h3> )}
                                        </Grid.Column>
                                    </Grid>
                                ) }</Table.Cell>
                            )}   
                        </Table.Row>
                    )}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}
export default ClickData;
