import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import callapi_analytics_get_blockedDomains from '../callapi_analytics/callapi_analytics_blockdomains';

export default class BlockedTable extends React.Component {


    constructor (props)
    {
        super(props);
        this.state = {
            blocked_domains : [] ,
            blocked_topics : [] ,
        } ;
    }
    
    async componentWillMount()
    {
        // request to back to get blocked links and topics         
    }
    
    render ()
    {
        const createData = (name) => {
            return { name};
        }

        const rows = [
            // this.props.data.map((domain) => 
            //     createData(domain)
            // )
            createData('https://www.telerik.com/kendo-react-ui/components/charts/series-types/bar/#toc-100-stacked-bar', 159),
            createData('https://material-ui.com/components/tables/', 237),
            createData('https://trello.com/c/0f7ZPHGN/85-profile-analytics-features', 262 ),
            createData('https://trello.com/', 305) ,  
        ];
          
        const classes =  makeStyles({
            table: {
              minWidth: 650,
            },
        });

        return (
            <>
            {this.state.blocked_domains.length != 0 ?
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell> <b>Blocked Links </b></TableCell>
                        {/* <TableCell align="right">Blocked Tags </TableCell>             */}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.blocked_domains.map((row) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            <a href = {row.name}>
                            {row.name}
                            </a>
                        </TableCell>              
                        {/* <TableCell align="right">{row.fat}</TableCell> */}
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            :
                    <div>
                         <Typography variant="h6" style = {{color : "#757575"}} >
                            You haven't blocked any domain . 
                        </Typography>
                    </div>
            }
            </>
        );
    }
}
