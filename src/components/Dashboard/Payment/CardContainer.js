import React from 'react';
import axios from 'axios';
import card_icon from '../../../assets/images/enter_icon.png';
import styled from 'styled-components';
import { useState } from 'react';

function CardContainer({ ticket }) {
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [validThru, setValidThru] = useState('');
  const [cvc, setCvc] = useState('');
  const [paymentConfirm, setPaymentConfirm] = useState('');

  function doPayment(e) {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL;
    const cardData = {
      cardNumber,
      name,
      cvc,
    };
    axios
      .post(`${url}/process`, { ticketId: ticket.id, cardData })
      .then((response) => alert('Entrada realizada com sucesso'))
      .catch((error) => alert(error.response.data));
    setCardNumber('');
    setPaymentConfirm('Pagamento realizado com sucesso');
  }

  return (
    <>
      <Header>Pagamento</Header>
      {paymentConfirm ? (
        <div>'Pagamento realizado com sucesso'</div>
      ) : (
        <Content>
          (<img alt="card" src={card_icon} />
          <form onSubmit={doPayment}>
            <input
              type="text"
              value={cardNumber}
              placeholder="Card Number"
              onChange={(event) => setPaymentConfirm(event.target.value)}
            ></input>
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(event) => setName(event.target.value)}
            ></input>
            <input
              type="date"
              value={validThru}
              placeholder="valid Thru"
              onChange={(event) => setValidThru(event.target.value)}
            ></input>
            <input type="number" value={cvc} placeholder="cvc" onChange={(event) => setCvc(event.target.value)}></input>
            <button type="submit">FINALIZAR PAGAMENTO</button>
          </form>
          )
        </Content>
      )}
    </>
  );
}

export default CardContainer;

const Header = styled.header`
  font-size: 2.125rem;
  font-family: 'Roboto', sans-serif;
`;

const Content = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
