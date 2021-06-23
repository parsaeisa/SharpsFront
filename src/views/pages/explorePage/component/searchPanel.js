import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import '../../../styles/explorePage.scss';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

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

    const [ url, setURL] = React.useState(false);
    const [ tag, setTag] = React.useState(false);


    const handleChange = (event) => {
        setAge(Number(event.target.value) || '');
        if(event.target.value == 10)
          props.handleChange("URL") ;
        else
          props.handleChange("title");
      };

    return (    
        // <form className={classes.container}>            
        //     <FormControl className={classes.formControl}>
        //       <InputLabel id="demo-dialog-select-label">Mode</InputLabel>
        //       <Select
        //         labelId="demo-dialog-select-label"
        //         id="demo-dialog-select"
        //         value={age}
        //         onChange={handleChange}
        //         input={<Input />}
        //       >
        //         <MenuItem value="">
        //           <em>Both</em>
        //         </MenuItem>
        //         <MenuItem value={10}>URL</MenuItem>
        //         <MenuItem value={20}>title</MenuItem>                
        //       </Select>
        //     </FormControl>
        // </form>

        <>        
          <FormGroup row>
            <Typography variant="h6" component="h6">
              search priority :
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={url} onChange={() => {
                setURL(!url);
              }} name="url" />}
              label="url"
            />  

            <FormControlLabel
              control={<Checkbox checked={tag} onChange={() => {
                setTag(!tag);
              }} name="tag" />}
              label="tag"
            />  
          </FormGroup>
        </>
    )
}