/**
 * Created by Kndarp on 6/11/2017.
 */
import React from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import MarketButton from './MarketButton';
import https from 'https';

const urlParams = require('../config/nseUrlParams');
const proxy = require('../config/proxy');

export default class Markets extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            nseEQLink: null,
            nseFOLink: null,
            nseINDLink: null,
            nseCURLink: null,
            bseLink: null,
            ncdexLink: null
        };
        this.handleNSELinks = this.handleNSELinks.bind(this);
        this.handleBSEEqLink = this.handleBSEEqLink.bind(this);
        this.handleNCDEXLink = this.handleNCDEXLink.bind(this);
    }

    handleNSELinks(param){
        let self = this;

        //load config variables
        let type = urlParams.types[param];
        let section = urlParams.sections[param];
        let stateName = urlParams.states[param];
        let date = this.props.date;

        let rootUrl = "https://www.nseindia.com";
        let url = null;

        if(param!=="cur")
            url =  `/ArchieveSearch?h_filetype=${type}&date=${date}&section=${section}`;
        else
            url = `/products/dynaContent/derivatives/currency/currencyFileSearch.jsp?fileType=1&inputDt=${date}`;

        //Call to get links and set state with them
        axios.get(proxy.url+rootUrl+url)
            .then(function (response) {
                if(response.status === 200) {
                    let $ = cheerio.load(response.data);
                    let downloadRelativeLink = $('a').attr('href');
                    console.log(downloadRelativeLink);
                    if(downloadRelativeLink!== undefined){
                        self.setState({
                            [stateName] : rootUrl+downloadRelativeLink
                        });
                    }
                }
            })
            .catch(function (err) {
                console.error(err);
            })
    }

    handleBSEEqLink(){
        let self = this;
        let rootUrl = "http://www.bseindia.com" ;
        let ddmmyy = null;
        let dateString = this.props.date;

        if (dateString !== null){
            ddmmyy = dateString.slice(0,2)+dateString.slice(3,5)+dateString.slice(8);
            console.log(`dateString = ${dateString} ; ddmmyy = ${ddmmyy}`);
            let downloadRelativeLink = `/download/BhavCopy/Equity/EQ${ddmmyy}_CSV.ZIP`;
            let options = {path: proxy.url+rootUrl+downloadRelativeLink,method: 'HEAD'},
                req = https.request(options, function(r) {
                    console.log(`BSE Link Status : ${r.statusCode}`);
                    if(r.statusCode >= 200 && r.statusCode < 400){
                        self.setState({
                            bseLink : rootUrl+downloadRelativeLink
                        });
                    }
                });
            req.end();

        }


    }

    handleNCDEXLink(){
        let self = this;
        let rootUrl = "https://www.ncdex.com/" ;
        let mmddyyyy = null;
        let dateString = this.props.date;

        if (dateString !== null){
            mmddyyyy = `${dateString.slice(3,5)}-${dateString.slice(0,2)}-${dateString.slice(6)}`;
            console.log(`dateString = ${dateString} ; mmddyyyy = ${mmddyyyy}`);
            let downloadRelativeLink = `/Downloads/Bhavcopy_Summary_File/Export_csv/${mmddyyyy}.csv`;
            let options = {path: proxy.url+rootUrl+downloadRelativeLink,method: 'HEAD'},
                req = https.request(options, function(r) {
                    console.log(`NCDEX Link Status : ${r.statusCode}`);
                    if(r.statusCode >= 200 && r.statusCode < 400){
                        self.setState({
                            ncdexLink : rootUrl+downloadRelativeLink
                        });
                    }
                });
            req.end();

        }
    }

    componentWillMount(){
        this.handleNSELinks("eq");
        this.handleNSELinks("fo");
        this.handleNSELinks("ind");
        this.handleNSELinks("cur");
        this.handleBSEEqLink();
        this.handleNCDEXLink();
    }

    render(){
        return (
            <div>
                <MarketButton link = {this.state[urlParams.states.eq]} label = {urlParams.buttonNames.eq} />
                <MarketButton link = {this.state[urlParams.states.fo]} label = {urlParams.buttonNames.fo} />
                <MarketButton link = {this.state[urlParams.states.ind]} label = {urlParams.buttonNames.ind} />
                <MarketButton link = {this.state[urlParams.states.cur]} label = {urlParams.buttonNames.cur} />
                <MarketButton link = {this.state.bseLink} label = {urlParams.buttonNames.bse} />
                <MarketButton link = {this.state.ncdexLink} label = {urlParams.buttonNames.ncdex} />
            </div>
        )
    }

};
