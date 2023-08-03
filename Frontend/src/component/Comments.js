import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function Comments({comments}) {
  // console.log(typeof(comments));
  // console.log(comments);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    {
      comments.map((comment, idx) => 
        <>
        <ListItem alignItems="flex-start" key={ idx }>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={PF + "noAvatar.png"} />
          </ListItemAvatar>
          <ListItemText
            style={{fontWeight:'700 !important'}}
            primary={comment.username}
        
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {comment.comment}
                </Typography>
              </React.Fragment>
            }
          />
          
        </ListItem>
        {
          // idx < comments.size() && <Divider variant="inset" component="li" />
        }
        </>
      )
    }
    </List>
  )
}
