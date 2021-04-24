import React from 'react';
import { connect } from 'react-redux' ;
import * as UserAction from "../../../../core/edit_profile/action/UserAction" ;
import { Image } from 'antd';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Button from '@material-ui/core/Button';
import 'antd/dist/antd.css';
import '../../../styles/edit_profile.css' ;

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

class Avatar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading : false
        }
    }      
    
    uploadImage = async (e) => {        
        const file = e.target.files[0];          
        const base64 = await this.convertBase64(file); 
        console.log(btoa(encodeURIComponent(base64)));                        
        this.props.SET_AVATAR(btoa(base64))        
    }


    convertBase64 = (file) => {
        return new Promise((resolve , reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
  
            fileReader.onload = () => {
              resolve(fileReader.result);
            };
  
            fileReader.onerror = (err) => {
                reject(err);
            };
        })
    }

    
    handleCancel = () => this.setState({ previewVisible: false });

    // handlePreview = async file => {
    // if (!file.url && !file.preview) {
    //     file.preview = await getBase64(file.originFileObj);
    // }

    // this.setState({
    //     previewImage: file.url || file.preview,
    //     previewVisible: true,
    //     previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    // });
    // };

    // handleChange = ({ fileList }) => this.setState({ fileList });

    render() {
    // const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    // const uploadButton = (
    //     <div>
    //     <PlusOutlined />
    //     <div style={{ marginTop: 8 }}>Upload</div>
    //     </div>
    //     // <Button
    //     //     variant="contained"
    //     //     color="secondary"
    //     //     // className={classes.button}
    //     //     startIcon={<AddAPhotoIcon />}
    //     // >
    //     //     Add photo
    //     // </Button>
    // );

    const avatar = "avatar" ;

    return (
        <>
            <div className="imageHolder">              
                <Image                        
                        width={150}
                        height={150}                                    
                        src={this.props.avatar != null ? atob(this.props.avatar) : "https://i.stack.imgur.com/l60Hf.png"}
                    />
            </div>
            <div className="camera_button">
                <input accept="image/*"
                style={{display : "none" }}
                    id={avatar}
                    name= {avatar}
                    type="file"
                    onChange={(e) => {                        
                        this.uploadImage(e);                        
                            this.uploadImage(e);
                        this.uploadImage(e);                        
                    }}/>
                <label htmlFor={avatar}>
                    <Button
                        component="span"
                        variant="contained"
                        color="primary"
                        // className={classes.button}
                        startIcon={<AddAPhotoIcon />}
                    >
                            Add photo
                    
                    </Button> 
                </label>
            </div>
        </>
    );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,      
        avatar : state.UserReducer.avatar ,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {      
        SET_AVATAR : (t) => dispatch (UserAction.setAvatar(t)) , 
    }
}
  
export default connect (mapStateToProps , mapDispatchToProps) (Avatar); 