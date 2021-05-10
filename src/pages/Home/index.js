import React, { useState, useEffect } from 'react';
import { ListItem, ListItemText, makeStyles, Typography, Divider, Button, TextField } from "@material-ui/core";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as CarouselImg } from 'react-responsive-carousel';

import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';

import api from '../../services/api';

import Header from '../components/Header';
import Footer from '../components/Footer';

const useStyles = makeStyles(() => ({
    carrosel: {
        marginTop: "65px",
        marginLeft: "-8px",
        marginRight: "-8px",
        width: "auto",
        "@media (max-width: 960px)": {
            marginTop: "95px",
        }
    },
    total: {
        width: "100%"
    },
    main: {
        width: "80%"
    },
    bold: {
        fontWeight: "bold"
    },
    column: {
        flexDirection: "column"
    },
    divider: {
        backgroundColor: "#c9c9c9",
        height:"5px",
        marginTop: "5px"
    },
    lineThrough: {
        textDecoration: "line-through"
    },
    fontSize12: {
        fontSize: 12
    },
    fontSize11: {
        fontSize: 11
    },
    fontSize15: {
        fontSize: 15
    },
    fontSize22: {
        fontSize: 22
    },
    fontSize32: {
        fontSize: 32
    },
    off: {
        position: "absolute",
        right: "25px"
    },
    txtCarrosel: {
        position: "absolute",
        color: "#fff",
        top: 0,
        width: "50%",
        height: "100%"
    },
    center: {
        margin: "0 auto"
    },
    alignItems: {
        display: "flex",
        alignItems: "center"
    },
    textAlignStart: {
        textAlign: "start"
    },
    widthInherit: {
        width: "inherit"
    },
    button: {
        backgroundColor: "#000",
        color: "#fff",
        width: "70%",
        fontWeight: "bold",
        margin: "5px 0",
        '&:hover': {
          backgroundColor: "#a0a0a0"
        }
    },
    newsletterBox: {
        backgroundColor: "#f2f2f2",
        paddingTop: "20px",
        paddingBottom: "30px",
        margin: "0 -8px",
        width: "auto"
    },
    backgroundWhite: {
        backgroundColor: "#fff"
    },
    inputNewsletter: {
        width: "25%",
        margin: "0 5px"
    },
    divNewsletter: {
        width: "25%",
        margin: "0 5px",
        color: "red"
    },
    buttonNewsletter: {
        backgroundColor: "#000",
        color: "#fff",
        width: "12%",
        height: "56px",
        fontWeight: "bold",
        margin: "0 5px",
        '&:hover': {
          backgroundColor: "#a0a0a0"
        }
    },
    buttonNewsletterNew: {
        backgroundColor: "#000",
        color: "#fff",
        width: "25%",
        height: "56px",
        fontWeight: "bold",
        margin: "0 5px",
        '&:hover': {
          backgroundColor: "#a0a0a0"
        }
    },
    justifyContent: {
        display: "flex",
        justifyContent: "center"
    },
    marginBottomAuto: {
        marginBottom: "auto"
    }
}));

