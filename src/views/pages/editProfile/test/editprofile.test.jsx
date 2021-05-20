import React from "react";
import { render, screen , fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // I use the userEvent package to manage events rather than fireEvent
import "@testing-library/jest-dom/extend-expect";
import Edit_profile from '../editprofile' ;
import Adapter from 'enzyme-adapter-react-16';
import { shallow , configure } from "enzyme";
import { Provider } from "react-redux";
import store from "../../../../core/store/index";

 describe('authenticate action', () => {

    test('get the redux store ' , async() => {
        render(<Provider store={store} />)
    })

    test('display whole editprofile component ' , async() => {        
        render(
            <Provider store={store} >
                <Edit_profile />
            </Provider>        
        );

    })
 })

 
test('display dialog after clicking on button' , async() => {

    render(<Provider store={store} >
            <Edit_profile />
            </Provider>
        );    
    fireEvent.click(screen.getByText('Edit Profile'))    
    
    await waitFor(() => screen.getByText('Save'));
    // await waitFor(() => screen.getByText('Add photo'));    

    await waitFor(() => screen.getByText('Username :'));
    await waitFor(() => screen.getByText('Name :'));
    await waitFor(() => screen.getByText('Email :'));
    await waitFor(() => screen.getByText('Password :'));
    await waitFor(() => screen.getByText('deactivate'));

    fireEvent.click(screen.getByText('deactivate'))    
    
    await waitFor(() => screen.getByText("Delete Account"))

    fireEvent.click(screen.getByText('Name :'))   
    await waitFor(() => screen.getByRole ("FirstnameTextField"))
    await waitFor(() => screen.getByRole ("LastnameTextField"))

    fireEvent.click(screen.getByText('Username :'))   
    await waitFor(() => screen.getByRole ("UsernameTextField"))

    fireEvent.click(screen.getByText('Email :'))   
    await waitFor(() => screen.getByRole ("EmailTextField"))

})

// configure({adapter: new Adapter()});
// describe('<Edit_profile />' , async function(){
//     it('return ant design collapes' , async function (){
//         const wrapper = shallow(<Provider store={store} >
//                                     <Edit_profile />
//                                 </Provider>);

//         expect(wrapper.find('Dialog').length).toBe(1); //to.have.length(5);
//     })
// })  