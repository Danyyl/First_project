import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {red} from "@material-ui/core/colors";
import axios from 'axios'
import ReactDOM from "react-dom";
import i18n from "i18next";


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:'',
      lng:'en',
    };

    this.handleChange = this.handleChange.bind(this);
    this.validation = this.validation.bind(this);
    this.test = this.test.bind(this);
      this.setLanguage = this.setLanguage.bind(this);
  };

    setLanguage(language) {
        i18n.init({
        lng: language,
        resources: require(`./${language}.json`)
  });
        this.setState({lng:language});

  //this.props.actions.changeLanguage(i18n);
}

  componentWillMount() {
    this.setLanguage('en');
    this.setState({lng:'en'});
    }

  handleChange(e){
    if(e.target.name === "email") {
      this.setState({email: e.target.value});
    } else if(e.target.name === "password"){
      this.setState({password: e.target.value});
    }
  }

  validation(e) {
      e.preventDefault();
      var user = this.test();
      user.then(this.func_test, () => {alert("mistake")});
  }


  func_test() {

          window.location.assign('http://localhost:3000/home/');
  }

  async test() {

      const response1 = await axios({
          method: 'post',
          url: 'http://localhost:8000/api/token/',
          headers: {
              "content-type": "application/json"
          },
          data: {
              "username": this.state.email,
              "password": this.state.password
          }
      });
      localStorage.setItem('asset', response1.data.access);
        localStorage.setItem('name', this.state.email);
  }
  async inf(){
       const config = {
           headers: {
               "access-control-allow-origin": "*",
               "authorization": 'Bearer ' + localStorage.getItem('asset'),
           }
       }
        const response =
       await axios.get("http://localhost:8000/user/profile/", config);
       console.log(response.data)
  }

  render() {
    return (
        <Container component="main" maxWidth="xs">
             <Button bsStyle="primary" onClick={this.setLanguage.bind(this, 'en')}>English</Button>
        <Button bsStyle="primary" onClick={this.setLanguage.bind(this, 'ru')}>Українська</Button>
          <CssBaseline/>
          <div className="paper">
            <Avatar className="avatar">

            </Avatar>
            <Typography component="h1" variant="h5">
             {i18n.t('autorization')}
            </Typography>
            <form className="form" noValidate>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={i18n.t('username')}
                  name="email"
                  autoComplete="email"
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
                  autoComplete="current-password"
                  onChange={this.handleChange}
              />
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  onClick={this.validation}
              >
                {i18n.t('sign_in')}
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="http://localhost:3000/registration/" variant="body2">
                    {i18n.t('registration')}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
    );
  }
}

export default SignIn;