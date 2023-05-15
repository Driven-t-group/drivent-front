import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Type from './Type';

export default function TypeContainer({ ticketsTypes, selectedType, setSelectedType }) {
  const [validTicketsTypes, setValidTicketsTypes] = useState();
  useEffect(() => {
    if (ticketsTypes) {
      const newValidTypes = [];
      ticketsTypes.forEach(item => {
        if (item.isRemote) {
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
      {
        validTicketsTypes.map(type => <Type key={type.id} type={type} selectedType = {selectedType} setSelectedType={setSelectedType} />)
      }
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 1rem;
`;
