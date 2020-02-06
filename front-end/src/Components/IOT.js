import React from "react";
import axios from "axios";
import i18n from "i18next";

class IOT extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "",
            inform: "",
        };
        this.Send = this.Send.bind(this);
        this.Send_ = this.Send_.bind(this)
    }


    componentDidMount() {
        setInterval(() => this.Get_ing(), 1000);
        //this.Get_ing();
    }


    async Get_ing(){
        const response = await axios({
          method: 'get',
          url: 'http://localhost:8080/get_inf/',
          headers: {
              "content-type": "application/json",
          },
      });
        this.setState({inform:response.data})
    }

    Send(e){
        if(e.target.id === 'ok'){
            //this.setState({status:'Done'});
            const responce = this.Send_('Done');
            responce.then(()=>{}, ()=>{alert("Mistake")})
        }
        else{
            //this.setState({status:'Mistake'});
            const responce = this.Send_('Mistake');
            responce.then(()=>{}, ()=>{alert("Mistake")})
        }

    }

   async Send_(temp){
        const response = await axios({
          method: 'post',
          url: 'http://localhost:8080/iot/',
          headers: {
              "content-type": "application/json",
              "authorization": 'Bearer ' + localStorage.getItem('asset'),
          },
          data: {
              "status": temp,
          }
      });
    }

    render() {
        return(
            <div>
                <h1>{this.state.inform}</h1>
                <button id="ok" onClick={this.Send} style={{marginTop:'250px', width:'200px', height:'100px'}}> Okey </button>
                <button id="mistake" onClick={this.Send} style={{marginTop:'250px', width:'200px', height:'100px'}}> Mistake </button>
            </div>
        )
    }
}
export default IOT;