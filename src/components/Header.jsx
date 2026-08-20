import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import './header.css'
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { useMediaQuery } from '@mui/material';
import ContrastIcon from '@mui/icons-material/Contrast';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import logoDark from '../assets/logo-dark.png'
import { getUserById } from '../services/userServices';
import { useEffect, useState, useContext } from "react"
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';
import CoffeeRoundedIcon from '@mui/icons-material/CoffeeRounded';
import { toast } from 'react-toastify';

const headerMenu = [
  {
    name: "Products",
    url: "/products",
    icon: <CoffeeRoundedIcon />
  },
  {
    name: "Purchase",
    url: "/purchase",
    icon: <ShoppingBasketRoundedIcon />
  },
  {
    name: "Cart",
    url: "/cart",
    icon: <LocalGroceryStoreRoundedIcon />
  },
]

const Header = () => {

  const isMobile = useMediaQuery("(max-width:756px)");
  const { pathname } = useLocation()

  const { theme, toggleTheme } = useContext(ThemeContext)
  const [user, setUser] = useState(null)
  const [drawerOpen, setdrawerOpen] = useState(false);
  const navigate = useNavigate()

  const toggleDrawer = (newOpen) => () => {
    setdrawerOpen(newOpen);
  };
  //  menu 
  const id = React.useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [token, setToken] = useState(
    sessionStorage.getItem("token")
  )
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userID');

    setToken(null)
    setUser(null)

    navigate('/login')
  }

  useEffect(() => {
    const userID = sessionStorage.getItem("userID")
    const token = sessionStorage.getItem("token")

    setToken(token)

    if (!userID || !token) {
      return
    }

    const fetchUser = async () => {
      try {
        const data = await getUserById(userID, token)
        setUser(data)
      } catch (error) {
        console.error(error)
         toast.error(`error: ${error.message}`)
        
      }
    }

    fetchUser()
  }, [pathname])

  const profile = token
    ? [

      {
        name: "Logout",
        action: handleLogout,
        icon: <LogoutIcon />
      }
    ]
    : [
      {
        name: "Register",
        url: "/register",
        icon: <AppRegistrationIcon />
      },
      {
        name: "Login",
        url: "/login",
        icon: <LoginIcon />
      }
    ]

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" >
      {token && user &&
        <List>
          <ListItem  >
            <div className='flex-1 profile-menu gap-1 ' >
              <div className="mt-10">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: "45px", height: "45px" }} />
              </div>

              <div>
                <p className='mt-10'>{user.name}</p>
                <p className="id-admin">{user.email}</p>
              </div>

            </div>
          </ListItem>
        </List>}
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => toggleTheme()}>
            <ListItemIcon>
              <ContrastIcon />
            </ListItemIcon>
            <ListItemText primary="Change theme" />
          </ListItemButton>
        </ListItem>
        {
          headerMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => { navigate(item.url); setdrawerOpen(false) }}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))
        }
        {profile.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                if (item.action) {
                  item.action()
                  setdrawerOpen(false)
                } else {
                  navigate(item.url)
                  setdrawerOpen(false)
                }
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Box>
  );

  return (
    <>
      <AppBar className='main-header'>
        <Toolbar>

          <div className='flex-2 header-flex'>
            <div className='icon-header'>
              <Link to='/'>
                {
                  theme === "light" ?
                    <img src={logo} width="150px" alt="" /> :
                    <img src={logoDark} width="150px" alt="" />
                }
              </Link>
            </div>

            {
              !isMobile &&
              <div className='gap-2 flex-3 menu-header'>{
                headerMenu.map((item , index) => (
                  <Link key={index} className={`${pathname === item.url && 'active'}`} to={item.url}>{item.name}</Link>
                ))
              }
              </div>
            }

            <div className='icon-header flex-4'>
              {
                isMobile ?
                  <IconButton onClick={toggleDrawer(true)}>
                    <MenuRoundedIcon />
                  </IconButton>
                  :
                  <div className='flex-1'>
                    <IconButton onClick={() => toggleTheme()}>
                      <ContrastIcon />
                    </IconButton>
                    {/* {token && user && */}
                    <IconButton onClick={handleClick}>
                      <AccountCircleRoundedIcon />
                    </IconButton>

                  </div>
              }

            </div>

            <Menu
              id={menuId}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  'aria-labelledby': buttonId,
                },
              }}
              className="menu-notification"
            >
              {token && user &&
                <div className='flex-1 profile-menu gap-1 mb-20' >
                  <div className="mt-10">
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: "45px", height: "45px" }} />
                  </div>
                  <div>
                    <p className='mt-10'>{user.name}</p>
                    <p className="id-admin">{user.email}</p>
                  </div>
                </div>
              }


              {
                profile.map((item, index) => (
                  <MenuItem
                  key={index}
                    onClick={() => {
                      if (item.action) {
                        item.action()
                        handleClose()
                      } else {
                        navigate(item.url)
                        handleClose()
                      }
                    }}
                  >
                    <div className="flex-1 gap-1 menu-itm">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                  </MenuItem>
                ))
              }
            </Menu>
            <Drawer open={drawerOpen} onClose={toggleDrawer(false)} className='main-drawer'>
              {DrawerList}
            </Drawer>

          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header