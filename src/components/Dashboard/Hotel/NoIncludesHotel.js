import styled from 'styled-components';

export default function NoIncludesHotel() {
  return (
    <Container>
      <p>Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</p>
    </Container>);
}

const Container = styled.div`
  width: 100%;
  height: 80%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto';
  font-weight: 400;
  p {
    max-width: 464px;
    color: #8E8E8E;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    font-weight: 400;
  }
`;
