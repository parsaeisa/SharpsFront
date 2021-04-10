import React, { useState , Component} from 'react';
import { Image } from 'antd';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogActions from '@material-ui/core/DialogActions';
// import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import 'antd/dist/antd.css';
import { Layout , Modal , Collapse } from 'antd';

import Dialog from '@material-ui/core/Dialog';
import '../../styles/edit_profile.css' ;

const useStyles = makeStyles((theme) => ({        
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
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function Edit_profile (props) {        
                
  
    const classes = useStyles();        
    const [visible, setVisible] = useState(false);
    const [Backdrop , setBackDrop] = useState(false);

    window.addEventListener('click', (e) => {
      if (Backdrop) {
        setBackDrop(false);
      }
    });
    
    const [values, setValues] = React.useState({
      amount: '',
      password: '',
      confirmPassword : '' ,
      weight: '',
      weightRange: '',
      showPassword: false,      
      showConfirmPassword: false,      
    });

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
    
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleClickShowConfirmPassword = () => {
      setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
    };
    
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleClose = () => {
      setVisible(false);
    };  
    
    return (           
      <>    
          <Button type="primary" onClick={() => setVisible(true)}>
            Edit Profile
          </Button>
          <Dialog    
            className={Backdrop && "DialogTared"}      
            // title="Edit Profile"            
            transitionDuration = {900}
            // visible={visible}
            open={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={1000}
            onClose={handleClose}            
          >
            <MuiDialogTitle disableTypography className={classes.root} >                           
                
                <Typography variant="h6">Edit Profile</Typography><Typography></Typography>
                <Button variant="contained" color='primary'
                    className={classes.closeButton} onClick={handleClose}
                > 
                  <CloseIcon color='black' />
                </Button>                              
                                
                     
            </MuiDialogTitle>
            <MuiDialogContent>
              <div className="imageHolder">              
                <Image
                  onClick = {() => {setBackDrop(true)}}                  
                  // onClose = {() => {setBackDrop(false)}}
                  width={150}
                  height={150}            
                  src="https://source.unsplash.com/random"
                />
              </div>
              <div className="camera_button">
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<AddAPhotoIcon />}
                >
                  Add photo
                </Button>
              </div>
              <Collapse onChange={callback}>
                <Panel header="Name :" key="1">
                  <TextField className ="TextField" id="outlined-basic" label="FirstName" variant="outlined" />
                  <TextField className ="TextField" id="outlined-basic" label="LastName" variant="outlined" />
                </Panel>
                <Panel header="Username :" key="2">
                  <TextField className ="TextField" id="outlined-basic" label="Username" variant="outlined" />
                </Panel>
                <Panel header="Email : " key="3">
                  <TextField className ="TextField" id="outlined-basic" label="Email" variant="outlined" />
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
                      type={values.showPassword ? 'text' : 'password'}
                      value={values.password}
                      onChange={handleChange('password')}
                      endAdornment={                      
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
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
                      type={values.showConfirmPassword ? 'text' : 'password'}
                      value={values.confirmPassword}
                      onChange={handleChange('confirmPassword')}
                      endAdornment={                                              
                          <IconButton
                            color = "#023047"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >                        
                          {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>                                               
                      }
                      labelWidth={70}
                    />
                  </FormControl>

                </Panel>
                <Panel header="deactivate" key="5">
                    {/* <Tooltip title="Delete Account" placement="top" TransitionComponent={Zoom} arrow> */}
                    <Button size="Medium" className="Button" variant="contained" color="secondary">
                      {/* <SaveIcon /> */}
                      Delete Account
                      {/* <FontAwesomeIcon icon={faUserTimes} size="2x" /> */}
                    </Button>
                  {/* </Tooltip> */}
                </Panel>
              </Collapse>
            </MuiDialogContent>            
            <MuiDialogActions>
                <Button size="Large" className="Button" variant="contained" color="primary">
                  Save 
                </Button>   
            </MuiDialogActions>
          </Dialog>
      </>
    )    
}

export default  withRouter(Edit_profile);