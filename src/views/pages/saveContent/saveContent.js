import React from 'react';
import '../../styles/explorePage.css';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotRoundedIcon from '@material-ui/icons/TurnedInNotRounded';
import serverURL from '../../../utils/serverURL';

import { withRouter } from 'react-router-dom';

class SaveContent extends React.Component {

    constructor(props) {

        super(props);
        this.state = {

            url: this.props.url,
            updated: false,
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
        // console.log(this.state.url + "naaaaaaa")
        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

        var UserCourse = {}
        UserCourse.url = this.state.url;


        var raw = JSON.stringify(UserCourse);
        var requestOptions =
        {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        fetch(serverURL() + "user/savedContents", requestOptions

        ).then((res) => {
            console.log(res.status);

        }).then((res) => console.log(res));
    }


    render() {
        return (
            <div>

                <i className="material-icons" onClick={() => { this.updatesave() }}><TurnedInNotRoundedIcon></TurnedInNotRoundedIcon></i>

            </div>

        );

    }
}

export default SaveContent;
