import React from 'react';
import {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Demo from './demo1.js';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './home.css';

import PlaynowCard from './playnowcard.js'
import RulesCard from './RulesCard.js';
import ResultsCard from './ResultsCard'
import { Typography } from '@material-ui/core';
import SignInForm from '../SignInForm/SignInForm'

import playimage from './playimg.png';

import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';

const axios = require('axios');


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  close:{
    float:'right',
    zIndex:1000,
    boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0)',
  }
}));

export default function Home(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [data,setData] = React.useState([]);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlelog = () => {
    props.onlog();
    
  }


  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const fetchData = () =>{
    axios.get('https://node.ecell-iitkgp.org/hunt/getSortedListOfAllParticipants/')
          .then(res=>{
            const data = res.data.details;
            console.log(data);
            let allData = [];
            data.map((e,i)=>{
              if(e.name){
                allData[i] = {
                  name:e.name,
                  email:e.email,
                  score:e.score
                } 
              }
              else{
                allData[i] = {
                  name:e.name_iit,
                  email:e.email_iit,
                  score:e.score
                } 
              }
            })
            setData(allData);
          })
  }
  return (
    <div className='home-container'>
      
      <Grid container className={classes.root} direction='column' spacing={0}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={0}>
            <div className='heading-main'>
              <h2>Tressure Hunt</h2>
            </div>
          </Grid>
          <Grid container justify="center" spacing={0} className='cards-container'>
          <Link to="/rules">
            <div><RulesCard /></div>
            </Link>
            <div onClick={handleOpen}><PlaynowCard /></div>
            <div  onClick={()=>{fetchData(); handleOpen1();}}><ResultsCard /></div>
          </Grid>
          <Grid container justify="center" spacing={0}>
            <h6 className='subtitle'>
              <i>POWERED BY - ENTREPRENEURSHIP CELL,IIT KHARAGPUR</i>
            </h6>
          </Grid>
        </Grid> 
      </Grid>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        disableBackdropClick='true'
        BackdropProps={{
          timeout: 2000,
        }}
      >
        <Fade in={open}>
          <div className='paper'>
            <IconButton aria-label="delete" className={classes.close} onClick={handleClose} size="large">
              <CancelIcon fontSize="large" />
            </IconButton>
            <SignInForm onlog={handlelog}/>
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal1}
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
        BackdropComponent={Backdrop}
        disableBackdropClick='true'
        BackdropProps={{
          timeout: 2000,
        }}
      >
        <Fade in={open1}>
          <div className='paper1'>
            <IconButton aria-label="delete" className={classes.close} onClick={handleClose1} size="large" style={{position:'absolute',right:0}}>
              <CancelIcon fontSize="large" />
            </IconButton>
            <Demo data = {data}/>
          </div>
        </Fade>
      </Modal>


    </div>
  );
}
