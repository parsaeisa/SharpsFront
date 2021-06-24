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

 describe('authenticate action', () => {
    
    test('display whole analytics component ' , async() => {        
        render(            
            <Provider store={store} >
                <Analytics />        
            </Provider>    
        );

    })
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


