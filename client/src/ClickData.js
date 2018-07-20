import React, { Component } from 'react';
import { Table, Grid } from 'semantic-ui-react'
import PolyData from './PolyData.js'
import './ClickData.css'
import Routes from './Routes.js'

class ClickData extends Component{
    constructor(props){
        super(props);
        this.state = {
            web: [],
            url: String,
            clicks: String
        }
    }
    componentDidMount() {
        this.getWeb(this.props.text, this.props.date, null);
    }
    componentWillReceiveProps(newProps) {
        if (typeof newProps.cate === "string")  {
            if (newProps.cate === "All")
                this.getWeb(newProps.text, newProps.date, null);
            else if(newProps.cate === "Other")
                this.getWeb(newProps.text, newProps.date, 'null');
            else
                this.getWeb(newProps.text, newProps.date, newProps.cate);
        }else{
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
    render(){
        return(
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Table  color='teal' celled striped size='large' collapsing>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell><h2>Rank</h2></Table.HeaderCell>
                                    <Table.HeaderCell><h2>URL</h2></Table.HeaderCell>
                                    { this.props.text === "month" ? (
                                        <Table.HeaderCell><h2>Clicks</h2></Table.HeaderCell>
                                    ) : null }
                                    <Table.HeaderCell><h2>Category</h2></Table.HeaderCell>
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
                                    { this.props.text === "month" ? (
                                        <Table.Cell><h3>{ web.category !== null ? web.category : 'Other' }</h3></Table.Cell>
                                    ) : null }
                                    
                                </Table.Row>
                            )}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
export default ClickData;
