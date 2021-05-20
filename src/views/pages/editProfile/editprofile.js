import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux' ;
import * as UserAction from "../../../core/edit_profile/action/UserAction" ;
import Grid from '@material-ui/core/Grid';
import store from "../../../core/store/index"
import { makeStyles } from '@material-ui/core/styles';
import callapi_editprofile_update from './callapi_editprofile.js/callapi_editprofile_udpate' ;
import callapi_editprofile_get from './callapi_editprofile.js/callapi_editprofile_get' ;
import DeleteAccountModal from './components/Deactivate' ;
import 'antd/dist/antd.css';
import { Collapse } from 'antd';

import '../../styles/edit_profile.css' ;
import Avatar from './components/Avatar';
import SuccessAlert from './components/Success_alert';
import FailAlert from './components/fail_alert';

class Edit_profile extends React.Component {        
                
  
    constructor(props){
      super(props);

      callapi_editprofile_get()    

      this.state = {
        visible : false ,
        showSuccessAlert : false ,
        SuccesAlertText : "Profile has been changed succes fully " ,
        showFailureAlert : false ,
        FailAlertText : "" ,
        deleteAccountModalOpen : false ,
        loading : false ,
        last_state : null ,
        values : {
          amount: '',
          password: '',
          confirmPassword : '' ,
          weight: '',
          weightRange: '',
          showPassword: false,      
          showConfirmPassword: false,      
        }
      }
    }

    componentWillMount(){
      
    }

