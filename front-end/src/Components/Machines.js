import React from "react";
import axios from "axios";
import Machine from "./Machine";
import i18n from "i18next";

class Machines extends React.Component{
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
       const response = this.get_machines(); // TODO
       this.Add = this.Add.bind(this);
       this.get_machines = this.get_machines.bind(this);
    }
     componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.lng !== this.props.lng) {
            const response = this.get_machines();
        }
    }
    Add(){
        const answer = this.Add_machine();
        answer.then(()=>{alert("Done"); const response = this.get_machines(); },()=>{alert("Mistake")});
    }  // TODO

    async Add_machine(){
        const response1 = await axios({
          method: 'post',
          url: 'http://localhost:8000/user/machine/',
          headers: {
              "content-type": "application/json",
               "authorization": 'Bearer ' + localStorage.getItem('asset'),
          },
          data: {
              "name": "",
              "type": "",
          }
      });
    }

    async get_machines(){
        const config = {
           headers: {
               "access-control-allow-origin": "*",
               "authorization": 'Bearer ' + localStorage.getItem('asset'),
           }
       };
        const response = await axios.get("http://localhost:8000/user/machine/", config);
        var arr_temp = [];
        for(var i = 0; i < response.data.length; ++i){
            console.log(response.data[i]);
            arr_temp.push(<Machine arr = {response.data[i]} func = {this.get_machines} lng = {this.props.lng}/>)
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
export default Machines;