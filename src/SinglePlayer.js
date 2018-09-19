import React, { Component } from 'react';
import './App.css';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ButtonBase from '@material-ui/core/ButtonBase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { shuffle } from "./Utils";
import Countdown from 'react-countdown-now';

var root = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  overflow: 'hidden',
}

var bar = {
  display: 'flex',
  justifyContent: 'center',
  margin:'15px'
}

var gridList = {
    width:800,
    height:800
}

var timer = 600 * 1000

class SinglePlayer extends Component {
  constructor(props) {
    super(props)
    var temp = []
    var displayTemp = []
    let size = this.props.size
    let size_half = size / 2
    for(let i=0;i<size_half;i++){
      temp[i] = Math.floor(Math.random() * 7);
      temp[i + size_half] = temp[i];
      displayTemp[i] = -1;
      displayTemp[i+size_half] = -1;
    }
    shuffle(temp);
    var bestScore = localStorage.getItem('singleBestScore');

	this.state={
      array:temp,
      displayArray:displayTemp,
      firstClick:false,
      secondClick:false,
      open:false,
      score:0,
      unsaved:true,
      bestScore:bestScore,
      timeOut:false
    }
  }
  
  handleClick(i){
    const { array, displayArray, firstClickIcon,firstClick,score,bestScore } = this.state;
    const newIds = displayArray.slice() 
    if(displayArray[i] >= 0)
      return

    if(!firstClick){
      newIds[i] = array[i] 
      this.setState({
          displayArray:newIds,
          firstClick:true,
          firstClickIcon:i
        })
    }
    else{
      if(array[firstClickIcon] === array[i]){
        newIds[i] = array[i] 

        this.setState({
          displayArray:newIds,
          score:this.state.score + 2,
          firstClick:false,
          firstClickIcon:null
        }, function(){
          if(this.state.score > this.state.bestScore){
            localStorage.setItem("singleBestScore", this.state.score);
            this.setState({
              bestScore:this.state.score
            })

          }
        })
        let endFlag = true
        for(let i=0;i<this.props.size;i++){
            if(newIds[i] < 0){
            endFlag = false
            break
            }
        }    
        if(endFlag){
            this.setState({
                open:true
            })
        }
      }
      else{
        newIds[i] = array[i] 
        this.setState({
          displayArray:newIds,
          firstClick:false,
          firstClickIcon:null
        },function(){
            newIds[i] = -1 
            newIds[firstClickIcon] = -1 
            setTimeout(
              function() {
                this.setState({
                  displayArray:newIds,
                  firstClick:false,
                  firstClickIcon:null
                })
              }
              .bind(this),
              1000
            );
        })
      }
    }
  }
  
  handleClose = () => {
    this.setState({ open: false });
    this.props.history.push('/')
  };

  render() {
    return (
      <div>

        <div style = {bar}>

        <Button style = {{margin:'10px'}} variant="outlined" color="primary" onClick = {() => this.props.history.push('/')}>
          Home Page
        </Button>
        <Button style = {{margin:'10px'}} variant="outlined" color="primary" onClick = {() => window.location.reload()}>
          Reset
        </Button>
        </div>
        <div style = {bar}>
          <Typography variant="title">
            Score:{this.state.score}, Best Score:{this.state.bestScore == null ? 0 : this.state.bestScore}
          </Typography>

        </div>
        <div style = {bar}>
        <pre>
        <Typography variant="body2">
          Timer: <Countdown daysInHours = {true} date={this.props.now + timer} onComplete = {() => this.setState({timeOut:true})}/>
        </Typography>
        </pre>
        </div>
        <div style = {root}>
            <GridList style={gridList} className="board" cols={Math.sqrt(this.props.size)}>
            {this.state.displayArray.map((tile,i) => (
                <GridListTile style = {{height:100}} key={i}>
                    <ButtonBase onClick ={() => {this.handleClick(i)}} >
                <img style={{width:100,height:100}} src={`/img/${tile}.jpg`} alt={tile} />
                </ButtonBase>
            </GridListTile>
            ))}
        </GridList>
        </div>
        <div>
            <Dialog
            open={this.state.open || this.state.timeOut}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth = {true}
            >
            <DialogTitle>{this.state.open ? "Congraduations!" : "Time out"}</DialogTitle>:
            <DialogContent>
                <DialogContentText>
                {(this.state.open ? "Good job. You win!" : "Oops, Time runs out.") + " You will be redirected to the home page."}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                  Confirm
                </Button>
            </DialogActions>
            </Dialog>
        </div>
      </div>
    );
  }
}

export default withRouter(SinglePlayer)
