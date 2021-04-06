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
        marginTop : theme.spacing(8) ,
        marginBottom: theme.spacing(6),
        padding: theme.spacing(0),
      },
    },    
  }));

function SE_SignUp (props) {        
        
    
    const classes = useStyles();    
    const [isLogin , setIsLogin] = React.useState(true);

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
                                            variant="outlined"
                                            onClick = {() => {
                                                setIsLogin(!isLogin) ;
                                            }}
                                            >
                                                { isLogin ? 
                                                    <div>Sign up </div>
                                                :
                                                    <div>Sign in </div>
                                                }
                                        </Button>                        
                                    {isLogin ? 
                                    <p className='text'> 
                                        if you don't have an account <br/>
                                        you can sign up .   
                                    </p>                                    
                                    :
                                    <p className='text'> 
                                        if you already have an account <br/>
                                        you can sign in .   
                                    </p>       
                                    }
                            </Grid>

                            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square >
                                <div className={classes.paper}>                                    
                                    { isLogin ?
                                        <Login />
                                    :
                                        <SignUP />
                                    }
                                </div>
                            </Grid>
                        </Grid>
                </Paper>                    
            </main>
        </React.Fragment>
    )    
}


// function SignUpoutput() {
//     const classes = useStyles();
//     const p = React.useState(false);
//     return (          
//         <SE_SignUp  p={p}
//         classes = {classes}
//         />             
//     )
// }

export default  withRouter(SE_SignUp);