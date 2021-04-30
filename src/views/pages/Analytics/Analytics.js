import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DonatChart from './components/Donat_chart';
import LineChart from './components/Line_chart';
import BarChart from './components/Bar_chart' ;
import "../../styles/analytics.css";
import BlockedTable from './components/blocked_links_table';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },    
  title: {
    flexGrow: 1,
  },  
  appBarSpacer:
  {
    height : '30px'
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 300,
  },
}));

export default function Analytics() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>            
            <Grid item xs={12} md={8} lg={8}>
              <Paper elevation={4} className={fixedHeightPaper}>                
                <LineChart />
              </Paper>
            </Grid>            
            <Grid item xs={12} md={4} lg={4}>
              <Paper elevation={4} className={fixedHeightPaper}>
                <DonatChart />
              </Paper>
            </Grid>            
            <Grid item xs={12} md={4} lg={4}>
              <Paper elevation={4} className={fixedHeightPaper}>
                <BarChart />
              </Paper>
            </Grid>            
            <Grid item xs={12} md={8} lg={8}>
              <Paper elevation={4} className={classes.paper}>                
                <BlockedTable />
              </Paper>
            </Grid>
          </Grid>          
        </Container>
      </main>
    </div>
  );
}