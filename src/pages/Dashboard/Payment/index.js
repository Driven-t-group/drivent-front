import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicketsTypes from '../../../hooks/api/useTickets';

export default function Payment() {
  const enrollment = useEnrollment().enrollment;
  const ticketsTypes = useTicketsTypes().ticketsTypes;

  return (
    <>
      <Header>Ingresso e Pagamento</Header>      
      {enrollment === '' ? (
        <FinishSubContainer>
          <FinishSubParagraph>Você precisa completar sua inscrição antes de prosseguir pra a escolha de ingresso</FinishSubParagraph>
        </FinishSubContainer>
      ) : (
        <Container>
          <Paragraph>Primeiro, escolha a sua modalidade de ingresso</Paragraph>
          <ChoiceContainer>
            {ticketsTypes?.map((ticketType) => {
              return (
                <ChoiceBox>
                  <ChoiceParagraph>{ticketType.name}</ChoiceParagraph>
                  <ValueParagraph>R$ {ticketType.price}</ValueParagraph>
                </ChoiceBox>
              );
            })}
          </ChoiceContainer>
        </Container>
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

const ChoiceContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const ChoiceBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #CECECE;
  border-radius: 1.25rem;
  width: 9.0625rem;
  height: 9.0625rem;
  cursor: pointer;
  margin-right: 1.5rem;
`;

const ChoiceParagraph = styled.p`
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  color: #454545;
`;

const ValueParagraph = styled.p`
  font-size: 0.875rem;
  font-family: "Roboto", sans-serif;
  color: #898989;
  margin-top: 0.25rem;
`;

{/* <ChoiceBox>
              <ChoiceParagraph>Presencial</ChoiceParagraph>
              <ValueParagraph>R$ 250</ValueParagraph>
            </ChoiceBox>

            <ChoiceBox>
              <ChoiceParagraph>Online</ChoiceParagraph>
              <ValueParagraph>R$ 100</ValueParagraph>
            </ChoiceBox> */}
