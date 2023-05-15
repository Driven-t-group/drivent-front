import { BsCheckCircleFill } from 'react-icons/bs';
import styled from 'styled-components';

export default function ConfirmedPayment() {
  return (
    <Container>
      <ContainerFill>
        <BsCheckCircleFill style={{ color: '#36B853' }} />
        <ContainerConfirm>
          <p>Pagamento confirmado!</p>
          <p>Prossiga para escolha de hospedagem e atividades</p>
        </ContainerConfirm>
      </ContainerFill>
    </Container>

  );
};

const Container = styled.div`
    width: 100%;
`;

const ContainerConfirm = styled.div`
    display: flex;
    flex-direction: column;
    p:first-child {
        font-family: 'Roboto';
        font-size: 16px;
        font-weight: 700;
        line-height: 19px;
    }
    p:last-child {
        font-family: 'Roboto';
        font-size: 16px;
        font-weight: 700;
        line-height: 19px;
    }
`;

const ContainerFill = styled.div`
display: flex;
gap: 17px;
align-items: center;
`;
