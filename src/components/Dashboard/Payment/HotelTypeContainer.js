import styled from 'styled-components';
import { useEffect, useState } from 'react';
import HotelType from './HotelType';

export default function HotelTypeContainer({ ticketsTypes, selectedType, setSelectedType }) {
  const [validTicketsTypes, setValidTicketsTypes] = useState();
  useEffect(() => {
    if (ticketsTypes) {
      const newValidTypes = [];
      ticketsTypes.forEach(item => {
        if (!item.isRemote && item.includesHotel) {
          newValidTypes.push(item);
        }
        if (!item.isRemote && !item.includesHotel) {
          newValidTypes.push(item);
        }
      });
      setValidTicketsTypes([...newValidTypes]);
    }
  }, [ticketsTypes]);

  if (!validTicketsTypes) {
    return '...loading';
  }

  return (
    <Container>
      <p>Ótimo! Agora escolha sua modalidade de hospedagem</p>
      <ContainerType>
        {
          validTicketsTypes.map(type => <HotelType key={type.id} type={type} selectedType={selectedType} setSelectedType={setSelectedType} value={Math.abs(validTicketsTypes[0].price - validTicketsTypes[1].price)}/>)
        }
      </ContainerType>
    </Container>
  );
};

const ContainerType = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 1rem;
`;

const Container = styled.div`
	margin-top: 44px;
	& > p {
		font-size: 1.25rem;
  	font-family: "Roboto", sans-serif;
  	color: #8E8E8E;
	}
`;
