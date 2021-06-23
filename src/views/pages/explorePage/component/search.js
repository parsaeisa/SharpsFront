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
import SearchPanel from './searchPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
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

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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
      <div className = "accordeonRoot" >
        <Accordion style={{marginLeft : '30px' , paddingRight : '0px'}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')} elevation={4}>
            <AccordionSummary            
            expandIcon={<ExpandMoreIcon />}            
            >
                <Paper  component="form" className='searchFormPaper'  >                            
                    <InputBase            
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
                    {/* <Divider orientation="vertical" /> */}
                </Paper> 

                {search &&
                <Button className="Button" variant="contained" onClick={() => {
                props.fetchData();
                setSearch(false);                            
                }} color="secondary" autoFocus>
                cancel
                </Button> }
            </AccordionSummary>
            <AccordionDetails>
                <SearchPanel />                        
            </AccordionDetails>
        </Accordion>
    </div>

        </>        
    )

}