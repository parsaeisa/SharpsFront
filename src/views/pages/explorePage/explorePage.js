import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";

import { useState, useEffect, useCallback } from "react";
import '../../styles/explorePage.scss';
import serverURL from '../../../utils/serverURL';
import Like from "../likeContent/like";
import Block from "../likeContent/block";

import { Link, withRouter } from "react-router-dom";
import SaveContent from "../saveContent/saveContent";
import InfiniteScroll from "react-infinite-scroll-component";
import ShowMoreText from "react-show-more-text";
import Search from './component/search' ;

import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LinearBuffer from "./component/progress_bar_search";
import Badge from "react-bootstrap/Badge";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const drawerWidth = 160;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  search: {
    position: "relative",

    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  appBar: {
    // zIndex: theme.zIndex.drawer + 1,
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
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function ExplorePage(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState({ items: [], total: "" });
  const [hasMore, setHasMore] = useState(true);
  const [nextPage, SetNextPage] = useState(
    serverURL() + "user/suggestions?skip=0&limit=40&showAds=true"
  );
  const [value, setValue] = useState(0);
  const [contentGet, setContentGet] = useState(false);

  const [searching , setSearching] = useState(false);
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(async () => {
    if (contentGet == false) {
      fetchData();
      setContentGet(true);
    }

    // await timeout(20);
  }, []);

  const fetchData = () => {
    console.log(localStorage.getItem("token") + "hhhhhhhhhhhhhhh");
    fetch(nextPage, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((result) => {
        console.log("sanaaaaaaaaaaa");
        if (result.status === 200) {
          //   setValue(value+1)
          // SetNextPage(serverURL()+"user/suggestions?skip="+value+"&limit=10&showAds=false");
          return result.json();
        }

        if (result.status === 401) {
          // window.location.replace("/login")
        }
      })
      .then(function (response) {
        setContent((prevState) => ({
          ...prevState,
          items: response.items,
          total: response.total,
        }));
        // console.log("data")
        // setValue(value + 10)
        // SetNextPage(serverURL() + "user/suggestions?skip=" + value + "&limit=10&showAds=true");
      })

      .then((response) => {});
  };
  {
    console.log(content + "cont");
  }
  {
    console.log(value + "valueeee");
  }
  return (
    <div>      
      <AppBar style={{ background: '#ffffff' }} position="absolute" className={clsx(classes.appBar, props.drawerOpen && classes.appBarShift)}>
                        <Toolbar className="toolbar">                                                

                        <Search
                          fetchData = {() => {
                            fetchData();
                          }}
                          drawerOpen = {props.drawerOpen}
                          setContent = {(content) => {
                            setContent(content);
                          }}

                          setSearching = {(searching) => {
                            setSearching(searching);
                          }}

                        />

                        <Typography style={{flexGrow : '1'}} component="h1" variant="h6" color="inherit" noWrap>                            
                        </Typography>       
                        </Toolbar>
                    </AppBar>
                    {searching && < LinearBuffer />}
      <div className={classes.root}>
        <CssBaseline />



        <div className="appBarSpacer" />
        <div className="explore">
          <InfiniteScroll
            scrollThreshold="90%"
            dataLength={content.items.length}
            // next={ search == false ? fetchData() : null}
            hasMore={hasMore}
            loader={
              //  <h4>Loading...</h4>
              <div
                style={{
                  width: "100%",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <div className="loading" />
              </div>
            }
            endMessage={null}
          >
            {content.length === 0 ? (
              <div></div>
            ) : (
              content.items.map((item, index) => {
                if (item)
                  return (
                    <div style={{ spacing: "50%" }}>
                      <div class="card mb-3">
                        <div class="row no-gutters">
                          <div class="col-md-4">
                            <img
                              variant="top"
                              src={
                                item.image != null
                                  ? item.image
                                  : "https://om.rosheta.com/upload/61e6aa724ce98c29726e423dd146e4bc9435f9ea5eca681a349a2e2ab0a23494.png"
                              }
                              rounded
                              class="card-img"
                              alt="..."
                            ></img>
                            <div
                              class="card-footer w-100 text-muted"
                              className=" horizontal-card-footer"
                            >
                              <div
                                style={{
                                  display: "flex",
                                  content: "center",
                                  paddingLeft: "20px",
                                  marginTop: "",
                                }}
                              >
                                {index == 0 ? (
                                  <div></div>
                                ) : (
                                  <SaveContent url={item.url} />
                                )}
                                {index == 0 ? (
                                  <div></div>
                                ) : (
                                  <Like url={item.url} />
                                )}
                              </div>
                            </div>
                          </div>
                          <div class="col-md-8">
                            <div
                              className="reportwrapper"
                              style={{
                                float: "right",
                                display: "inline-block",
                                marginTop: "13px",
                                color: "black",
                              }}
                            >
                              {index == 0 ? (
                                <div></div>
                              ) : (
                                <Block url={item.url} />
                              )}
                            </div>
                            <div class="card-body">
                              <h5 class="card-title">{item.title}</h5>
                              <p
                                class="card-text"
                                style={{
                                  display: "inline",
                                  whiteSpace: "pre-line",
                                }}
                              >
                                <ShowMoreText
                                  lines={2}
                                  more="Show more"
                                  less="Show less"
                                  // more={<ExpandMore />}
                                  // less={<ExpandLess />}
                                  className="content-css"
                                  anchorClass="my-anchor-css-class"
                                  expanded={false}
                                  keepNewLines={true}
                                  width={500}
                                >
                                  {item.des}
                                </ShowMoreText>
                              </p>
                              {index == 0 ? (
                                <div
                                  style={{
                                    fontSize: "25px",
                                    paddingTop: "10px",
                                  }}
                                >
                                  <h5>
                                    <Badge pill variant="secondary">
                                      ads
                                    </Badge>{" "}
                                  </h5>
                                </div>
                              ) : (
                                <div></div>
                              )}
                              {index == 0 ? (
                                <div> </div>
                              ) : (
                                <div style={{ paddingTop: "10px" }}>
                                  <Link to={"//" + item.url} target="_blank">
                                    {" "}
                                    <Button
                                      variant="contained"
                                      className="view-page-button"
                                      endIcon={<ArrowForwardIcon />}
                                    >
                                      visit
                                    </Button>{" "}
                                  </Link>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
              })
            )}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ExplorePage);
