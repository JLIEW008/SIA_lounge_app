import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Jumbotron,Grid,Row,Col,Image,Button} from 'react-bootstrap';
import './home.css'
export default class Home extends Component {
    render() {
        return (
            <Grid>
                <Jumbotron>
                    <h2>Welcome to code life </h2>
                    <p>This is how to build a website with react, react router and bootstrap</p>
                </Jumbotron>
                <Link to ="/about">
                    <Button bsStyle= "primary">About </Button>
                </Link>
            </Grid>
        )
    }
}
