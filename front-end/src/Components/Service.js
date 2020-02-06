import React from "react";
import axios from "axios";
import i18n from "i18next";

class Service extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id:this.props.arr.id,
            name:this.props.arr.name,
            inform:this.props.arr.inform,
            cost:this.props.arr.cost,
            user:this.props.arr.user_name,
            lng:this.props.lng,
            inf:i18n.init({
            lng: this.props.lng,
            resources: require(`./${this.props.lng}.json`)
        })
        };
       this.DoOperation = this.DoOperation.bind(this);
    }

    DoOperation(){
        const answer = this.query();
        answer.then(()=>{alert("Done")}, ()=>{alert("Mistake")});
    }

    async query(){
         const response = await axios({
          method: 'post',
          url: 'http://localhost:8000/user/operationDo/',
          headers: {
              "content-type": "application/json",
               "authorization": 'Bearer ' + localStorage.getItem('asset'),
          },
          data: {
              "id": this.state.id,
              "type": "service",
          }
      });
    }


    render(){
        return(
            <div className='contentdiv'>
                <div className='item_block'>
                 <h1>{i18n.t('name')}</h1>
                <h3>{this.state.name}</h3>
                </div>
                <div className='item_block'>
                <h1>{i18n.t('info')}</h1>
               <h3>{this.state.inform}</h3>
                </div>
                <div className='item_block'>
                <h1>{i18n.t('cost')}</h1>
               <h3>{this.state.cost}</h3>
                </div>
                <div className='item_block'>
                <h1>{i18n.t('user')}</h1>
               <h3>{this.state.user}</h3>
                </div>
                <div className='item_block' >
                <button id = "DoOperation" onClick={this.DoOperation} >{i18n.t('use_service')}</button>
                </div>
            </div>
        )
    }

}
export default Service;