import React from "react";
import { render, screen , fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // I use the userEvent package to manage events rather than fireEvent
import "@testing-library/jest-dom/extend-expect";
import Edit_profile from '../editprofile' ;

import Adapter from 'enzyme-adapter-react-16';
import { shallow , configure } from "enzyme";
 
test('display whole editprofile component ' , async() => {
    render(<Edit_profile />);

//     const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
})

test('display dialog after clicking on button' , async() => {

    render(<Edit_profile />);    
    fireEvent.click(screen.getByText('Edit Profile'))    

    // await waitFor(() => screen.getBy ('Collapse'));
    await waitFor(() => screen.getByText('Save'));
    await waitFor(() => screen.getByText('Add photo'));
    // await waitFor(() => screen.getByText('Username'));

})

configure({adapter: new Adapter()});
describe('<Edit_profile />' , async function(){
    it('return ant design collapes' , async function (){
        const wrapper = shallow(<Edit_profile />);
        expect(wrapper.find('Panel').length).toBe(5); //to.have.length(5);
    })
})  