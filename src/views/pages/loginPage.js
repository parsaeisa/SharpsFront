import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import '../styles/loginSignup.css';
import Login from './component/login';
import SignUP from './component/signUp';

import { Layout, Space } from 'antd';
import signUp from './component/signUp';

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
                                        {/* <Login /> */}
                                        <SignUP />
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