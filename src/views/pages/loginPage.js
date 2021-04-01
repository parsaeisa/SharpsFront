import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import '../styles/loginSignup.css';
import Login from './component/login';
import SignUp from './component/signUp';

import { connect } from "react-redux";

import * as loginsignup_actions from "../../core/login_signup/action/loginSignupAction";
import { Layout, Space } from 'antd';


  

const LoginSignup  = ({change,setChange}) => { 
    
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

        // const classes = this.props.classes;
        const classes = useStyles;
        // const [pending, setPending] = this.props.p;   
        const setMov =(e) =>{
            var thePhoto= document.getElementById('signupphoto');
            if(change){
              thePhoto.classList.add('unchange');
              thePhoto.classList.remove("change");
              setChange(false);
            }
            else{
              thePhoto.classList.add('change');
              thePhoto.classList.remove("unchange");
              setChange(true);
            }
            var theSignupform= document.getElementById('signupform');
            theSignupform.classList.toggle('signupshow');
            
            var theLoginform= document.getElementById('loginform');
            theLoginform.classList.toggle('loginhide');
      
          }             

        return (           

            <React.Fragment>
                <CssBaseline />                
                <main className='layout'>
                    {/* <Paper className={classes.paper}>                                                */}

                            <Grid container component="maingrid">
                                <CssBaseline />
                                <Grid item className='photo_login' id= "signupphoto">                                
                                        <h1 className='text_header'> Sharp </h1>                        
                                            <Button  onClick= {setMov}  
                          id= "mybutton"
                           size="large"                                  
                                                   
                                                className = 'buttonMain'                                                  
                                                variant="outlined">
                                                    Start
                                            </Button>                        
                                        {/* <p className='text'> 
                                            If you don't have an account <br/>
                                            you can sign up .   
                                        </p>                                     */}
                                </Grid>
                                <Grid className = 'signupform' id='signupform'item xs={12} sm={8} md={6} elevation={6} square >
                                                                        
                                    <div className="signuppage" >
                                    <SignUp></SignUp>
                                     </div>
                                  
                                </Grid>
                                
                                <Grid  className="loginform"  id="loginform" item xs={12} sm={8} md={6}  elevation={6} square >
                                                                   
                                                                   <div className="loginpage">
                                                 <Login ></Login>
                                             </div>
                                                                       
                                                                   
                                                               </Grid>
                             
                            </Grid>
                    {/* </Paper>                     */}
                </main>
            </React.Fragment>
        )
    };



 
const mapStateToProps = (state) =>{
    
    return{
      change: state.login_signup.change,
      
    }
} 
  const mapDispatchToProps = (dispatch) => {
    return{
      setChange: (av) => dispatch(loginsignup_actions.setChange(av)),
  
      
    }
}
  
  export default connect(mapStateToProps,mapDispatchToProps)(LoginSignup);
