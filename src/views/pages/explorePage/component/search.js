import { useState , React} from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import AdvancedSearch from './advanced_search';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import callapi_explore_search from '../callapi_explore/callapi_search' ;
import '../../../styles/explorePage.scss';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import Popover from '@material-ui/core/Popover';
import SearchPanel from './searchPanel';

const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
  }));

export default function Search(props) {

    const [searched , setSearched] = useState("");
    const [openAdvancedSearch , setOpenAdvancedSearch]   = useState(false);
    const [searchMode , setSearchMode] = useState("") ;
    const [isSearched , setIsSearched ] = useState(false);
    const [search , setSearch] = useState(false);

    const [anchorEl , setAnchorEl] = useState(null);

    const popover_id = 'search-panel' ;

    return (
        <>
        <AdvancedSearch
        open = {false}
        handleChange = {(mode) => {
          setSearchMode(mode)
        }}
        handleClose = {() => {
          setOpenAdvancedSearch(false);
        }}
      />
        <Paper  component="form" className='searchFormPaper' aria-describedby = {popover_id} >                            
            <InputBase
            onClick = {(event) => {
                setAnchorEl(event.currentTarget);
            }}
            className = "inputBase"                                                           
                placeholder="Search Content"                              
                onChange = {(e) => {
                setSearched(e.target.value);
                }}
            />
            <IconButton onClick = {async () => {
                props.setSearching(true);
                const search_respoonse = await callapi_explore_search(searched  , searchMode);
                props.setSearching(false);
                setSearch(true);
                props.setContent((prevState) => ({                                  
                    items: search_respoonse.items,
                    total: search_respoonse.total
                }));
            }}  
                >
                <SearchIcon />
            </IconButton>
            <Divider orientation="vertical" />                            
            </Paper> 

            <Popover 
            id = {popover_id}
            anchorEl = {anchorEl}
            open={Boolean(anchorEl)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}

            className = "popover"
            >
                The content of the Popover.
                <SearchPanel />
            </Popover>

            <IconButton onClick= {() => {
                setOpenAdvancedSearch(true);
            }} >
            <FilterListIcon />
            </IconButton >

            {search &&
            <Button className="Button" variant="contained" onClick={() => {
            props.fetchData();
            setSearch(false);                            
            }} color="secondary" autoFocus>
            cancel
            </Button> }

        </>        
    )

}