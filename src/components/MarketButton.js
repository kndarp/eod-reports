/**
 * Created by Kndarp on 6/12/2017.
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const buttonStyle = {
    margin: 5
};

export default class MarketButton extends React.Component{

    render(){
        return (
                <a href={this.props.link} target="_blank" rel="noopener noreferrer">
                    <RaisedButton
                        disabled={this.props.link===null}
                        primary ={true}
                        label={this.props.label}
                        style = {buttonStyle}
                    />
                </a>
                )
    }

}
