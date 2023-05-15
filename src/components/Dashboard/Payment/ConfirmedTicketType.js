import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

export default function ConfirmedTicketTyppe({ ticket }) {
  const [category, setCategory] = useState();
  useEffect(() => {
    if (ticket?.data.TicketType.isRemote) {
      setCategory('Online');
    }
    if (!ticket?.data.TicketType.isRemote && ticket?.data.TicketType.includesHotel) {
      setCategory('Presencial + Com hotel');
    }
    if (!ticket?.data.TicketType.isRemote && !ticket?.data.TicketType.includesHotel) {
      setCategory('Presencial + Sem Hotel');
    }
  }, []);

  return (
    <Container>
      <p>Ingresso escolhido</p>
      <ContainerType>
        <p>{category}</p>
        <p>R$ {ticket?.data.TicketType.price}</p>
      </ContainerType>
    </Container>
  );
};

const Container = styled.div`
    width: 100%;
    margin-top: 37px;
    margin-bottom: 30px;
    & > p{
      font-family: 'Roboto';
      font-size: 20px;
      font-weight: 400;
      color: #8E8E8E;
    }
`;

const ContainerType = styled.div`
    display: flex;
    width: 290px;
    height: 108px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 17px;
    background-color: #FFEED2;
    border-radius: 20px;
    p:first-child {
        font-family: 'Roboto';
        font-size: 16px;
        font-weight: 400;
        line-height: 19px;
        color: #454545;
    }
    p:last-child {
      font-size: 14px;
      font-family: 'Roboto';
      font-weight: 400;
      line-height: 16px;
      color: #898989;
    }
`;
