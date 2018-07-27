import React, { Component } from 'react';
import { Grid, Popup, Segment,Container, Button, Header } from 'semantic-ui-react'

class Routes extends Component{
    constructor(props){
        super(props);
        this.state = {
            ref: [],
            des: [],
            url: String,
            clicks: String
        }
        this.handleClick = this.handleClick.bind(this);
    }
    getRoute(url){
        fetch('/route/'+url+'/'+this.props.date)
        .then(res => res.json())
        .then((Route) => {
            var refdata = [];
            var desdata = [];
            Route[0].ref.forEach(item => {
                refdata.push({ref: item.ref, times: item.times}); 
            });
            Route[0].des.forEach(item => {
                desdata.push({des: item.des, times: item.times}); 
            });
            this.setState({ ref: refdata, des: desdata, url:  url});
        });
    }
    handleClick(url){
        this.getRoute(url);
        fetch('/specific/'+url+'/'+this.props.date)
        .then(res => res.json())
        .then(Specific => this.setState({ clicks:  Specific[0].clicktimes}));
    }
    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if(anchorElement) { anchorElement.scrollIntoView({behavior: 'auto', block: 'start'}); }
        }
    }
    render(){
        return(     
            <Popup position='bottom left'
                trigger={<div align="center"><h3 onClick={() => this.scrollToAnchor(this.props.url)} >{this.props.url}</h3></div>}
                on='click'
                onOpen={()=>{
                    this.getRoute(this.props.url);
                    this.setState({clicks: this.props.clicks});
                }}
                flowing
            >  
            <Container >
                <Grid columns={3}>
                    <Grid.Column >
                        <Segment vertical textAlign='center'><Header as='h2' color='blue'>Before</Header></Segment>
                        {this.state.ref.map(ref =>
                        <Segment textAlign='center' vertical key={ref.ref}>
                            <Button
                                color='blue'
                                content={ref.ref}
                                onClick={() => this.handleClick(ref.ref)}
                                icon='chain'
                                label={{ as: 'a', basic: true, color: 'blue', content: ref.times }}
                                labelPosition='right'
                            />
                        </Segment>
                        )}    
                    </Grid.Column>
                    <Grid.Column verticalAlign="middle" textAlign="center">
                        <Segment textAlign="center" inverted Raised>
                            <Header   
                                as='h3' 
                                content={this.state.url}
                                inverted
                                subheader={this.state.clicks}                     
                            />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column >
                        <Segment vertical textAlign='center'><Header as='h2' color='red'>After</Header></Segment>
                        {this.state.des.map(des =>
                            <Segment textAlign='center' vertical key={des.des}>
                                <Button
                                    color='red'
                                    content={des.des}
                                    onClick={() => this.handleClick(des.des)}
                                    icon='chain'
                                    label={{ as: 'a', basic: true, color: 'red', content: des.times }}
                                    labelPosition='right'
                                />
                            </Segment>
                        )}    
                    </Grid.Column>
                </Grid>
                </Container>
            </Popup>
        );
    }
}
export default Routes;
