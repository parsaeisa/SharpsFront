import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {Link, Redirect, Route, useHistory , Router , withRouter } from 'react-router-dom';
import axios from 'axios';
// import serverURL from '../../utils/serverURL';

// import styles from '../styles/loginSignup.css' ;
import '../styles/loginSignup.css';
import Login from './login';

class SE_SignUp extends Component {    

    constructor() {
        super();
        this.state = {
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            email: '',
            repassword: '',
            showPassword: false,
            isLoading: false,                        
        }
    }
    
    
    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        
    }
    
    render() {
        // const classes = this.props.classes;
        const [pending, setPending] = this.props.p;        
        
        // const handleClick = e => {
        //     setPending(true);
        //     e.preventDefault();        
        // axios.post(serverURL()+"user/signup", this.state)
        //     .then(result => {

        //     }).catch(error => {                

        //     })}

        return (
            <Container component="main" maxWidth="xs" className = "root" >                                                        
                <div 
                    className="center"
                >
                    <div 
                        class="column"
                        className = 'photo'
                    >
                        <h1 className='text_header'> Sharp </h1>                        
                            <Button  size="large"                                  
                                color ="white"   
                                className = 'button'                                                  
                                variant="outlined">
                                    Sign Up
                            </Button>                        
                        <p className='text'> 
                            if you don't have an account <br/>
                            you can sign up .   
                        </p>
                    </div>
                    <div class="column" >
                        <Login />
                    </div>
                </div>

            </Container>
        )
    };
}


function SignUpoutput() {
    // const classes = useStyles();
    const p = React.useState(false);
    return (          
        <SE_SignUp  p={p}/>             
    )
}

export default  withRouter(SignUpoutput);