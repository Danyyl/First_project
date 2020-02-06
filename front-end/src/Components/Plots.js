import React from "react";
import axios from "axios";
import Plot from "./Plot";
import i18n from "i18next";

class Plots extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            content:[],
             lng:this.props.lng,
            inf:i18n.init({
            lng: this.props.lng,
            resources: require(`./${this.props.lng}.json`)
        })
        };
       const response = this.get_plots(); // TODO
       this.Add = this.Add.bind(this);
       this.get_plots = this.get_plots.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.lng !== this.props.lng) {
            const response = this.get_plots();
        }
    }

    Add(){
        const answer = this.Add_plot();
        answer.then(()=>{alert("Done"); const response = this.get_plots(); },()=>{alert("Mistake")});
    }  // TODO

    async Add_plot(){
        const response1 = await axios({
          method: 'post',
          url: 'http://localhost:8000/user/plots/',
          headers: {
              "content-type": "application/json",
               "authorization": 'Bearer ' + localStorage.getItem('asset'),
          },
          data: {
              "place": "10 50",
              "type": "",
              "field": false,
              "culture": "",
          }
      });
    }

    async get_plots(){
        const config = {
           headers: {
               "access-control-allow-origin": "*",
               "authorization": 'Bearer ' + localStorage.getItem('asset'),
           }
       };
        const response = await axios.get("http://localhost:8000/user/plots/", config);
        var arr_temp = [];
        for(var i = 0; i < response.data.length; ++i){
            response.data[i].place = response.data[i].place.split(' ').map(a => +a);
            response.data[i].placex = response.data[i].place[0];
            response.data[i].placey = response.data[i].place[1];
            arr_temp.push(<Plot arr = {response.data[i]} func = {this.get_plots} lng = {this.props.lng}/>)
        }
        this.setState({content:arr_temp})
    }


    render(){
        return(
            <div className='content_div'>
                {this.state.content}
                <button id = 'add' onClick={this.Add}  style={{width:'200px',  marginLeft:'900px', marginTop:'50px', marginBottom:'50px'}}>{i18n.t('Add')}</button>
            </div>
        )
    }
}
export default Plots;