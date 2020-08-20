import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Alerts from '../Alerts';
const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function AlignItemsList() {
  const classes = useStyles();
  const [userList, setUserList] = useState();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=15');
      setUserList(response.data.results)
    } catch (error) {
      console.error(error);
    }
  }

  const handleClick = (user) => {
    axios.post('http://localhost:3000/users/add-user', {
        title: user.name.title,
        first: user.name.first,
        last: user.name.last,
        location: user.location.country,
        email: user.email,
        picture: user.picture.thumbnail
      })
      .then(function (response) {
        if(response.status === 200) {
            setShowAlert(true)
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const userLists = () => {
    return !userList ? null : userList.map(data =>
        <React.Fragment>
            <ListItem button alignItems="flex-start" key={data.id} onClick={() => handleClick(data)}>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={data.picture.thumbnail} />
                </ListItemAvatar>
                <ListItemText
                    primary={data.name.title + ' ' + data.name.first + ' ' + data.name.last + ' ' + `(Age: ${data.dob.age})`}
                    secondary={
                        <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {data.location.country}
                        </Typography>
                        {` - Cell:  ${data.cell} / Phone:  ${data.phone} / Email:  ${data.email}`}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </React.Fragment>
    )
  }

  return (
    <List className={classes.root}>
        {<Alerts show={showAlert} setShow={setShowAlert}/>}
        {userLists()}
    </List>
  );
}
