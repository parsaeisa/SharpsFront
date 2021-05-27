import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Container from '@material-ui/core/Container';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { connect } from 'react-redux' ;
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Drawer from '@material-ui/core/Drawer';
import ExplorePage from '../explorePage/explorePage';
import serverURL from '../../../utils/serverURL';
import tokenConfig from '../../../utils/tokenConfig' ;
import axios from 'axios' ;
import Edit_profile from '../editProfile/editprofile' ;
import { makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Analytics from '../Analytics/Analytics';
import "../../styles/Dashboard.css" ;
import ViewSaveContent from '../saveContent/viewSaveContent';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      height : '20px' ,
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      // marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 16,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      // width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(1),
      margin : '0px' ,
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));

function Dashboard(props) {    
        const classes = useStyles();
        const [open, setOpen] = React.useState(true);
        const handleDrawerOpen = () => {
            setOpen(true);
        };

        const [name , setName] = React.useState("");
        const [avatar , setAvatar] = React.useState("https://i.stack.imgur.com/l60Hf.png");

        axios.get(serverURL() + "user/"  , tokenConfig())
        .then((res) => {                            
            setName(res.data.firstname + " " + res.data.lastname);
            setAvatar(res.data.avatar);            
        })
        .catch((e) => {
            console.log(e);
        });    

        const handleDrawerClose = () => {
            setOpen(false);
        };
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

        return (
            <>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar style={{ background: '#0f0b3e' }} position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                        <Toolbar className="toolbar">
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />    
                        </IconButton>                                         
                        <IconButton color="inherit" 
                         className = "appBarOptions" 
                        >
                            <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Avatar alt="Remy Sharp" 
                            src={avatar != null && avatar != "https://i.stack.imgur.com/l60Hf.png" && atob(avatar) }                             
                            className = "appBarOptions" />
                        <Typography component="h4" variant="subtitle1" color="inherit" noWrap  >                            
                            {name}
                        </Typography>

                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>                            
                        </Typography>       
                        </Toolbar>
                    </AppBar>
                    <Drawer 
                        variant="permanent"
                        classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                        }}
                        open={open}
                    >
                        <div className={classes.toolbarIcon}>
                        <Typography syle={{marginLeft : "70px"}} variant="h6" noWrap>
                            𝓼𝓱𝓪𝓻𝓹
                        </Typography>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>                            
                        </Typography>       
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                        </div>                                            
                    <div className={classes.drawerContainer} >
                        <List style ={{paddingTop: '0px'}}>
                        <li>
                          <Link to ="/explore" >
                            <ListItem button key="Homme">
                                <ListItemIcon>
                                <HomeIcon> </HomeIcon>
                                </ListItemIcon>
                                <Typography variant="button" style={{ color: "black" }}>
                                    Home
                                </Typography >
                            </ListItem >
                          </Link>
                        </li>
                        <li>
                            <Link to ="/profile/edit" >
                                <ListItem button key="Profile">
                                <ListItemIcon>
                                    <AccountCircleIcon></AccountCircleIcon>
                                </ListItemIcon>                                                  
                                <Typography variant="button" style={{ color: "black" }}>
                                    Edit profile
                                </Typography >
                                </ListItem>
                            </Link>
                        </li>
                        <li>
                            <Link to ="/profile/analytics" >
                                <ListItem button key="Profile">
                                <ListItemIcon>
                                    <EqualizerIcon/>
                                </ListItemIcon>                                                  
                                <Typography variant="button" style={{ color: "black" }}>
                                    Analytics
                                </Typography >
                                </ListItem>
                            </Link>
                        </li>
                        <li>
                          <Link to ="/saved" >
                            <ListItem button key="Saved">
                                <ListItemIcon>
                                <TurnedInIcon></TurnedInIcon>
                                </ListItemIcon>
                                <Typography variant="button" style={{ color: "black" }}>
                                    Saved
                                </Typography >

                            </ListItem>
                          </Link>
                        </li>
                        <ListItem button key="Logout">
                            <ListItemIcon>
                            <ExitToAppIcon></ExitToAppIcon>
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                        </List>
                    </div>
                    </Drawer>
                    {/* <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: this.state.open,
                    })}
                    >
                        <div className="appBarSpacer" /> */}
                        <main className={classes.content}>
                        <div className="appBarSpacer" />
                        <Container maxWidth="lg" className={classes.container}>
                            <Switch>

                                <Route path="/explore">
                                    <ExplorePage />
                                </Route>

                                <Route path="/profile/edit">
                                    <Edit_profile />
                                </Route>

                                <Route path="/profile/analytics" >
                                    <Analytics />
                                </Route>
                                
                                <Route path="/saved" >
                                    <ViewSaveContent />
                                </Route>

                                <Route path="/explore" >
                                    <ExplorePage />
                                </Route>

                            </Switch>
                        </Container>

                        </main>
                    </div>                                        

            </> 
        )

}

const mapStateToProps = (state) => {
    return {
        ... state ,
        avatar : state.UserReducer.avatar ,
        name : state.UserReducer.firstname +" " +  state.UserReducer.lastname         
    }
}

export default connect (mapStateToProps) (Dashboard) ;