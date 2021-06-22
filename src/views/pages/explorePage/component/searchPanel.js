import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import '../../../styles/explorePage.scss';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width : '100px'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth : 400
    },
  }));

export default function SearchPanel (props)
{
    const classes = useStyles();  
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(Number(event.target.value) || '');
        if(event.target.value == 10)
          props.handleChange("URL") ;
        else
          props.handleChange("title");
      };

    return (    
        <form className={classes.container}>            
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Mode</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={age}
                onChange={handleChange}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>Both</em>
                </MenuItem>
                <MenuItem value={10}>URL</MenuItem>
                <MenuItem value={20}>title</MenuItem>                
              </Select>
            </FormControl>
        </form>
    )
}