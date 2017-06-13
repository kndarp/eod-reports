/**
 * Created by Kndarp on 6/10/2017.
 */
import React, { Component } from 'react';
import TitleBar from './TitleBar'
import Paper from 'material-ui/Paper';
import MainStepper from "./MainStepper.js";


const paperStyle = {
    marginLeft: "20%",
    marginRight: "20%",
    marginTop : 20,
    padding: 20
};

export default class App extends Component {

    render() {
        return (
            <div>
                <TitleBar title={"EOD Reports"}/>
                <Paper style={paperStyle} zDepth={2}>
                    <MainStepper/>
                </Paper>
            </div>
        );
    }
}
