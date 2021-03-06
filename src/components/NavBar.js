import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, Badge } from '@material-ui/core';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Home, AccountCircle, AssignmentInd, LocalLibrary, Receipt, ShoppingCart } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import './NavBar.css'
import { CartContext } from '../contexts/Cart'
import { AuthContext } from '../contexts/Auth'
import AuthService from '../services/auth.service';

import {

  Link
} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openAcc = Boolean(anchorEl);



  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ backgroundColor: '#2196f3' }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
            Library
          </Typography>
          {/* Cart */}
          <CartContext.Consumer>
            {({ cartItems }) =>
              <Badge badgeContent={cartItems.length} color="secondary">
                <ShoppingCart />
              </Badge>
            }
          </CartContext.Consumer>

          <AuthContext.Consumer>
            {({ auth,user,changeLogin }) =>
              <div>
                { auth ?  <div className='dflex'>
                <Typography variant="h6" noWrap className='mx'> {user.name}</Typography> 
                <Typography variant="h6" noWrap style={{ cursor: 'pointer' }} onClick={()=>{changeLogin(false); AuthService.logout()}}> Logout</Typography> 
                </div> : 
                 <div>
                 <IconButton
                   aria-label="account of current user"
                   aria-controls="menu-appbar"
                   aria-haspopup="true"
                   onClick={handleMenu}
                   color="inherit"
                 >
                   <AccountCircle />
                 </IconButton>
                 <Menu
                   id="menu-appbar"
                   anchorEl={anchorEl}
                   anchorOrigin={{
                     vertical: 'top',
                     horizontal: 'right',
                   }}
                   keepMounted
                   transformOrigin={{
                     vertical: 'top',
                     horizontal: 'right',
                   }}
                   open={openAcc}
                   onClose={handleClose}
                 >
                   <MenuItem onClick={handleClose}>
                   <Link to='/signin' style={{ textDecoration: 'none' }} >Signin</Link>
                   </MenuItem>
                   <MenuItem onClick={handleClose}>
                   <Link to='/signup' style={{ textDecoration: 'none' }} >Signup</Link>
                   </MenuItem>
                 </Menu>
                 </div>
                }
                
               
                
              </div>

            }
          </AuthContext.Consumer>

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          Menu
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <ListItem button >
              <ListItemIcon> <Home /></ListItemIcon>
              <ListItemText primary='Home' ></ListItemText>
            </ListItem>
          </Link>
          {[{ link: 'users', icon: <AssignmentInd /> }, { link: 'books', icon: <LocalLibrary /> }, { link: 'transactions', icon: <Receipt /> }].map((item, index) => (
            <Link to={item.link} style={{ textDecoration: 'none' }} key={index}>
              <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.link} />
              </ListItem>
            </Link>
          ))}

        </List>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}

      </main>
    </div>
  );
}
