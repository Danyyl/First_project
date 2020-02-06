import React from "react";
import axios from "axios";
import i18n from "i18next";

class Machine extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id:this.props.arr.id,
            name:this.props.arr.name,
            type:this.props.arr.type,
            progress:'free',
            readonly:true,
            display:'block',
             lng:this.props.lng,
            inf:i18n.init({
            lng: this.props.lng,
            resources: require(`./${this.props.lng}.json`),
            task: ".",
        })
        };
        this.Edit = this.Edit.bind(this);
        this.Save = this.Save.bind(this);
        this.Delete = this.Delete.bind(this);
        this.DoOperation = this.DoOperation.bind(this);
        this.Change = this.Change.bind(this);
    }

    Change(e){
          if(e.target.id === "name") {
            this.setState({name: e.target.value});
        }

        if(e.target.id === "type") {
            this.setState({type: e.target.value});
        }

        if(e.target.id === "task") {
            this.setState({task: e.target.value});
        }

    }

    Edit(e){
        if(this.state.readonly === true){
            this.setState({readonly:false});
        }
        else{
            this.setState({readonly:true});
        }
    }

     Delete(){
        const answer = this.Delete_machine();
        answer.then(()=>{alert("Done")}, ()=>{alert("Mistake")});
        this.props.func();
    }

    async Delete_machine(){
     const response1 = await axios({
          method: 'delete',
          url: 'http://localhost:8000/user/machine/',
          headers: {
              "content-type": "application/json",
               "authorization": 'Bearer ' + localStorage.getItem('asset'),
          },
          data: {
              "id": this.state.id,
          }
      });

  }

   Save(){
        const answer = this.Save_machine();
        console.log(answer);
        answer.then(()=>{alert("Done")}, ()=>{alert("Mistake")});
    }

     async Save_machine() {

      const response1 = await axios({
          method: 'put',
          url: 'http://localhost:8000/user/machine/',
          headers: {
              "content-type": "application/json",
               "authorization": 'Bearer ' + localStorage.getItem('asset'),
          },
          data: {
              "id": this.state.id,
              "name":this.state.name,
              "type":this.state.type,
          }
      });
      this.props.func();
  }

  DoOperation(){
    this.setState({display:'none', progress:'in progress'});
    const answer = this.Do();
    answer.then(()=>{this.setState({display:'block', progress:'free', task:""});}, ()=>{alert('Mistake'); this.setState({display:'block', progress:'free'});})
    }

  async Do() {
      const response = await axios({
          method: 'post',
          url: 'http://localhost:8000/user/machine_do/',
          headers: {
              "content-type": "application/json",
              "authorization": 'Bearer ' + localStorage.getItem('asset'),
          },
          data: {
              "id": this.state.id,
              "questions": this.state.task,
          }
      });
      alert(response.data);
  }



    render(){
        return(
            <div className='contentdiv'>
                <div className='item_block'>
                <h1>{i18n.t('name')}</h1>
               <input value={this.state.name} id="name" name="name" type="text"  readOnly={this.state.readonly} onChange={this.Change} />
                </div>

               <div className='item_block'>
                <h1>{i18n.t('type')}</h1>
               <input value={this.state.type} id="type" name="type" type="text"  readOnly={this.state.readonly} onChange={this.Change} />
               </div>

               <div className='item_block'>
                <h1>{i18n.t('progress')}</h1>
                <h2 id = "progress">{this.state.progress}</h2>
               </div>
                   <div className='item_block'>
                <button id = "edit" onClick={this.Edit}>{i18n.t('edit')}</button>

               <button id = "save" onClick={this.Save}>{i18n.t('save')}</button>

               <button id = "delete" onClick={this.Delete}>{i18n.t('delete')}</button>
                   </div>
                 <div className='item_block' style={{marginLeft:'250px'}}>
                <button id = "DoOperation" onClick={this.DoOperation} style={{display: this.state.display}}>{i18n.t('use_service')}</button>
                      <input value={this.state.task} id="task" name="task" type="text"  onChange={this.Change}/>
                 </div>
            </div>
        )
    }
}
export default Machine;