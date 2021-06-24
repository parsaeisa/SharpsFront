import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import "../../../styles/analytics.scss";

export default function  CountUp (props)
{
    return (
        <div className="countupRoot">
            <CssBaseline />
            <main >          
                <Container  className="container">            

                <Grid direction="column" countainer >
                    <Grid item xs={6} md={6} lg={12} className = "countupItem">
                        <Typography className = "countupText" variant = "h5" > 
                            {props.number}
                        </Typography >
                    </Grid>       
                    <Grid item xs={6} md={6} lg={12} className = "countupItem">
                        <Typography className = "countupText" variant = "h5" > 
                        {props.title} 
                        </Typography>  
                    </Grid>                                                 
                </Grid>
                </Container>
            </main>        
        </div>
    )
}