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

var size = 36

class DuoPlayer extends Component {
  constructor(props) {
    super(props)
    var temp = []
    var displayTemp = []
    let size_half = size / 2
    for(let i=0;i<size_half;i++){
      temp[i] = Math.floor(Math.random() * 7);
      temp[i + size_half] = temp[i];
      displayTemp[i] = -1;
      displayTemp[i+size_half] = -1;
    }
    shuffle(temp);

	this.state={
      array:temp,
      displayArray:displayTemp,
      firstClick:false,
      secondClick:false,
      open:false,
      score1:0,
      score2:0,
      unsaved:true,
      turn:true, //true: palyer 1's round
    }
  }
  
  handleClick(i){
    const { array, displayArray, firstClickIcon,firstClick,turn,score1,score2 } = this.state;
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
          firstClick:false,
          firstClickIcon:null
        })
        if(turn){
          this.setState({
            score1:score1 + 2,
          })
        }
        else{
          this.setState({
            score2:score2 + 2,
          })
        }
        let endFlag = true
        for(let i=0;i<size;i++){
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
      this.setState({
        turn:!turn
      })
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
            Player1 Score:{this.state.score1}<br/> Player2 Score:{this.state.score2}
          </Typography>
        </div>
        <div style = {root}>
            <GridList style={gridList} className="board" cols={Math.sqrt(size)}>
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
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth = {true}
            >
            <DialogTitle> {"Congraduations!"}</DialogTitle>:
            <DialogContent>
                <DialogContentText>
                { this.state.score1 > this.state.score2 ? "Player1 win!" : (this.state.score1 === this.state.score2 ? "Tie, good game!":"Player2 win!")}
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

export default withRouter(DuoPlayer)
