import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
// import serverURL from '../../utils/serverURL';

import 'antd/dist/antd.css';
import '../styles/loginSignup.css';
import Login from './login';

import { Layout, Space } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const useStyles = makeStyles((theme) => ({        
    paper: {   
        width : '100%'         ,    
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {        
        marginTop : theme.spacing(15) ,
        marginBottom: theme.spacing(6),
        padding: theme.spacing(0),
      },
    },    
  }));

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
        const classes = this.props.classes;
        const [pending, setPending] = this.props.p;        
        
        // const handleClick = e => {
        //     setPending(true);
        //     e.preventDefault();        
        // axios.post(serverURL()+"user/signup", this.state)
        //     .then(result => {

        //     }).catch(error => {                

        //     })}

        return (           

            <React.Fragment>
                <CssBaseline />                
                <main className='layout'>
                    <Paper className={classes.paper}>                                               

                            <Grid container component="main">
                                <CssBaseline />
                                <Grid item xs={false} sm={4} md={6} className='photo_login'>                                
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
                                </Grid>

                                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square >
                                    <div className={classes.paper}>                                    
                                        <Login />
                                    </div>
                                </Grid>
                                </Grid>
                    </Paper>                    
                </main>
            </React.Fragment>
        )
    };
}


function SignUpoutput() {
    const classes = useStyles();
    const p = React.useState(false);
    return (          
        <SE_SignUp  p={p}
        classes = {classes}
        />             
    )
}

export default  withRouter(SignUpoutput);