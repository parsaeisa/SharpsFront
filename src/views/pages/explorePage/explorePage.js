import React from 'react';
import clsx from 'clsx';
import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import '../../styles/explorePage.css';
import serverURL from '../../../utils/serverURL';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import callapi_explore_search from './callapi_explore/callapi_search' ;
import Toolbar from '@material-ui/core/Toolbar';
import AdvancedSearch from './component/advanced_search';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Like from "../likeContent/like";
import Block from "../likeContent/block";
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import Edit_profile from '../editProfile/editprofile';
import SaveContent from "../saveContent/saveContent";
const drawerWidth = 240;




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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

  const [searched , setSearched] = useState("");
  const [openAdvancedSearch , setOpenAdvancedSearch]   = useState(false);
  const [searchMode , setSearchMode] = useState("") ;

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
      <AdvancedSearch
        open = {openAdvancedSearch}
        handleChange = {(mode) => {
          setSearchMode(mode)
        }}
        handleClose = {() => {
          setOpenAdvancedSearch(false);
        }}
      />
      <AppBar style={{ background: '#ffffff' }} position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
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

                        <Typography style={{flexGrow : '1'}} component="h1" variant="h6" color="inherit" noWrap className={classes.title}>                            
                        </Typography>                                                          

                        <Paper component="form" className='searchFormPaper'>                            
                            <InputBase
                              className={classes.input}
                              placeholder="Search Content"
                              inputProps={{ 'aria-label': 'search' }}
                              onChange = {(e) => {
                                setSearched(e.target.value);
                              }}
                            />
                            <IconButton onClick = { async () => {
                                // set(await callapi_explore_search(searched));
                            }}  
                            type="submit" className={classes.iconButton} aria-label="search">
                              <SearchIcon />
                            </IconButton>
                            <Divider className={classes.divider} orientation="vertical" />                            
                          </Paper> 

                          <IconButton onClick= {() => {
                              setOpenAdvancedSearch(true);
                          }} >
                            <FilterListIcon />
                          </IconButton >

                        <Typography style={{flexGrow : '1'}} component="h1" variant="h6" color="inherit" noWrap>                            
                        </Typography>       
                        </Toolbar>
                    </AppBar>
      <div style={{height : '60px'}} />
      <div className={classes.root}>
        <CssBaseline />

        
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
                          <div style={{ display: "flex",content:"center", height: "40px", marginBottom: "2px",paddingLeft:"20px" }}  >

                     <SaveContent url={item.url}  />
                    <Like url={item.url}  />
                    <Block url={item.url}  />
                   </div>
  </div>
                    <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title">{item.title}</h5>
                            <p class="card-text"> {item.des +"..." } </p>
                
                            <a href={"//" + item.url} class="stretched-link" />

  
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

          </div>
      </div>

    </div>  
  );

}

export default withRouter(ExplorePage);
