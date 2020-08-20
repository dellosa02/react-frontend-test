import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ActionAlerts(props) {
  const classes = useStyles();

  const alert = () => {
    return (
        props.show ? <Alert onClose={() => {props.setShow(false)}}>Successfully added new user! — check it out!</Alert> : null
    )
  }

  return (
    <div className={classes.root}>
      {alert()}
    </div>
  );
}
