import React from 'react';
import '../../styles/explorePage.css';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import serverURL from '../../../utils/serverURL';
import tokenConfig from '../../../utils/tokenConfig';

import { withRouter } from 'react-router-dom';

class Like extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            url: null,
            eventType: "LIKE",
            updated: false,
            userHistory:[{ domain:""}]
           
        }


        this.updatelike = this.updatelike.bind(this);

    }
    updatelike() {

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
      
        this.state.url = this.props.url
 
        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

        var UserCourse = {}
        UserCourse.url = this.state.url;
        UserCourse.eventType = this.state.eventType;

        var raw = JSON.stringify(UserCourse);

        fetch(serverURL() + "userHistory", {

            method: 'POST',
            body: raw,
            headers: myHeaders
        }
        ).then((res) => {
            console.log(res.status);
            if (res.status === 201)
            return res.json();
         

        }).then((res) => console.log(res));
    }



      componentDidMount() {
        this.getlike();

    }
    getlike() {

        fetch(serverURL() + "userHistory", {
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
            .then((response) => {
                this.setState({
                    userHistory: response.userHistory,
                   
                })
                {
                    this.state.userHistory.map((l) => {
                        if (l.domain == this.state.url)
                            this.setState({
                                updated: true
                            })

                    }
                    )
                }

            });

    }

    render() {
        return (
            <div>

                <i className="material-icons " onClick={() => { this.updatelike() }}>{this.state.updated ? <ThumbUpAltIcon></ThumbUpAltIcon> : <ThumbUpAltOutlinedIcon></ThumbUpAltOutlinedIcon>}</i>

            </div>

        );

    }
}

export default Like;