    render()
    {
      const classes = makeStyles((theme) => ({                  
          
        closeButton: {
          position: 'absolute',
          right: theme.spacing(1),
          top: theme.spacing(1),
          color: theme.palette.grey[500],
          
        },  
      }));
    
    function callback(key) {      
    }  
    const {Panel} = Collapse ;

    const handleChange = (prop) => (event) => {
      this.setState({values : { ...this.state.values, [prop]: event.target.value }});
    };
    
    const handleClickShowPassword = () => {
      this.setState({values : { ...this.state.values, showPassword: !this.state.values.showPassword }});
    };

    const handleClickShowConfirmPassword = () => {
      this.setState({values :{ ...this.state.values, showConfirmPassword: !this.state.values.showConfirmPassword }});
    };
    
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleClose = () => {
      // setVisible(false);
      this.setState({visible : false });
    };      

    
    return (           
      <>          
            <Paper elevation={5} className="paper">
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="h6">Edit Profile</Typography>       
                  </Grid>                  
                </Grid>
                                
            <Container maxWidth="lg"  className="container">
              <SuccessAlert 
                show={this.state.showSuccessAlert}
                text= {this.state.SuccesAlertText}
                />
              <FailAlert 
                show={this.state.showFailureAlert}
                text = {this.state.FailAlertText}
                />
              
                 
                 {this.props.avatar != "undefined" ? <> <Avatar /> </> : <CircularProgress
                  style={{marginBottom : "15px"}}
                 color="#0f0b3e" /> }
              <Collapse data-testid="Collapse" onChange={callback}>              
                <Panel style={{textAlign: "left"}}  header= {this.state.last_state ? this.state.last_state.firstname : "Name :" }
                 key="1">
                  <TextField className ="TextField" onChange={(e) => {this.props.SET_FIRSTNAME(e.target.value)}} value={this.props.firstname} label="FirstName" variant="outlined" role="FirstnameTextField" />
                  <TextField className ="TextField" onChange={(e) => {this.props.SET_LASTNAME(e.target.value)}} value={this.props.lastname} id="outlined-basic" label="LastName" variant="outlined" role="LastnameTextField" />
                </Panel>
                <Panel style={{textAlign: "left"}} header="Username :" key="2">
                  <TextField disabled className ="TextField" id="outlined-basic" value={this.props.username} onChange={(e) => {this.props.SET_USERNAME(e.target.value)}} label="Username" variant="outlined" role="UsernameTextField"/>
                </Panel>
                <Panel style={{textAlign: "left"}} header="Email : " key="3">
                  <TextField disabled className ="TextField" value={this.props.email} onChange={(e) => {this.props.SET_EMAIL(e.target.value)}} id="outlined-basic" label="Email" variant="outlined" role="EmailTextField" />
                  <ul style={{width : '50%'}}><li>
                  <Typography variant="subtitle1" style={{marginTop : '5px'}}>                  
                    Your email would be used to communicate with you . 
                  </Typography>
                  </li>
                  </ul>
                </Panel>
                <Panel style={{textAlign: "left"}} header="Password : " key="4">
                  <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={this.state.values.showPassword ? 'text' : 'password'}
                      value={this.state.values.password}
                      onChange={handleChange('password')}
                      endAdornment={                      
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {this.state.values.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>                       
                      }
                      labelWidth={70}
                    />
                  </FormControl>
                  
                  <FormControl className={clsx(classes.margin, classes.textField)} style={{marginleft : "5px"}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Confirm</InputLabel>
                    <OutlinedInput 
                      className = "TextField"
                      id="outlined-adornment-password"
                      type={this.state.values.showConfirmPassword ? 'text' : 'password'}
                      value={this.state.values.confirmPassword}
                      onChange={handleChange('confirmPassword')}
                      endAdornment={                                              
                          <IconButton
                            color = "#023047"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >                        
                          {this.state.values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>                                               
                      }
                      labelWidth={70}
                    />
                  </FormControl>

                </Panel>
                <Panel style={{textAlign: "left"}} header="deactivate" key="5">                    
                    <Button onClick= {() => {
                      this.setState({
                        deleteAccountModalOpen : true
                      })
                    }} size="Medium" className="Button" variant="contained" color="secondary">                      
                      Delete Account                      
                    </Button>                  
                    <DeleteAccountModal 
                    open = {this.state.deleteAccountModalOpen}
                    handleClose = {() => {
                      this.setState({
                        deleteAccountModalOpen : false
                      })
                    }} />
                </Panel>
              </Collapse>                      
                        
            <div className="wrapper">
                <Button disabled={this.state.loading}  size="large" className="Button" variant="contained" color="primary"
                  onClick = {() => {
                    if(this.state.values.password == this.state.values.confirmPassword)
                    {
                      this.setState({
                          showFailureAlert : false ,
                          loading : true 
                           });
                      this.props.SET_PASSWORD(this.state.values.password) ;                      
                    }
                    else
                    {
                      this.setState({showFailureAlert : true , FailAlertText : "Passwords dont match " });
                    }
                    if(this.state.showFailureAlert == false)
                      callapi_editprofile_update(store.getState().UserReducer , () => {
                        this.setState({
                          showSuccessAlert : true ,
                          loading : false 
                        })
                      }, (text) => {
                        this.setState({
                          FailAlertText : text ,
                          showFailureAlert : true ,
                          loading : false
                        })
                      });
                  }}
                >
                  Save 
                  {this.state.loading && <CircularProgress style={{color : 'green'}} size={24} className="buttonProgress" />}
                </Button > 
            </div>  
          </Container >
            </Paper>          
      </>
    )  }  
}

const mapStateToProps = (state) => {
  return {
    ...state,
    firstname : state.UserReducer.firstname ,
    lastname : state.UserReducer.lastname ,
    username : state.UserReducer.username ,
    email : state.UserReducer.email ,
    password : state.UserReducer.password ,
    avatar : state.UserReducer.avatar ,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    SET_STATE : (t) => dispatch (UserAction.setState(t)),       
    SET_FIRSTNAME : (t) => dispatch (UserAction.setFirstname(t)), 
    SET_LASTNAME : (t) => dispatch (UserAction.setLastname(t)), 
    SET_USERNAME : (t) => dispatch (UserAction.setUsername(t)), 
    SET_EMAIL : (t) => dispatch (UserAction.setEmail(t)), 
    SET_PASSWORD : (t) => dispatch (UserAction.setPassword(t)) , 
    SET_AVATAR : (t) => dispatch (UserAction.setFirstname(t)) , 
  }
}

export default connect (mapStateToProps , mapDispatchToProps) (Edit_profile); 