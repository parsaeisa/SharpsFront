import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { Layout, Space } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const useStyles = makeStyles((theme) => ({        
    paper: {   
        width : '100%'         ,    
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {        
        marginTop : theme.spacing(8) ,
        marginBottom: theme.spacing(6),
        padding: theme.spacing(0),
      },
    },    
  }));

function Edit_profile (props) {        
        
    
    const classes = useStyles();    
    const [isLogin , setIsLogin] = React.useState(true);

    return (           

        <React.Fragment>
            <CssBaseline />                
            <main className='layout'>
                <Paper className={classes.paper}>                                               

                        Hello !!

                </Paper>                    
            </main>
        </React.Fragment>
    )    
}

export default  withRouter(Edit_profile);