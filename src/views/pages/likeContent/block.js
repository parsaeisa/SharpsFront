import React from 'react';
import '../../styles/explorePage.css';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import serverURL from '../../../utils/serverURL';
import tokenConfig from '../../../utils/tokenConfig';
import axios from 'axios' ;
import Snackbar from "@material-ui/core/Snackbar";
import { withRouter } from 'react-router-dom';
import BlockIcon from '@material-ui/icons/Block';


class Block extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            updated: false,
            openSnack:false,
            massage:"",
            domain:""
        }


        this.updateblock = this.updateblock.bind(this);
        // this.handleCloseSnack = this.handleCloseSnack.bind(this);

    }
    
//    handleCloseSnack =(event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
    
//     this.setState({openSnack:false});
//   }

    updateblock() {

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


        this.content();

    }

    content() {
      
      
        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));
        myHeaders.append("Content-Type","application/json")

        var UserCourse = {}
        UserCourse.domain = this.props.url;
   

        var raw = JSON.stringify(UserCourse);

        fetch(serverURL() + "user/blockedDomains", {

            method: 'POST',
            body: raw,
            headers: myHeaders
        }
        ).then((res) => {
            console.log(res.status);
            if (res.status === 200){
                this.setState({openSnack:true});

                this.setState({massage:"blocked"});

            return res.json();
            }

        }).then((res) => console.log(res));

       
    }



    render() {
        return (
            
            <div>

        <i className="material-icons " onClick={() => { this.updateblock() }}> <BlockIcon></BlockIcon></i>
                <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={this.state.openSnack}
        autoHideDuration={2500}
        // onClose={this.handleCloseSnack()}
        message={<div style={{ fontSize: 17 }}>{this.state.massage}</div>}
      />
            </div>

        );

    }
}

export default Block;
