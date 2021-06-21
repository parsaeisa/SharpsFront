import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';

import { useState, useEffect, useCallback } from "react";
import '../../styles/explorePage.scss';
import serverURL from '../../../utils/serverURL';

import Like from "../likeContent/like";
import Block from "../likeContent/block";

import { Link, withRouter } from 'react-router-dom';
import Edit_profile from '../editProfile/editprofile';
import SaveContent from "../saveContent/saveContent";
import InfiniteScroll from 'react-infinite-scroll-component';
import ShowMoreText from 'react-show-more-text';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import '../../styles/explorePage.scss';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import callapi_explore_search from './callapi_explore/callapi_search' ;
import Toolbar from '@material-ui/core/Toolbar';
import AdvancedSearch from './component/advanced_search';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import LinearBuffer from './component/progress_bar_search';
import Badge from 'react-bootstrap/Badge';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


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
  const [content, setContent] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextPage, SetNextPage] = useState(serverURL() + "user/suggestions?skip=0&limit=10&showAds=true");
  const [value, setValue] = useState(0);
  const [contentGet , setContentGet] = useState(false);
  const [contentfetch , setContentFetch] = useState(false);


  const [searched , setSearched] = useState("");
  const [openAdvancedSearch , setOpenAdvancedSearch]   = useState(false);
  const [searchMode , setSearchMode] = useState("") ;
  const [searching , setSearching] = useState(false);
  const [search , setSearch] = useState(false);


  const [isSearched , setIsSearched ] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
   
      if(contentGet == false)
      {
        fetchData();
        setContentGet(true);
      }
    
   

    // await timeout(20);
  }, []);

  const fetchData = () => {

    console.log(localStorage.getItem('token') + "hhhhhhhhhhhhhhh")
    fetch(nextPage, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    })
      .then((result) => {
        console.log("sanaaaaaaaaaaa")
        if (result.status === 200) {


          //   setValue(value+1)
          // SetNextPage(serverURL()+"user/suggestions?skip="+value+"&limit=10&showAds=false");
          return result.json()
        }

        if (result.status === 401) {
          // window.location.replace("/login")
        }
      }
      )
      .then(function (response) {
        setValue(value+1)
        SetNextPage(serverURL()+"user/suggestions?skip="+value+"&limit=10&showAds=false");
        setContent(content.concat(response.items))
      })

      .then((response) => {
      });

  }
  { console.log(content + "cont") }
  { console.log(value + "valueeee") }
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
                              // inputProps={{ 'aria-label': 'search' }}
                              onChange = {(e) => {
                                setSearched(e.target.value);
                              }}
                            />
                            <IconButton onClick = {async () => {
                                setSearching(true);
                                const search_respoonse = await callapi_explore_search(searched  , searchMode);
                                setSearching(false);
                                setSearch(true);
                                setContent((prevState) => ({                                  
                                  items: search_respoonse.items,
                                  total: search_respoonse.total
                                }));
                            }}  
                             className={classes.iconButton} >
                              <SearchIcon />
                            </IconButton>
                            <Divider className={classes.divider} orientation="vertical" />                            
                          </Paper> 

                          <IconButton onClick= {() => {
                              setOpenAdvancedSearch(true);
                          }} >
                            <FilterListIcon />
                          </IconButton >

                          {search &&
                          <Button className="Button" variant="contained" onClick={() => {
                            fetchData();
                            setSearch(false);                            
                          }} color="secondary" autoFocus>
                            cancel
                          </Button> }

                        <Typography style={{flexGrow : '1'}} component="h1" variant="h6" color="inherit" noWrap>                            
                        </Typography>       
                        </Toolbar>
                    </AppBar>
                    {searching && < LinearBuffer />}
      <div className={classes.root}>
        <CssBaseline />



        {/* <div className={classes.drawerHeader} /> */}
        <div className="explore">

          <InfiniteScroll
            scrollThreshold="90%"
            dataLength={content.length}

            // next={ search == false ? fetchData() : null}
            hasMore={hasMore}
            loader={
               <h4>Loading...</h4>
              // <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
              //   <div className="loading" />
              // </div>
            }
            endMessage={null
            }>
            {content.length === 0 ? <div></div> :
              content.map((item,index) => {
                if (item) return (
                  <div style={{ spacing: "50%" }}>
                    <div class="card mb-3" >
                      <div class="row no-gutters">
                        <div class="col-md-4" >
                          <img variant="top" src={item.image != null ? item.image : "https://om.rosheta.com/upload/61e6aa724ce98c29726e423dd146e4bc9435f9ea5eca681a349a2e2ab0a23494.png"} rounded class="card-img" alt="..." ></img>
                          <div class="card-footer w-100 text-muted" className=" horizontal-card-footer">

                            <div style={{ display: "flex", content: "center", paddingLeft: "20px", marginTop: "" }}  >
                              {index==0?<div></div> :

                              <SaveContent url={item.url} /> }
                              {index==0?<div></div> :
                              <Like url={item.url} />
              }

                            </div>

                          </div>

                        </div>
                        <div class="col-md-8">
                          <div className="reportwrapper" style={{ float: "right", display: "inline-block", marginTop: "13px", color: "black" }} >
                          {index==0? 
                                        <div></div>:
                            <Block url={item.url} />
                          }
                          </div>
                          <div class="card-body">
                            <h5 class="card-title">{item.title}</h5>
                            <p class="card-text" style={{ display: "inline", whiteSpace: "pre-line" }}>

                              <ShowMoreText
                                lines={2}
                                more='Show more'
                                less='Show less'
                                // more={<ExpandMore />}
                                // less={<ExpandLess />}
                                className='content-css'
                                anchorClass='my-anchor-css-class'
                                expanded={false}
                                keepNewLines={true}
                                width={500}
                              >
                                {item.des}
                              </ShowMoreText>
                            </p>
                            {index==0?<div style={{fontSize:"25px",paddingTop:"10px",}}> 
                          <h5>
                                <Badge pill variant="secondary">
ads</Badge>{' '}</h5></div> :
                            <div></div>
                          }
                            {index==0?<div> </div>:
                             <div   style={{paddingTop:"10px"}}>
                                        <Link to= {"//" + item.url} target="_blank" > <Button
                                        variant="contained"
                                        color="primary"
                                       //  className={classes.button}
                                        endIcon={<ArrowForwardIcon/>}
                                      >
                                        visit
                                      </Button>{' '} </Link>
                                         </div>
              }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </InfiniteScroll>

        </div>
      </div>

    </div>
  );

  
}

export default withRouter(ExplorePage);