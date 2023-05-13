import styled from 'styled-components';
import useHotelsWithRoom from '../../../hooks/api/useHotelsRoom';
import { useEffect } from 'react';
import { useState } from 'react';

export default function HotelCard({ hotelImage, name, hotelId }) {
  const { getHotelsRooms } = useHotelsWithRoom();
  const [types, setTypes] = useState(null);
  const [available, setAvailable] = useState(0);

  useEffect(() => {
    async function getRooms() {
      const roomsData = await getHotelsRooms(hotelId);
      const newTtypes = [];
      let newAvailable = 0;
      roomsData.data.Rooms.forEach(item => {
        newAvailable+=item.capacity;
        switch (item.capacity) {
        case 1:
          if (!newTtypes.includes('Single')) {
            newTtypes.push('Single');
          }
          break;
        case 2:
          if (!newTtypes.includes('Double')) {
            newTtypes.push('Double');
          }
          break;
        case 3:
          if (!newTtypes.includes('Triple')) {
            newTtypes.push('Triple');
          }
          break;
        default:
          break;
        }
      });
      setTypes(newTtypes.join(', '));
      setAvailable(newAvailable);
    };
    getRooms();
  }, []);

  return (
    <Card>
      <img src={hotelImage} alt='imagem do hotel' />
      <h2>{name}</h2>
      <ContainerDescriotion>
        <h3>Tipos de acomodação:</h3>
        <p>{types}</p>
      </ContainerDescriotion>
      <ContainerDescriotion>
        <h3>Vagas disponíveis:</h3>
        <p>{available}</p>
      </ContainerDescriotion>
    </Card>
  );
}

const Card = styled.div`
  width: 196px;
  padding: 14px;
  background-color: #EBEBEB;
  border-radius: 10px;
  cursor: pointer;
  img {
    width: 100%;
  }
  h2 {
    font-weight: 400;
    color: #343434;
    font-size: 20px;
    line-height: 23px;
    font-family: 'Roboto';
    margin-top: 10px;
  }
`;

const ContainerDescriotion = styled.div`
  h3 {
    color: #3C3C3C;
    font-size: 12;
    font-family: 'Roboto';
    font-weight: 700;
   line-height : 14px;
   margin-top: 14px;
  }
  p {
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    font-family: 'Roboto';
    margin-top: 2px;
    color: #3C3C3C;
  }
`;
