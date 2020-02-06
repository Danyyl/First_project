import React from "react";
import axios from "axios";
import i18n from "i18next";

class My_service extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name:this.props.arr.name,
            inform:this.props.arr.inform,
            cost:this.props.arr.cost,
            id:this.props.arr.id,
            readonly:true,
            lng:this.props.lng,
            inf:i18n.init({
            lng: this.props.lng,
            resources: require(`./${this.props.lng}.json`)
        })
        }
        this.Delete = this.Delete.bind(this);
        this.Edit = this.Edit.bind(this);
        this.Save = this.Save.bind(this);
        this.Change = this.Change.bind(this);
    }

    Delete(){
        const answer = this.Delete_service();
        answer.then(()=>{alert("Done")}, ()=>{alert("Mistake")});
        this.props.func();
    }

    async Delete_service(){
     const response1 = await axios({
          method: 'delete',
          url: 'http://localhost:8000/user/service/',
          headers: {
              "content-type": "application/json",
               "authorization": 'Bearer ' + localStorage.getItem('asset'),
          },
          data: {
              "id": this.state.id,
          }
      });

  }

    Edit(e){
        if(this.state.readonly === true){
            this.setState({readonly:false});
        }
        else{
            this.setState({readonly:true});
        }
    }

    Save(){
        const answer = this.Save_service();
        console.log(answer);
    }

     async Save_service() {

      const response1 = await axios({
          method: 'put',
          url: 'http://localhost:8000/user/service/',
          headers: {
              "content-type": "application/json",
               "authorization": 'Bearer ' + localStorage.getItem('asset'),
          },
          data: {
              "id": this.state.id,
              "name": this.state.name,
              "info": this.state.inform,
              "cost": this.state.cost,
          }
      });
      this.props.func();
  }
     Change(e){
          if(e.target.id === "name") {
            this.setState({name: e.target.value});
        }

        if(e.target.id === "cost") {
            this.setState({cost: e.target.value});
        }

        if(e.target.id === "info") {
            this.setState({inform: e.target.value});
        }

    }

    render(){
        return(
            <div className='contentdiv'>
                <div className='item_block'>
                 <h1>{i18n.t('name')}</h1>
               <input value={this.state.name} id="name" name="name" type="text"  readOnly={this.state.readonly} onChange={this.Change} />
                </div>
               <div className='item_block'>
                <h1>{i18n.t('info')}</h1>
               <input value={this.state.inform} id="info" name="info" type="text"  readOnly={this.state.readonly} onChange={this.Change} />
               </div>
               <div className='item_block'>
                <h1>{i18n.t('cost')}</h1>
               <input value={this.state.cost} id="cost" name="cost" type="number"  readOnly={this.state.readonly} onChange={this.Change} />
               </div>
                <div className='item_block' style={{textAlign:'right'}}>
                <button id = "edit" onClick={this.Edit}>{i18n.t('edit')}</button>

               <button id = "save" onClick={this.Save}>{i18n.t('save')}</button>

               <button id = "delete" onClick={this.Delete}>{i18n.t('delete')}</button>
                </div>
            </div>
        )
    }

}
export default My_service;