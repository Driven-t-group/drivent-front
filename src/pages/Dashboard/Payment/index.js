import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicketsTypes from '../../../hooks/api/useTickets';
import TypeContainer from '../../../components/Dashboard/Payment/TypeContainer';
import { useState } from 'react';
import HotelTypeContainer from '../../../components/Dashboard/Payment/HotelTypeContainer';
import ConfirmTicket from '../../../components/Dashboard/Payment/ConfirmTicket';
import useTicket from '../../../hooks/api/useTicket';
import CardContainer from '../../../components/Dashboard/Payment/CardContainer';
import { useEffect } from 'react';

export default function Payment() {
  const enrollment = useEnrollment().enrollment;
  const ticketsTypes = useTicketsTypes().ticketsTypes;
  const [selectedType, setSelectedType] = useState();
  const { ticket, getTicket, ticketLoadding } = useTicket();
  const [created, setCreated] = useState(false);

  useEffect(() => {
    getTicket();
    console.log(ticket);
  }, [created]);

  if(ticketLoadding) {
    return '';
  }

  return (
    <>
      <Header>Ingresso e Pagamento</Header>

      {!enrollment ? (
        <FinishSubContainer>
          <FinishSubParagraph>Você precisa completar sua inscrição antes de prosseguir pra a escolha de ingresso</FinishSubParagraph>
        </FinishSubContainer>
      ) : (
        ticket | created ? <CardContainer ticket={ticket}/> : (
          <Container>
            <Paragraph>Primeiro, escolha a sua modalidade de ingresso</Paragraph>
            <TypeContainer ticketsTypes={ticketsTypes} selectedType={selectedType} setSelectedType={setSelectedType} />
            {!selectedType?.isRemote && <HotelTypeContainer selectedType={selectedType} setSelectedType={setSelectedType} ticketsTypes={ticketsTypes} />}
            {selectedType && <ConfirmTicket selectedTicket={selectedType} setCreated={setCreated}/>}
          </Container>
        )
      )}
    </>
  );
}

const Header = styled.header`
  font-size: 2.125rem;
  font-family: "Roboto", sans-serif;
`;

const FinishSubContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FinishSubParagraph = styled.p`
  font-size: 1.25rem;
  font-family: "Roboto", sans-serif;
  color: #8E8E8E;
  width: 24.25rem;
  text-align: center;
  margin-top: 15.1875rem;
`;

const Container = styled.div`
  margin-top: 2.3125rem;
  display: flex;
  flex-direction: column;
`;

const Paragraph = styled.div`
  font-size: 1.25rem;
  font-family: "Roboto", sans-serif;
  color: #8E8E8E;
`;
