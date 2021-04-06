import React, { useState , Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import 'antd/dist/antd.css';
import { Layout , Modal, Button , Collapse } from 'antd';

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

function callback(key) {
  console.log(key);
}  
const {Panel} = Collapse ;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function Edit_profile (props) {        
        
    
    const classes = useStyles();        
    const [visible, setVisible] = useState(false);
    return (           
      <>    
          <Button type="primary" onClick={() => setVisible(true)}>
            Open Modal of 1000px width
          </Button>
          <Modal
            title="Modal 1000px width"
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={1000}
          >
            <Collapse onChange={callback}>
              <Panel header="This is panel header 1" key="1">
                <Collapse defaultActiveKey="1">
                  <Panel header="This is panel nest panel" key="1">
                    <p>{text}</p>
                  </Panel>
                </Collapse>
              </Panel>
              <Panel header="This is panel header 2" key="2">
                <p>{text}</p>
              </Panel>
              <Panel header="This is panel header 3" key="3">
                <p>{text}</p>
              </Panel>
            </Collapse>
          </Modal>
      </>
    )    
}

export default  withRouter(Edit_profile);