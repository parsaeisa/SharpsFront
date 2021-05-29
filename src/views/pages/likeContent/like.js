import React from 'react';
import '../../styles/explorePage.css';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import serverURL from '../../../utils/serverURL';
import tokenConfig from '../../../utils/tokenConfig';
import axios from 'axios' ;
import Snackbar from "@material-ui/core/Snackbar";
import { withRouter } from 'react-router-dom';


class Like extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            url: "",
            eventType: "LIKE",
            updated: false,
            openSnack:false,
            massage:"",
            userHistory:[{ domain:""}]
           
        }


        this.updatelike = this.updatelike.bind(this);
        // this.handleCloseSnack = this.handleCloseSnack.bind(this);

    }
    
//    handleCloseSnack =(event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
    
//     this.setState({openSnack:false});
//   }

updatelike() {
     

    if (!this.state.updated) {
        this.setState((prevState, props) => {
            return {
                updated: true
            };

        });
        this.content();

    } else {

        this.setState((prevState, props) => {
            return {
                updated: false
                

            };
        });
        this.unlike();

    }


  

}
    content() {
      
      
        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));
        myHeaders.append("Content-Type","application/json")

        var UserCourse = {}
        UserCourse.url = this.props.url;
        UserCourse.eventType ="LIKE";

        var raw = JSON.stringify(UserCourse);

        fetch(serverURL() + "userHistory", {

            method: 'POST',
            body: raw,
            headers: myHeaders
        }
        ).then((res) => {
            console.log(res.status);
            if (res.status === 201){
                this.setState({openSnack:true});

                this.setState({massage:"liked"});

            return res.json();
            }

        }).then((res) => console.log(res));

       
    }
    unlike() {

        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));
        myHeaders.append("Content-Type","application/json")

        var UserCourse = {}
        UserCourse.url = this.props.url;
        UserCourse.eventType ="UNLIKE";
      
        var raw = JSON.stringify(UserCourse);

        fetch(serverURL() + "userHistory", {

            method: 'POST',
            body: raw,
            headers: myHeaders
        }
        ).then((res) => {
            console.log(res.status);
            if (res.status === 201){
                this.setState({openSnack:true});

                this.setState({massage:"unliked"});

            return res.json();
            }

        }).then((res) => console.log(res));

       
    }

      componentDidMount() {
        this.getlike();

    }
    getlike() {
                   
    axios.get(serverURL() + "userHistory"  , tokenConfig())
    .then((res) => {        
        this.setState({
            userHistory: res.userHistory,
           
        })
        {
            this.state.userHistory.map((l) => {
                if (l.domain == this.props.url)
                    this.setState({
                        updated: true
                    })

            }
            )
        }      
       
    })
    .catch((e) => {
        console.log(e); 
    });    
         
}

    render() {
        return (
            
            <div>

        <i className="material-icons " onClick={() => { this.updatelike() }}> <ThumbUpAltIcon></ThumbUpAltIcon></i>
                <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={this.state.openSnack}
        autoHideDuration={500}
        // onClose={this.handleCloseSnack()}
        message={<div style={{ fontSize: 17 }}>{this.state.massage}</div>}
      />
            </div>

        );

    }
}

export default Like;
