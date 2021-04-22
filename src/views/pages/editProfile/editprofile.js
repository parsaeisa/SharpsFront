import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
// import LoadingButton from '@material-ui/lab/LoadingButton';
import { connect } from 'react-redux' ;
import * as UserAction from "../../../core/edit_profile/action/UserAction" ;
// import Button from '@material-ui/core/Button';
import store from "../../../core/store/index"
import { makeStyles } from '@material-ui/core/styles';
import callapi_editprofile_update from './callapi_editprofile.js/callapi_editprofile_udpate' ;
import callapi_editprofile_get from './callapi_editprofile.js/callapi_editprofile_get' ;

import 'antd/dist/antd.css';
import { Collapse } from 'antd';

import Dialog from '@material-ui/core/Dialog';
import '../../styles/edit_profile.css' ;
import Avatar from './components/Avatar';
import SuccessAlert from './components/Success_alert';
import FailAlert from './components/fail_alert';

class Edit_profile extends React.Component {        
                
  
    constructor(props){
      super(props);

      this.state = {
        visible : false ,
        showSuccessAlert : false ,
        SuccesAlertText : "Profile has been changed succes fully " ,
        showFailureAlert : false ,
        FailAlertText : "" ,
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

    componentDidMount(){
      callapi_editprofile_get()    
    }

    render()
    {
      const classes = makeStyles((theme) => ({        
        paper: {   
            width : '100%'         ,    
          [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {        
            marginTop : theme.spacing(8) ,
            marginBottom: theme.spacing(6),
            padding: theme.spacing(0),
          },
        },  
        closeButton: {
          position: 'absolute',
          right: theme.spacing(1),
          top: theme.spacing(1),
          color: theme.palette.grey[500],
        },  
      }));
    
    function callback(key) {
      console.log(key);
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

    const EditProfileButtonText = 'Edit Profile' ;

    
    return (           
      <>              
          <Button type="primary" onClick={() => this.setState({visible : true })}>
            {EditProfileButtonText}
          </Button>
          <Dialog    
            // className={Backdrop && "DialogTared"}      
            // title="Edit Profile"            
            transitionDuration = {900}
            // visible={visible}
            open={this.state.visible}
            onOk={() => this.setState({visible : true })}
            onCancel={() => this.setState({visible : true })}
            width={1000}
            onClose={handleClose}            
          >
            <MuiDialogTitle disableTypography >                           
                
                <Typography variant="h6">Edit Profile</Typography><Typography></Typography>
                <Button variant="contained" color='primary'
                    className={classes.closeButton} onClick={handleClose}
                > 
                  <CloseIcon className="closeIcon" color='black' />
                </Button>                              
                                
                     
            </MuiDialogTitle>
            <MuiDialogContent>
              <SuccessAlert 
                show={this.state.showSuccessAlert}
                text= {this.state.SuccesAlertText}
                />
              <FailAlert 
                show={this.state.showFailureAlert}
                text = {this.state.FailAlertText}
                />
              
                 
                <Avatar />              
              <Collapse data-testid="Collapse" onChange={callback}>              
                <Panel header= {this.state.last_state ? this.state.last_state.firstname : "Name :" }
                 key="1">
                  <TextField className ="TextField" onChange={(e) => {this.props.SET_FIRSTNAME(e.target.value)}} value={this.props.firstname} id="outlined-basic" label="FirstName" variant="outlined" />
                  <TextField className ="TextField" onChange={(e) => {this.props.SET_LASTNAME(e.target.value)}} value={this.props.lastname} id="outlined-basic" label="LastName" variant="outlined" />
                </Panel>
                <Panel header="Username :" key="2">
                  <TextField className ="TextField" id="outlined-basic" value={this.props.username} onChange={(e) => {this.props.SET_USERNAME(e.target.value)}} label="Username" variant="outlined" />
                </Panel>
                <Panel header="Email : " key="3">
                  <TextField className ="TextField" value={this.props.email} onChange={(e) => {this.props.SET_EMAIL(e.target.value)}} id="outlined-basic" label="Email" variant="outlined" />
                  <ul style={{width : '50%'}}><li>
                  <Typography variant="subtitle1" style={{marginTop : '5px'}}>                  
                    Your email would be used to communicate with you . 
                  </Typography>
                  </li>
                  </ul>
                </Panel>
                <Panel header="Password : " key="4">
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
                <Panel header="deactivate" key="5">                    
                    <Button size="Medium" className="Button" variant="contained" color="secondary">                      
                      Delete Account                      
                    </Button>                  
                </Panel>
              </Collapse>
            </MuiDialogContent>            
            <MuiDialogActions>
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
                          showFailureAlert : true 
                        })
                      });
                  }}
                >
                  Save 
                  {this.state.loading && <CircularProgress style={{color : 'green'}} size={24} className="buttonProgress" />}
                </Button > 
                </div>  
            </MuiDialogActions>
          </Dialog>
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