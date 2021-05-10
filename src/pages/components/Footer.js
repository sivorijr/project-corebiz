import React, { useState, useEffect } from "react";
// import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Button, Typography, Divider } from "@material-ui/core";
import { Mail, HeadsetMic } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  spaceAround: {
    display: "flex",
    justifyContent: "space-around",
  },
  justifyContent: {
    display: "flex",
    justifyContent: "center",
  },
  marginRight10: {
    marginRight: "10px"
  },
  marginRight20: {
    marginRight: "20px"
  },
  width80: {
    width: "80%"
  },
  width30: {
    width: "30%"
  },
  width25: {
    width: "25%"
  },
  center: {
    margin: "0 auto"
  },
  footer: {
    color: "#fff",
    backgroundColor: "#000",
    width: "100%",
    position: "absolute",
    left: 0,
    paddingTop: "45px",
    paddingBottom: "20px"
  },
  bold:{
    fontWeight: "bold"
  },
  divider: {
    backgroundColor: "#fff",
    height:"5px",
    marginTop: "15px"
  },
  marginVertical10: {
    margin: "10px 0"
  },
  marginHorizontal10: {
    margin: "0 10px"
  },
  button: {
    backgroundColor: "#fff",
    fontWeight: "bold",
    margin: "5px 0",
    '&:hover': {
      backgroundColor: "#e9e9e9"
    }
  },
  column: {
    display: "flex",
    flexDirection: "column"
  },
  marginLeft16: {
    marginLeft: "16px"
  },
  marginLeft32: {
    marginLeft: "32px"
  },
  fontSize10: {
    fontSize: "10px"
  },
  row: {
    display: "flex",
    flexDirection: "row"
  },
  alignItems: {
    display: "flex",
    alignItems: "center"
  }
}));

export default function Footer() {
  const { spaceAround, justifyContent, marginRight10, marginRight20, width80, width30, width25, center, footer, bold, divider, marginVertical10, marginHorizontal10, button, column, marginLeft16, marginLeft32, fontSize10, row, alignItems } = useStyles();

  const [state, setState] = useState({
    mobileView: false
  });

  const { mobileView } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 960
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
    return (
      <footer className={footer}>
        <div className={[center, width80, spaceAround].join(' ')}>
          <div>
            <Typography className={bold}>Localização</Typography>
            <Divider width="15%" className={divider} />
            <Typography variant="subtitle2" className={marginVertical10}>Avenida Andrômeda, 2000. Bloco 6 e 8</Typography>
            <Typography variant="subtitle2" className={marginVertical10}>Alphavile SP</Typography>
            <Typography variant="subtitle2" className={marginVertical10}>brasil@corebiz.ag</Typography>
            <Typography variant="subtitle2" className={marginVertical10}>+55 11 3090 1039</Typography>
          </div>
          <div className={[center, column, width25, justifyContent].join(' ')}>
            <Button className={button}><Mail className={marginRight20} />ENTRE EM CONTATO</Button>
            <Button className={button}><HeadsetMic className={marginLeft32} />FALE COM O NOSSO CONSULTOR ONLINE</Button>
          </div>
          <div className={[row, alignItems].join(' ')}>
            <div className={marginHorizontal10}>
              <Typography variant="subtitle2" className={fontSize10}>Created by</Typography>
              <img src="/images/logo-corebiz-preto-cinza.png" alt="logo" />
            </div>
            <div className={marginHorizontal10}>
              <Typography variant="subtitle2" className={marginHorizontal10}>Powered by</Typography>
              <img src="/images/vtex.png" alt="logo" />
            </div>
          </div>
        </div>
      </footer>
    );
  };

  const displayMobile = () => {
    return (
      <footer className={footer}>
        <div className={[center, width80].join(' ')}>
          <Typography className={bold}>Localização</Typography>
          <Divider width="4%" className={divider} />
          <Typography variant="subtitle2" className={marginVertical10}>Avenida Andrômeda, 2000. Bloco 6 e 8</Typography>
          <Typography variant="subtitle2" className={marginVertical10}>Alphavile SP</Typography>
          <Typography variant="subtitle2" className={marginVertical10}>brasil@corebiz.ag</Typography>
          <Typography variant="subtitle2" className={marginVertical10}>+55 11 3090 1039</Typography>
          <br />
          <div className={[center, column, width30].join(' ')}>
            <Button className={button}><Mail className={marginRight10} />ENTRE EM CONTATO</Button>
            <Button className={button}><HeadsetMic className={marginLeft16} />FALE COM O NOSSO CONSULTOR ONLINE</Button>
          </div>
          <br />
          <br />
          <div className={[row, spaceAround].join(' ')}>
            <div>
              <Typography variant="subtitle2" className={[fontSize10, marginVertical10].join(' ')}>Created by</Typography>
              <img src="/images/logo-corebiz-preto-cinza.png" alt="logo" />
            </div>
            <div>
              <Typography variant="subtitle2" className={[fontSize10, marginVertical10].join(' ')}>Powered by</Typography>
              <img src="/images/vtex.png" alt="logo" />
            </div>
          </div>
        </div>
      </footer>
    );
  };

  return (
    <>
      {mobileView ? displayMobile() : displayDesktop()}
    </>
  );
}