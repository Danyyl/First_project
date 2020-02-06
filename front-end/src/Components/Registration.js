import React from 'react';
import SignIn from "./Autirization";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import i18n from "i18next";

class Registration extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            first_name:'',
            last_name:'',
            email:'',
            lng:'en',
        };
        this.handleChange = this.handleChange.bind(this);
        this.Register = this.Register.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
    }

    componentWillMount() {
    this.setLanguage('en');
    this.setState({lng:'en'});
    }

    setLanguage(language) {
        i18n.init({
        lng: language,
        resources: require(`./${language}.json`)
  });
        this.setState({lng:language});

  //this.props.actions.changeLanguage(i18n);
}

    handleChange(e){
        if(e.target.name === "username") {
            this.setState({username: e.target.value});
        }
        else if(e.target.name === "password"){
            this.setState({password: e.target.value});
        }
        else if(e.target.name === "email"){
            this.setState({email: e.target.value});
        }
        else if(e.target.name === "first_name"){
            this.setState({first_name: e.target.value});
        }
        else if(e.target.name === "last_name"){
            this.setState({last_name: e.target.value});
        }
    }

    Register(e){
        e.preventDefault();
        const answer = this.query();
        answer.then(()=>{alert("Done"); window.location.assign('http://localhost:3000/');},()=>{alert("Mistake");});
    }

    async query(){
         const response1 = await axios({
            method: 'post',
            url: 'http://localhost:8000/user/registration/',
            headers: {
              "content-type": "application/json"
             },
            data: {
              "username": this.state.username,
              "password": this.state.password,
              "email": this.state.email,
              "first_name": this.state.first_name,
              "last_name": this.state.last_name,
            }
      });

    }

    render(){
        return(
            <Container component="main" maxWidth="xs">
                 <Button bsStyle="primary" onClick={this.setLanguage.bind(this, 'en')}>English</Button>
        <Button bsStyle="primary" onClick={this.setLanguage.bind(this, 'ru')}>Русский</Button>
          <CssBaseline/>
          <div className="paper">
            <Avatar className="avatar">

            </Avatar>
            <Typography component="h1" variant="h5">
              {i18n.t('registration')}
            </Typography>
            <form className="form" noValidate>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label={i18n.t('username')}
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={this.handleChange}
              />
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={i18n.t('password')}
                  type="password"
                  id="password"
                  autoComplete="password"
                  onChange={this.handleChange}
              />
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={i18n.t('email')}
                  name="email"
                  autoComplete="email"
                  onChange={this.handleChange}
              />
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="first_name"
                  label={i18n.t('first_name')}
                  name="first_name"
                  autoComplete="first_name"
                  onChange={this.handleChange}
              />
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="last_name"
                  label={i18n.t('last_name')}
                  name="last_name"
                  autoComplete="last_name"
                  onChange={this.handleChange}
              />

              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  onClick={this.Register}
              >
                {i18n.t('registration')}
              </Button>
            </form>
          </div>
        </Container>
        )
    }
}
export default Registration;