import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import useProcessPayment from '../../../hooks/api/useProcessPayment';
import Cards from 'react-credit-cards';
import { toast } from 'react-toastify';
import ConfirmedTicketTyppe from './ConfirmedTicketType';
import ConfirmedPayment from './ConfirmedPayment';
import useTicket from '../../../hooks/api/useTicket';

function CardContainer() {
  const { ticket, ticketLoadding } = useTicket();
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [validThru, setValidThru] = useState('');
  const [cvc, setCvc] = useState('');
  const { processPayment } = useProcessPayment();

  async function doPayment(e) {
    e.preventDefault();

    if (!cardNumber || !name || !cvc) {
      toast('Informe todos os dados.');
      return;
    }
  
    const cardData = {
      issuer: 'credit',
      number: Number(cardNumber),
      name,
      cvv: cvc,
      expirationDate: new Date().toISOString()
    };
  }

  if(ticketLoadding) {
    return <div>...loading</div>;
  }

  return (
    <>
      <Header>Pagamento</Header>
      <ContainerCard>
        <ConfirmedTicketTyppe ticket={ticket} />
        <ContainerContent>
          <p>Pagamento</p>
          <Content>
            {ticket.data.status === 'RESERVED' ? (
              <>
                <CardData>
                  <Cards
                    cvc={cvc}
                    name={name}
                    number={cardNumber}
                    expiry={validThru}
                  />
                </CardData>
                <form onSubmit={doPayment}>
                  <input
                    type="text"
                    value={cardNumber}
                    placeholder="Card Number"
                    onChange={(event) => setCardNumber(event.target.value)}
                  ></input>
                  <input
                    type="text"
                    value={name}
                    placeholder="Name"
                    onChange={(event) => setName(event.target.value)}
                  ></input>
                  <Container>
                    <input type="number" value={cvc} placeholder="cvc" onChange={(event) => setCvc(event.target.value)}></input>
                    <input
                      pattern='[1-9]{2}/[1-9]{4}'
                      value={validThru}
                      placeholder="01/2022"
                      onChange={(event) => setValidThru(event.target.value)}
                    ></input>
                  </Container>
                </form>
              </>
            ) : <ConfirmedPayment />}
          </Content>
        </ContainerContent>
        {ticket.data.status === 'RESERVED' ? <button onClick={doPayment}>FINALIZAR PAGAMENTO</button>: ''}

      </ContainerCard>
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
  width: 706px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  form {
    display: flex;
    flex-direction: column;
    gap: 9px;
    input {
      height: 30px;
      width: 100%;
      border: 1px solid #cccccc;
      border-radius: 6px;
      padding-left: 10px;
    }
  }
`;

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const ContainerCard = styled.div`
  button{
    background-color: #E0E0E0;
    width: 182px;
    height: 37px;
    border-radius: 4px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border: none;
    cursor: pointer;
    font-weight: 400;
    font-size: 14px;
    font-family: 'Roboto';
  }
`;

const CardData = styled.div`
  width: 350px;
  height: 200px;
  padding: 20px;
  display: flex;
  align-items: flex-end;
  border-radius: 12px;
  background-color: #cdcdcd;
`;

const ContainerContent = styled.div`
  width: 100%;
  & > p{
      font-family: 'Roboto';
      font-size: 20px;
      font-weight: 400;
      color: #8E8E8E;
    }
`;
