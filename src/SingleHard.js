import React, { Component } from 'react';
import SinglePlayer from './SinglePlayer';

class SingleHard extends Component {

    render() {
        var timeNow = Date.now()
        return(
            <SinglePlayer now = {timeNow} size = {64} />
        )
    }
}
export default SingleHard
