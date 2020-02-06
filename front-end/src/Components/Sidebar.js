import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Profile from "./Profile";
import Plots from "./Plots";
import Services from "./Services";
import Machines from "./Machines";
import axios from "axios";
import Service from "./Service";
import { saveAs } from 'file-saver';
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import i18n from "i18next";
import My_Services from "./My_Services";


function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class  SimpleList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: '2018-09-08',
            lng: this.props.lng,
            temp:'profile',
        };
        this.Click = this.Click.bind(this);
        this.Get_report = this.Get_report.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
    };

    Get_report(){
        const answer = this.get_report();
        console.log(answer);
        answer.then(()=>{alert("Done"); console.log(answer)}, ()=>{alert("Mistake")})
    }
    async get_report(){
        console.log(this.state.date);
        const response = await axios({
          method: 'get',
          url: 'http://localhost:8000/user/operationDo/',
          headers: {
              "content-type": "application/json",
               "authorization": 'Bearer ' + localStorage.getItem('asset'),
          },
          params: {
              "date": this.state.date,
          },
          responseType: 'blob'
      });
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'newPdf.pdf');
        return response
    }

    componentWillMount() {
    this.setLanguage('en');
    //this.setState({lng:'en'});
    }
    setLanguage(language) {
        i18n.init({
        lng: language,
        resources: require(`./${language}.json`)
  });

        this.setState({lng:language});
        this.props.func_leng(language);
          if(this.state.temp ==="profile"){
            this.props.func(<Profile lng = {this.state.lng}/>);
        }
        else if(this.state.temp ==="plots"){
            this.props.func(<Plots lng = {this.state.lng}/>);
        }
        else if(this.state.temp ==="All_Service"){
            this.props.func(<Services my = {false} display = {'none'} lng = {this.state.lng}/>);
        }
        else if(this.state.temp ==="My_Service"){
            this.props.func(<My_Services my = {true} display = {'block'} lng = {this.state.lng}/>);
        }
         else if(this.state.temp ==="Machine"){
            this.props.func(<Machines lng = {this.state.lng}/>);
        }
  //this.props.actions.changeLanguage(i18n);

}
componentDidMount() {
        this.props.func(<Profile lng = {this.state.lng}/>);
}

    Click(e){
        if(e.currentTarget.id ==="profile"){
            this.props.func(<Profile lng = {this.state.lng}/>);
            this.setState({temp:'profile'});
        }
        else if(e.currentTarget.id ==="plots"){
            this.props.func(<Plots lng = {this.state.lng}/>);
            this.setState({temp:'plots'});
        }
        else if(e.currentTarget.id ==="All_Service"){
            this.props.func(<Services my = {false} display = {'none'} lng = {this.state.lng}/>);
            this.setState({temp:'All_Service'});
        }
        else if(e.currentTarget.id ==="My_Service"){
            this.props.func(<My_Services my = {true} display = {'block'} lng = {this.state.lng}/>);
            this.setState({temp:'My_Service'});
        }
         else if(e.currentTarget.id ==="Machine"){
            this.props.func(<Machines lng = {this.state.lng}/>);
            this.setState({temp:'Machine'});
        }


    }
  render()
    {
        return (
            <div style={{position:"fixed",borderRight: '3px solid rgba(85, 222, 74, 0.8)'}} >
                <Button bsStyle="primary" onClick={this.setLanguage.bind(this, 'en')}>English</Button>
                <Button bsStyle="primary" onClick={this.setLanguage.bind(this, 'ru')}>Українська</Button>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem id = "profile" button onClick={this.Click}>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText style={{color:'darkgreen'}} primary={i18n.t('home')}/>
                    </ListItem>
                    <ListItem button id = "plots"  onClick={this.Click}>
                        <ListItemIcon>
                             <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={i18n.t('plots')} style={{color:'darkgreen'}}/>
                    </ListItem>
                     <ListItem id = "My_Service" button onClick={this.Click}>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={i18n.t('my_services')} style={{color:'darkgreen'}}/>
                    </ListItem>
                    <ListItem id = "All_Service" button onClick={this.Click}>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={i18n.t('all_services')} style={{color:'darkgreen'}}/>
                    </ListItem>
                    <ListItem id = "Machine" button onClick={this.Click}>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={i18n.t('machines')} style={{color:'darkgreen'}}/>
                    </ListItem>
                </List>
                <Divider/>
                <List component="nav" aria-label="secondary mailbox folders">
                    <ListItem button>
                       <input value = {this.state.date} id="cost" name="cost" type="date" />
                    </ListItem>
                <List component="nav" aria-label="secondary mailbox folders">
                    <ListItem button>
                        <ListItemText primary={i18n.t('get_report')} onClick={this.Get_report} style={{color:'darkgreen'}}/>
                    </ListItem>
                </List>

                </List>
            </div>
        );
    }
}
export default SimpleList;