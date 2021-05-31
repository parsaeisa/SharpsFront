import React from "react";
import { render, screen , fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // I use the userEvent package to manage events rather than fireEvent
import "@testing-library/jest-dom/extend-expect";
import Adapter from 'enzyme-adapter-react-16';
import { shallow , configure } from "enzyme";
import { Provider } from "react-redux";
import store from "../../../../core/store/index";
import { StateMock } from '@react-mock/state';
import Analytics from "../Analytics" ;
import LineChart from "../components/Line_chart"  ;
import DonatChart from "../components/Donat_chart";
import BarChart from "../components/Bar_chart";
import BlockedTable from '../components/blocked_links_table' ;

 describe('authenticate action', () => {
    
    test('display whole editprofile component ' , async() => {        
        render(            
                <Analytics />            
        );

    })
 })

 
test('display dialog after clicking on button' , async() => {

    render(
            <Analytics />            
        );    
    
    
    // await waitFor(() => screen.getByText('Save'));
    // // await waitFor(() => screen.getByText('Add photo'));    

    // await waitFor(() => screen.getByText('Username :'));
    // await waitFor(() => screen.getByText('Name :'));
    // await waitFor(() => screen.getByText('Email :'));
    // await waitFor(() => screen.getByText('Password :'));
    // await waitFor(() => screen.getByText('deactivate'));


})

test('display line chart' , () => {
    render(<LineChart  />)
    expect(screen.getByText('Hours')).toBeInTheDocument() ;
    expect(screen.getByText('Activity')).toBeInTheDocument() ;

    [
        'Sat','Sun','Mon','Tue','Wen','Thu','Fri'
        ].map(t => {
            expect(screen.getByText(t)).toBeInTheDocument() ;
        })
})

test('display Donat chart', () => {
    render(<DonatChart />)
    expect(screen.getByText('favorite topics')).toBeInTheDocument() ;
})

test('display bar chart' , () => {
    render(<BarChart />) 
    expect(screen.getByText('favorite Links')).toBeInTheDocument() ;
})


test('display blocked addresses table ' , () => {
    render(<BlockedTable />) 
})

const renderBlockedTable = (state) => render(
    <StateMock state = {state} >
        <BlockedTable />
    </StateMock>
);

it ("show you haven't blocked " , async () => {
    const {notblocked} = renderBlockedTable({blocked_domains : []});

    expect(screen.getByText("You haven't blocked any domain .")).toBeInTheDocument() ;
})

it ("render blocked lists " , async () => {
    const {notblocked} = renderBlockedTable({
                blocked_domains : ['google.com' , 'facebook.com'] ,
                selected : []
            });

    expect(screen.getByText("google.com")).toBeInTheDocument() ;
    expect(screen.getByText("facebook.com")).toBeInTheDocument() ;

    
})

it ("render selecteds to unblock" , async () => {
    const {notblocked} = renderBlockedTable({
                blocked_domains : ['google.com' , 'facebook.com'] ,
                selected : ['google.com']
            });

    expect(screen.getByText("google.com")).toBeInTheDocument() ;
    expect(screen.getByText("facebook.com")).toBeInTheDocument() ;

    expect(screen.getByText("1 selected to be unblocked")).toBeInTheDocument() ;
})