import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Popper from '@material-ui/core/Popper';

class Dashboard extends Component { 
    state = {
        anchorEl: null,
      }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget })
      }
    
    handleClose = () => {
    this.setState({ anchorEl: null })
    }

    render() {
        const { anchorEl } = this.state;

        return(
            <div style = {{textAlign:'center', margin: '20px' }}>
                <Typography variant="display3" gutterBottom>
                    Memory Game
                </Typography>
                <Button style = {{margin:'10px'}} variant="contained" color="primary" onClick={this.handleClick}>
                    Single player
                </Button>  
                <Popper
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                >
                    <MenuList>
                        <MenuItem onClick={() => this.props.history.push('/singleEasy')}>Easy mode</MenuItem>
                        <MenuItem onClick={() => this.props.history.push('/singleHard')}>Hard mode</MenuItem>
                    </MenuList>
                </Popper>
                <Button variant="contained" color="primary" onClick={() => this.props.history.push('/twoPlayer')}>
                    Two player
                </Button>  
          </div>  
        )
    }
}

export default Dashboard;
