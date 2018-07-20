import React , { Component }from 'react'
import { Popup } from 'semantic-ui-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

class PolyData extends Component{
    constructor(props){
        super(props);
        this.state = {poly: []}
    }

    componentDidMount(){
        fetch('/poly/'+this.props.url+'/'+this.props.date)
        .then(res => res.json())
        .then((Poly) => {
            var data = [];
            for (var i in Poly[0].clicktimes){
                data.push({ date: parseInt(i, 10)+1, clicks: Poly[0].clicktimes[i]}); 
            }
            this.setState({ poly: data })
        });
    }
    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if(anchorElement) { anchorElement.scrollIntoView({behavior: 'auto', block: 'start'}); }
        }
    }
    render(){
        return(
            <div>
                <Popup position='bottom center'
                    trigger={<div align="center"><h3 onClick={() => this.scrollToAnchor(this.props.url)}>{this.props.clicks}</h3></div>}
                    content={
                        <LineChart width={840} height={450} data={this.state.poly}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date"/>
                            <YAxis />
                            <Tooltip/>
                            <Line  dataKey="clicks" stroke="#008080" strokeWidth='3'/>
                        </LineChart>
                    }
                    on='click'
                />
            </div>
        );
    }
}
export default PolyData;
