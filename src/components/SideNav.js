import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';

export default function SideNav() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[
          { text: 'ახალი შესყიდვა', icon: <AddCircleOutlineIcon /> },
          { text: 'შესყიდვის დადასტურება', icon: <CheckCircleOutlineIcon /> }
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <Link to={`/${item.text}`}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
              </Link>
              <Link 
                style={{textDecoration:'none', color:'black'}}
                to={`/${item.text}`}>
                <ListItemText primary={item.text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          { text: 'დეპარტამენტები', icon: <LocationCityRoundedIcon /> },
          { text: 'თანამშრომლები', icon: <PersonAddIcon /> },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <Link to={`/${item.text}`}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
              </Link>
              <Link 
                style={{textDecoration:'none', color:'black'}}
                to={`/${item.text}`}>
                <ListItemText primary={item.text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
        </IconButton>
        <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
    </div>
  );
}
