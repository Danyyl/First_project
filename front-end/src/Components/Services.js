import React from "react";
import axios from "axios";
import My_Service from "./My_service";
import Service from "./Service";
import Plot from "./Plot";
import i18n from "i18next";

class Services extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            my: this.props.my,
            display:this.props.display,
            inf:i18n.init({
            lng: this.props.lng,
            resources: require(`./${this.props.lng}.json`)
        })
        };
        this.getAll_Service = this.getAll_Service.bind(this);
        //this.getMy_Service = this.getMy_Service.bind(this);
        this.Add = this.Add.bind(this);
        //this.GetS = this.GetS.bind(this);
        //this.GetS();
        const answer = this.getAll_Service();
            answer.then(()=>{console.log("All Done")}, ()=>{console.log("All Mistake")});
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.lng !== this.props.lng) {
            const answer = this.getAll_Service();
            answer.then(() => {
                console.log("All Done")
            }, () => {
                console.log("All Mistake")
            });
        }

    }



    async Add(){
        const response1 = await axios({
          method: 'post',
          url: 'http://localhost:8000/user/service/',
          headers: {
              "content-type": "application/json",
               "authorization": 'Bearer ' + localStorage.getItem('asset'),
          },
          data: {
              "name": "",
              "cost": 0,
              "info": "",
          }
      });
        const answer = this.getAll_Service();
            answer.then(()=>{console.log("All Done")}, ()=>{console.log("All Mistake")});
    }




  async  getAll_Service(){
        const config = {
           headers: {
               "access-control-allow-origin": "*",
               "authorization": 'Bearer ' + localStorage.getItem('asset'),
           }
       };
        const response = await axios.get("http://localhost:8000/user/service_all/", config);
        var arr_temp = [];
        for(var i = 0; i < response.data.length; ++i){
            console.log(response.data[i]);
            response.data[i].inform = response.data[i].info;
            arr_temp.push(<Service arr = {response.data[i]} func = {this.GetS} lng = {this.props.lng}/>)
        }
        this.setState({content:arr_temp})
    }


        render(){
            return(
                <div className='content_div'>
                    {this.state.content}
                    <button id="add" onClick={this.Add} style={{display: this.state.display, width:'200px', marginLeft:'900px', marginTop:'50px', marginBottom:'50px'}}>{i18n.t('Add')}</button>
                </div>
            )
        }


}
export default Services;