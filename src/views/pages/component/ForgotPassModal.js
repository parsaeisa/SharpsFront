// import React from 'react';
// import history from "../../../core/modules/history";

// // import {
// //   Button,
// //   Form,
// //   FormGroup,
// //   Label,
// //   Input,
// //   FormText,
// //   InputGroup,
// // } from "react-bootstrap";

// // const ForgotPassModal = () => 
// // {
// // const closeM = ()=>{
// // }
// //   return (
// // <div style={{backgroundColor:"red",height:"200px",width:"200px"}}></div>
      

// //   );
// // };

// // export default ForgotPassModal;



// import { Button, Modal, Form, Input, Radio } from 'antd';
// const FormItem = Form.Item;

// const CollectionCreateForm = 
//   ( e ) => {
//     const { visible, onCancel, onCreate, form } = e;
//     const { getFieldDecorator } = form.getFieldDecorator;
//     return (
//       <Modal
//         visible={visible}
//         title="Create a new collection"
//         okText="Create"
//         onCancel={onCancel}
//         onOk={onCreate}
//       >
//         <Form layout="vertical">
//           <FormItem label="Title">
//             {getFieldDecorator('title', {
//               rules: [{ required: true, message: 'Please input the title of collection!' }],
//             })(
//               <Input />
//             )}
//           </FormItem>
//           <FormItem label="Description">
//             {getFieldDecorator('description')(<Input type="textarea" />)}
//           </FormItem>
//           <FormItem className="collection-create-form_last-form-item">
//             {getFieldDecorator('modifier', {
//               initialValue: 'public',
//             })(
//               <Radio.Group>
//                 <Radio value="public">Public</Radio>
//                 <Radio value="private">Private</Radio>
//               </Radio.Group>
//             )}
//           </FormItem>
//         </Form>
//       </Modal>
//     );
//   };


// class ForgotPassModal extends React.Component {
//   state = {
//     visible: false,
//   };
//   showModal = () => {
//     this.setState({ visible: true });
//   }
//   handleCancel = () => {
//     this.setState({ visible: false });
//   }
//   handleCreate = () => {
//     const form = this.form;
//     form.validateFields((err, values) => {
//       if (err) {
//         return;
//       }

//       console.log('Received values of form: ', values);
//       form.resetFields();
//       this.setState({ visible: false });
//     });
//   }
//   saveFormRef = (form) => {
//     this.form = form;
//   }
//   render() {
//     return (
//       <div>
//         <Button type="primary" onClick={this.showModal}>New Collection</Button>
//         <CollectionCreateForm
//           ref={this.saveFormRef}
//           visible={this.state.visible}
//           onCancel={this.handleCancel}
//           onCreate={this.handleCreate}
//         />
//       </div>
//     );
//   }
// }
// export default ForgotPassModal;