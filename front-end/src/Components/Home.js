import React from 'react';
import SimpleList from "./Sidebar";
import Profile from "./Profile";
import i18n from "i18next";

class Home extends React.Component{
        constructor(props) {
        super(props);
        this.state = {
            content : '',
            lng:'en'
        };
        this.ChangeContent = this.ChangeContent.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
    }

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

    ChangeContent(temp){
            this.setState({content:temp});
    }

     render() {
        return(
            <div className='maindiv'>
                <SimpleList func={this.ChangeContent} func_leng ={this.setLanguage} lng={this.state.lng}/>
                {this.state.content}
            </div>
        )
        }

}
export default Home;