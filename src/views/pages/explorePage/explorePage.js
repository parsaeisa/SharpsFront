import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';

import { useState, useEffect ,useCallback } from "react";
import '../../styles/explorePage.css';
import serverURL from '../../../utils/serverURL';

import Like from "../likeContent/like";
import Block from "../likeContent/block";

import { withRouter } from 'react-router-dom';
import Edit_profile from '../editProfile/editprofile';
import SaveContent from "../saveContent/saveContent";
import InfiniteScroll from 'react-infinite-scroll-component';
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
  const [hasMore, setHasMore] =useState(true);
  const[ nextPage, SetNextPage] = useState(serverURL()+"user/suggestions?skip=0&limit=10&showAds=true");
  const [value, setValue] =useState(0);
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(async () => {
    fetchData()
    
    // await timeout(20);
  }, []);

  const fetchData = (value)=>{
  
  console.log(localStorage.getItem('token')+"hhhhhhhhhhhhhhh")
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
        setContent((prevState) => ({
          ...prevState,
          items: response.items,
          total: response.total
        }))
        // console.log("data")
        setValue(value+10)
        SetNextPage(serverURL()+"user/suggestions?skip="+value+"&limit=10&showAds=true");
      })
      
      .then((response) => {
       
        // if(response.next === null){
        //   setHasMore(false)
        // }
      });
   
    }
 { console.log(content+"cont")}
 { console.log(value+"valueeee")}
  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />

        
          {/* <div className={classes.drawerHeader} /> */}
          <div className="explore">

         <InfiniteScroll
                scrollThreshold="90%"
                dataLength={content.items.length}

                next={fetchData()}
                hasMore={hasMore}
                loader={
                //  <h4>Loading...</h4>
                <div style={{width: "100%", justifyContent:"center", display:"flex"}}>
                <div className="loading" />
                </div>
            }
                endMessage={ null
                }>
            {content.length === 0 ? <div></div> :
              content.items.map((item) => {
                if (item) return (
                  <div style={{ spacing: "50%" }}>
                    <div class="card mb-3 " >
                      <div class="row no-gutters">
                        <div class="col-md-4" >
                          <img variant="top" src={item.image != null ? item.image : "https://om.rosheta.com/upload/61e6aa724ce98c29726e423dd146e4bc9435f9ea5eca681a349a2e2ab0a23494.png"} rounded class="card-img" alt="..." ></img>
                        
  </div>
                    <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title">{item.title}</h5>
                            <p class="card-text"> {item.des +"..." } </p>
                            <div>
                            {/* <a href={"//" + item.url} class="stretched-link" /> */}
                            </div>
                          </div>
                          <div class="card-footer w-100 text-muted" className=" horizontal-card-footer">
                            <div style={{ display: "flex",content:"center", height: "40px", marginBottom: "2px",paddingLeft:"20px" }}  >

<SaveContent url={item.url}  />
<Like url={item.url}   />
{/* <Block url={item.url}  /> */}
          
        </div>
                           
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
