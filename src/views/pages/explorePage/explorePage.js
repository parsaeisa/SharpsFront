import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import InputBase from '@material-ui/core/InputBase';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useState, useEffect } from "react";
import '../../styles/explorePage.css';
import serverURL from '../../../utils/serverURL';
import tokenConfig from '../../../utils/tokenConfig';

import { Link, withRouter } from 'react-router-dom';
import Edit_profile from '../editProfile/editprofile';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },


  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },


  search: {
    position: 'relative',

    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function ExplorePage() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState({ items: [], total: "" });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  useEffect(async () => {
    fetchData()
  });

  const fetchData = () => {

    fetch(serverURL() + "user/suggestions", {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    })
      .then((result) => {
        console.log(result)
        if (result.status === 200) {
          return result.json()
        }

        if (result.status === 401) {
          window.location.replace("/login")
        }
      }
      )
      .then(function (response) {
        setContent((prevState) => ({
          ...prevState,
          items: response.items,
          total: response.total
        }))
        console.log("data")
      });
  }
  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />

        <AppBar style={{ background: '#0f0b3e' }}
          position="fixed"
          className={classes.appBar}
        >
          <Toolbar>
            <Typography variant="h6" noWrap>
              𝓼𝓱𝓪𝓻𝓹
          </Typography>
            <div className="ex">
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div >
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerContainer}>
            <List>
              <ListItem button key="Homme" style={{ paddingTop: "30%" }}>
                <ListItemIcon>
                  <HomeIcon> </HomeIcon>
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem >
              <li>
                <ListItem button key="Profile">
                  <ListItemIcon>
                    <AccountCircleIcon></AccountCircleIcon>
                  </ListItemIcon>                  
                  {/* <ListItemText primary="Profile" style={{ color: "black" }} />                   */}
                  <Edit_profile />
                </ListItem>
              </li>
              <ListItem button key="Saved">
                <ListItemIcon>
                  <TurnedInIcon></TurnedInIcon>
                </ListItemIcon>
                <ListItemText primary="Saved" />

              </ListItem>
              <ListItem button key="Logout">
                <ListItemIcon>
                  <ExitToAppIcon></ExitToAppIcon>
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <div className="explore">
            {content.length === 0 ? <div></div> :
              content.items.map((item) => {
                if (item) return (
                  <div style={{ spacing: "50%" }}>
                    <div class="card mb-3 " >
                      <div class="row no-gutters">
                        <div class="col-md-4" >
                          <img variant="top" src={item.image != null ? item.image : "https://om.rosheta.com/upload/61e6aa724ce98c29726e423dd146e4bc9435f9ea5eca681a349a2e2ab0a23494.png"} rounded class="card-img" alt="..."></img>
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title">{item.title}</h5>
                            <p class="card-text"> {item.des} </p>
                            <a href={"//" + item.url} class="stretched-link" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

          </div>
        </main>
      </div>

    </div>
  );

}

export default withRouter(ExplorePage);
