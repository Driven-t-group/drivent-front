import styled from 'styled-components';
import useSaveTicket from '../../../hooks/api/useSaveTicket';
import { toast } from 'react-toastify';

export default function ConfirmTicket({ selectedTicket, setCreated }) {
  const { createTicket } = useSaveTicket();
  async function handleTicket() {
    try {
      await createTicket(selectedTicket.id);
      setCreated(true);
      toast('Ingresso reservado com sucesso.');
    } catch (error) {
      toast('Nõ foi possível reservar ingresso.');
    }
  };

  return (
    <Container>
      <p>{`Fechado! O total ficou em R$ ${selectedTicket.price}. Agora é só confirmar:`}</p>
      <button onClick={handleTicket}>RESERVAR INGRESSO</button>
    </Container>
  );
};

const Container = styled.div`
    margin-top: 43px;
    & > p {
    font-size: 1.25rem;
  	font-family: "Roboto", sans-serif;
  	color: #8E8E8E;
    margin-bottom: 17px;
    }
    button {
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
