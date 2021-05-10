import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, makeStyles, Button, Drawer, Link, MenuItem, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { PersonOutline, ShoppingCartOutlined, SearchOutlined } from "@material-ui/icons";

const headersData = [
  {
    label: "Minha Conta",
    href: "/",
  }
];

const useStyles = makeStyles(() => ({
  header: {
    color: "#000",
    backgroundColor: "#fff",
    padding: "0px 100px",
    "@media (max-width: 971px)": {
      padding: 0,
      margin: 0,
    },
  },
  menuButton: {
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
    "@media (max-width: 1110px)": {
      marginLeft: 0,
    },
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
  inputBuscarDesktop: {
    width: "inherit",
    height: 25,
    border: "none",
    borderBottom: "1px solid #000"
  },
  inputBuscarMobile: {
    height: 25,
    border: "none",
    borderBottom: "1px solid #000",
    width: "inherit"
  },
  marginRight10: {
    marginRight: 10
  },
  width80: {
    width: "80%"
  },
  width55: {
    width: "45%"
  },
  center: {
    margin: "0 auto"
  },
  justifyContent: {
    display: "flex",
    justifyContent: "center"
  },
  txtCarrinho: {
    color: "#fff",
    backgroundColor: "#F8475F",
    fontWeight: "bold",
    textAlign: "center",
    minWidth: "25px",
    borderRadius: "50%"
  }
}));

export default function Header(props) {
  const { header, menuButton, spaceBetween, drawerContainer, inputBuscarDesktop, inputBuscarMobile, marginRight10, width80, width55, center, justifyContent, txtCarrinho } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 972
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={spaceBetween}>
        {corebizLogo}
        {
          !mobileView
          ?
            <div className={[width55, justifyContent].join(' ')}>
              <input type="text" placeholder="O que está procurando?" className={inputBuscarDesktop} />
              <Button
                {...{
                  key: "Search",
                  color: "inherit",
                  to: "/",
                  component: RouterLink,
                }}
              >
                <SearchOutlined />
              </Button>
            </div>
          :
            <>
            </>
        }
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <>
        <Toolbar className={spaceBetween}>
          <Button
            {...{
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: handleDrawerOpen,
            }}
          >
            <MenuIcon />
          </Button>

          <Drawer
            {...{
              anchor: "left",
              open: drawerOpen,
              onClose: handleDrawerClose,
            }}
          >
            <div className={drawerContainer}>{getDrawerChoices()}</div>
          </Drawer>

          <div>{corebizLogo}</div>
          <Button
            {...{
              key: "Carrinho",
              color: "inherit",
              to: "/",
              component: "Carrinho",
              className: menuButton,
            }}
          >
            <ShoppingCartOutlined />
          </Button>
        </Toolbar>
        <div className={[center, justifyContent, width80].join(' ')}>
          <input type="text" placeholder="O que está procurando?" className={inputBuscarMobile} />
          <Button
            {...{
              key: "Search",
              color: "inherit",
              to: "/",
              component: "Search",
            }}
          >
            <SearchOutlined />
          </Button>
        </div>
      </>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          <MenuItem>
            <PersonOutline className={marginRight10} />{label}
          </MenuItem>
        </Link>
      );
    });
  };

  const corebizLogo = (
    <img src="/images/site-logo-corebiz-preto-cinza.png" alt="logo" />
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <>
          <Button
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: RouterLink,
              className: menuButton,
            }}
          >
            <PersonOutline className={marginRight10} />{label}
          </Button>
          <Button
            {...{
              key: "Carrinho",
              color: "inherit",
              to: "/",
              component: "Carrinho",
              className: menuButton,
            }}
          >
            <ShoppingCartOutlined />
            <Typography className={txtCarrinho}>
              {props.carrinho}
            </Typography>
          </Button>
        </>
      );
    });
  };

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}