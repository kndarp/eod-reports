/**
 * Created by Kndarp on 6/10/2017.
 */
import React from 'react';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import Markets from "./Markets";
import moment from "moment";



const centerAlign = {
    textAlign : "center"
};

export default class MainStepper extends React.Component {

    constructor(props) {
        super(props);
        this.handleDate = this.handleDate.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);

        this.state = {
            date: null,
            stepIndex: 0,
            dateString: null
        }

    }

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1, date: null, dateString: null});
        }
    };

    handleDate = (event, value)=> {
        let dateValue = moment(value).format('DD-MM-YYYY')
        this.setState({
            date: value,
            dateString: dateValue
        });
    };

    renderStepActions(step) {
        const {stepIndex} = this.state;

        return (
            <div style={{margin: '12px 0', display: "inline"}}>
                {step < 1 && (<RaisedButton
                    label={'Get links'}
                    disabled={stepIndex === 1}
                    primary={true}
                    onTouchTap={this.handleNext}
                    style={{marginRight: 12}}
                />
                )}
                {step > 0 && (
                    <FlatButton
                        label="Clear"
                        disabled={stepIndex === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onTouchTap={this.handlePrev}
                    />
                )}
            </div>
        );
    };

    render() {
        const {stepIndex} = this.state;

        return (
            <div style={{ margin: 'auto'}}>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>Set Date</StepLabel>
                        <StepContent>
                             <DatePicker
                                                hintText="Tap here to set date"
                                                autoOk={true}
                                                maxDate={ new Date()}
                                                // shouldDisableDate={this.disableWeekends}
                                                value={this.state.date}
                                                onChange = {this.handleDate}
                                                style={centerAlign}
                                                textFieldStyle={centerAlign}
                                                onTouchTap={this.props.action}
                                            />
                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Download EOD Reports</StepLabel>
                        <StepContent>
                            <Markets date = {this.state.dateString}/>
                            {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        );
    }
}

