import React from 'react';
import SignIn from "./Autirization";
import axios from "axios";
import SimpleList from "./Sidebar";
import i18n from "i18next";
import Button from "@material-ui/core/Button";

class Profile extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            first_name: 'kh',
            last_name: '',
            email: '',
            groups: '',
            readonly: true,
            lng:this.props.lng,
            inf:i18n.init({
            lng: this.props.lng,
            resources: require(`./${this.props.lng}.json`)
        })
        };
        this.loading = this.loading.bind(this);
        this.Click = this.Click.bind(this);
        this.Save = this.Save.bind(this);
        this.Change = this.Change.bind(this);
        this.loading();
    }

    //this.loading()

    loading(){
        const param = this.get_user();
        param.then(()=>{
            console.log(param);
        }, ()=>{alert('mistake')});
    }



    async get_user(){
         const config = {
           headers: {
               "access-control-allow-origin": "*",
               "authorization": 'Bearer ' + localStorage.getItem('asset'),
           }
       }
        const response =
       await axios.get("http://localhost:8000/user/profile/", config);
         this.setState({first_name: response.data.first_name});
         this.setState({last_name: response.data.last_name});
        this.setState({email: response.data.email});
         this.setState({groups: response.data.groups});
         return response.data;
    }

    Save(e){
        const answer = this.Save_user();
        answer.then(() =>{alert("Done")}, () =>{alert("Error")});
    }

    async Save_user() {

      const response1 = await axios({
          method: 'put',
          url: 'http://localhost:8000/user/profile/',
          headers: {
              "content-type": "application/json",
               "authorization": 'Bearer ' + localStorage.getItem('asset'),
          },
          data: {
              "first_name": this.state.first_name,
              "last_name": this.state.last_name,
              "email": this.state.email,
          }
      });
  }

    Click(e){
        if(this.state.readonly === true){
            this.setState({readonly:false});
        }
        else{
            this.setState({readonly:true});
        }
    }

    Change(e){
        if(e.target.id === "first_name") {
            this.setState({first_name: e.target.value});
        }

        if(e.target.id === "last_name") {
            this.setState({last_name: e.target.value});
        }

        if(e.target.id === "email") {
            this.setState({email: e.target.value});
        }

    }

    render() {
        return(
           <div className='contentdiv' style={{width:'60%', marginLeft:'30%'}}>
               <h1>{i18n.t('profile')}</h1>
               <br/><br/>
               <div>
                  <div >
                      <div>
                    <h4 htmlFor="first_name">{i18n.t('first_name')}</h4>
                      <input value={this.state.first_name} id="first_name" name="first_name" type="text"  readOnly={this.state.readonly} onChange={this.Change} />
                    </div>
                  </div>
                  <div>
                    <h4 htmlFor="last_name">{i18n.t('last_name')}</h4>
                    <div>
                      <input value={this.state.last_name} id="last_name" name="last_name" type="text" readOnly={this.state.readonly} onChange={this.Change}/>
                    </div>
                  </div>
                  <div>
                    <h4 htmlFor="email">{i18n.t('email')}</h4>
                    <div>
                      <input value={this.state.email} id="email" name="email" type="email"  readOnly={this.state.readonly} onChange={this.Change}/>
                    </div>
                  </div>
                   <div style={{display:'flex'}}>
                  <div>
                    <div>
                      <button id="edit" name="edit" onClick={this.Click} style={{width:'150px', height:'50px', marginTop:'20px', marginLeft:'500px'}} >{i18n.t('edit')}</button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="save" />
                    <div>
                      <button id="save" name="save" onClick={this.Save} style={{width:'150px', height:'50px', marginTop:'20px'}}>{i18n.t('save')}</button>
                    </div>
                  </div>
                   </div>

                </div>


           </div>
        )

    }
}


export default Profile;