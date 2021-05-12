import React from 'react';
import '../../styles/explorePage.css';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotRoundedIcon from '@material-ui/icons/TurnedInNotRounded';
import serverURL from '../../../utils/serverURL';
import tokenConfig from  '../../../utils/tokenConfig';

import { withRouter } from 'react-router-dom';

class SaveContent extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            url:"",   
            updated:false,
            items:[], 
            total:""
        }


        this.updatesave = this.updatesave.bind(this);

    }
    updatesave() {

        if (!this.state.updated) {
            this.setState((prevState, props) => {
                return {
                    updated: true
                };

            });

        } else {

            this.setState((prevState, props) => {
                return {
                    updated: false

                };
            });

        }
      

        this.save();

    }

    save() {
       
        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));
        myHeaders.append("Content-Type","application/json")
      
        var UserCourse = {}
        UserCourse.url = this.props.url;

        var raw = JSON.stringify(UserCourse);
    
        fetch(serverURL() + "user/savedContents",{

         method: 'POST',
         body: raw , 
        headers: myHeaders
    }
        ).then((res) => {
            console.log(res.status);

        }).then((res) => console.log(res));
    }


    
    componentDidMount() {  
            this.getsave();
      
    }
    getsave() {
          
    fetch(serverURL() + "user/savedContents", {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        }
      })
        .then((result) => {
          console.log(result)
          if (result.status === 200) {
            return result.json()
          }
          if (result.status === 401) {
            window.location.replace("/login")
          }
        }
        )
        .then( (response)  => {
            this.setState({
            items: response.items,
            total: response.total
          })
         
          {this.state.items.map((l) =>
                 {  
               
                   if(l.url===this.props.url) {
                 this.setState({
                    updated:true
                  }) 
                } 
                 }
               )}

        });     
    
    }
    
    render() {
        return (
            <div>

        <i className="material-icons "  onClick={() => { this.updatesave() }}>{ this.state.updated ? <TurnedInIcon></TurnedInIcon> :<TurnedInNotRoundedIcon></TurnedInNotRoundedIcon>}</i>

            </div>

        );

    }
}

export default SaveContent;
