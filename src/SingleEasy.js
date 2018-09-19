import React, { Component } from 'react';
import SinglePlayer from './SinglePlayer';

class SingleEasy extends Component {

    render() {
        var timeNow = Date.now()
        return(
            <SinglePlayer now = {timeNow} size = {36} />
        )
    }
}
export default SingleEasy