export default function Home() {
    const [dados, setDados] = useState([]);
    const [carrinho, setCarrinho] = useState(0);
    const [newsletter, setNewsletter] = useState({ name: "", email: "" });
    const [validateEmail, setValidateEmail] = useState(false);
    const [postNewsletter, setPostNewsletter] = useState(false);
    const { carrosel, total, main, bold, column, divider, lineThrough, fontSize12, fontSize11, fontSize15, fontSize22, fontSize32, off, txtCarrosel, center, alignItems, textAlignStart, widthInherit, button, newsletterBox, backgroundWhite, inputNewsletter, divNewsletter, buttonNewsletter, buttonNewsletterNew, justifyContent, marginBottomAuto } = useStyles();

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 650 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 650, min: 440 },
            items: 2
        },
        mini: {
            breakpoint: { max: 440, min: 0 },
            items: 1
        }
    };

    useEffect(() => {
        let localCarrinho = localStorage.getItem('@project-corebiz/carrinho');

        if(localCarrinho) {
            setCarrinho(localCarrinho);
        }

        api
            .get("/products")
            .then(res => {
                const products = res.data;

                setDados(products);
            })
            .catch(error => {
                alert("Ocorreu um erro ao buscar os items");
            });
    }, []);

    const renderItemCarrosel = (number) => {
        return (
            <div key={`carrosel-${number}`}>
                <img src="images/carrosel_item.png" alt={`carrosel-${number}`} />
                <div className={[txtCarrosel, alignItems].join(' ')}>
                    <div className={[center, widthInherit].join(' ')}>
                        <Typography className={[textAlignStart].join(' ')}>Olá, o que você está buscando?</Typography>
                        <Typography className={[textAlignStart, bold, fontSize32].join(' ')}>Criar ou migrar seu e-commerce?</Typography>
                    </div>
                </div>
            </div>
        );
    }

    const renderStars = ({ stars }) => {
        let starsItem = [];

        for(let i = 0; i <= 5; i++) {
            if(i <= stars) {
                starsItem.push(<img src="images/star.png" alt={`star-${i}`} />);
            } else{
                starsItem.push(<img src="images/star_outline.png" alt={`star-${i}`} />);
            }
        }

        return (
            <div>
                {starsItem}
            </div>
        );
    }

    const trataCurrency = (item) => {
        return (item.toString().substr(0, item.toString().length - 2) + "," + item.toString().substr(-2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }

    const onClicComprar = () => {
        let valueCarrinho = parseInt(carrinho) + 1;
        setCarrinho(valueCarrinho);
        localStorage.setItem('@project-corebiz/carrinho', valueCarrinho);
    }

    const onChangeNome = (event) => {
        if(event.target.value) {
            setNewsletter(prevState => ({ ...prevState, name: event.target.value }))
        }
    }

    const onChangeEmail = (event) => {
        let email = event.target.value;
        let usuario = email.substring(0, email.indexOf("@"));
        let dominio = email.substring(email.indexOf("@")+ 1, email.length);

        if ((email) &&
            (usuario.length >= 1) &&
            (dominio.length >= 3) &&
            (usuario.search("@") === -1) &&
            (dominio.search("@") === -1) &&
            (usuario.search(" ") === -1) &&
            (dominio.search(" ") === -1) &&
            (dominio.search(".") !== -1) &&
            (dominio.indexOf(".") >= 1)&&
            (dominio.lastIndexOf(".") < dominio.length - 1)) {
            setNewsletter(prevState => ({ ...prevState, email: email }));
            setValidateEmail(false);
        } else{
            event.target.value = "";
            setValidateEmail(true);
        }
    }

    const onClickNewsletterNew = () => {
        setPostNewsletter(false);
    }

    const onClickNewsletter = (event) => {
        event.preventDefault()

        api
            .post("/newsletter", newsletter)
            .then(res => {
                if(res.data.message) {
                    setPostNewsletter(true);
                }
            })
            .catch(error => {
                alert("Ocorreu um erro ao enviar informações");
            });
    }

    return (
        <>
            <Header carrinho={carrinho} />
            <CarouselImg showThumbs={false} className={carrosel}>
                {
                    [1, 2, 3].map(value => (
                        renderItemCarrosel(value)
                    ))
                }
            </CarouselImg>
            <div className={[carrosel, main, center].join(' ')}><br />
                <Typography className={bold}>Mais Vendidos</Typography>
                <Divider width="5%" className={divider} />
                <Carousel
                    showDots={true}
                    responsive={responsive}
                    infinite={true}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                >
                    {
                        dados.map(item => (
                            <ListItem button key={`item-${item.productId}`} className={column}>
                                <img src={item.imageUrl} alt={item.productName} />
                                <ListItemText primary={item.productName} />
                                {renderStars(item)}
                                {
                                    item.listPrice
                                    ?
                                    <>
                                        <img src="images/item_off.png" alt={`off-${item.productName}`} className={off} />
                                        <Typography className={[lineThrough, fontSize12].join(' ')}>
                                            de R$ {trataCurrency(item.listPrice)}
                                        </Typography>
                                    </>
                                    :
                                    <>
                                    </>
                                }
                                <Typography className={[fontSize22, bold].join(' ')}>
                                    por R$ {trataCurrency(item.price)}
                                </Typography>
                                {
                                    item.installments.length > 0
                                    ?
                                    <Typography className={fontSize11}>
                                        ou em {item.installments[0].quantity}x de R$ {trataCurrency(item.installments[0].value)}
                                    </Typography>
                                    :
                                    <>
                                    </>
                                }
                                <Button className={button} onClick={onClicComprar} >COMPRAR</Button>
                            </ListItem>
                        ))
                    }
                </Carousel>
            </div>
            <br />
            <br />
            <div className={newsletterBox}>
                {
                    !postNewsletter
                    ?
                        <>
                            <Typography className={[fontSize22, bold, justifyContent].join(' ')}>Participe de nossas news com promoções e novidades!</Typography>
                            <br />
                            <form autoComplete="off" className={justifyContent} onSubmit={onClickNewsletter}>
                                <TextField required id="nome" label="Digite seu nome" variant="outlined" className={[inputNewsletter, backgroundWhite, marginBottomAuto].join(' ')} onBlur={onChangeNome} />
                                <div className={divNewsletter}>
                                    <TextField required id="email" label="Digite seu email" variant="outlined" className={[backgroundWhite, total].join(' ')} onBlur={onChangeEmail} {...(validateEmail ? { error: 'true' } : {}) } />
                                    {
                                        validateEmail
                                        ?
                                            <Typography className={fontSize11}>Insira um e-mail válido!</Typography>
                                        :
                                            <>
                                            </>
                                    }
                                </div>
                                <Button type="submit" className={buttonNewsletter}>Eu quero!</Button>
                            </form>
                        </>
                    :
                        <>
                            <Typography className={[fontSize15, bold, justifyContent].join(' ')}>Seu e-mail foi cadastrado com sucesso!</Typography>
                            <Typography className={[fontSize12, justifyContent].join(' ')}>A partir de agora você receberá as novidade e ofertas exclusivas.</Typography>
                            <br />
                            <div className={justifyContent}>
                                <Button className={buttonNewsletterNew} onClick={onClickNewsletterNew}>Cadastrar novo e-mail</Button>
                            </div>
                        </>
                }
            </div>
            <Footer />
        </>
    );
}