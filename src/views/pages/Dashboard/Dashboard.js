import React from 'react';
import clsx from 'clsx';

import EqualizerIcon from '@material-ui/icons/Equalizer';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Drawer from '@material-ui/core/Drawer';
import ExplorePage from '../explorePage/explorePage';
import Edit_profile from '../editProfile/editprofile' ;
import { makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Analytics from '../Analytics/Analytics';

const drawerWidth = 240;


class Dashboard extends React.Component 
{

    constructor(props){
        super(props);

        this.state= {
            open : false
        }
    }



    render()
    {
        const classes = makeStyles((theme) => ({

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
                height: '100vh',
                overflow: 'auto',
            },
            appBar: {
                zIndex: theme.zIndex.drawer + 1,
            },
            appBarSpacer: theme.mixins.toolbar,
            container: {
                paddingTop: theme.spacing(4),
                paddingBottom: theme.spacing(4),
            },
            contentShift: {
                transition: theme.transitions.create('margin', {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen,
                }),
                marginRight: drawerWidth,
            },
        }))

        return (
            <>
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
                        [classes.contentShift]: this.state.open,
                    })}
                    >
                        <div className={classes.appBarSpacer} />
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

                            </Switch>
                        </Container>
                    
                    </main>

            </> 
        )
    }

}

export default Dashboard ;