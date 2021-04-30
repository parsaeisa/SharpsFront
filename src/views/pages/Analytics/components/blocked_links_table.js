import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default class BlockedTable extends React.Component {


    constructor (props)
    {
        super(props);
        this.state = {
            blocked_links : [] ,
            blocked_topics : [] ,
        } ;
    }
    
    componentWillMount()
    {
        // request to back to get blocked links and topics 
    }
    
    render ()
    {
        const createData = (name, fat) => {
            return { name,  fat };
        }

        const rows = [
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
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell> <b>Blocked Links </b></TableCell>
                    {/* <TableCell align="right">Blocked Tags </TableCell>             */}
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
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
        );
    }
}
