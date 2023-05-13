import styled from 'styled-components';
import { BsPerson, BsPersonFill } from 'react-icons/bs';
import { useState } from 'react';

export default function RoomCard({ name, capacity, bookings, selectedRoom, setSelectedRoom, id }) {
  const [person, setPerson] = useState([]);

  useState(() => {
    handleCapacity();
  }, [selectedRoom]);

  function handleCapacity() {
    let newPerson = [];
    if (capacity === bookings.length) {
      for (let i = 0; i < capacity; i++) {
        newPerson.push(<BsPersonFill key={i} />);
      };
      setPerson(newPerson);
      return;
    };
    for (let i = 0; i < capacity; i++) {
      if(selectedRoom === id) {
        newPerson.push(<BsPersonFill key={i} />);
        continue; 
      }
      if (bookings.length > i) {
        newPerson.push(<BsPersonFill key={i} />);
        continue;
      }
      newPerson.push(<BsPerson key={i} />);
    };
    setPerson([...newPerson.reverse()]);
  };

  function clickCard() {
    if(capacity === bookings.length) {
      return;
    }
    setSelectedRoom(id);
  };

  return (
    <Card onClick={clickCard} select={selectedRoom === id}>
      <p>{name}</p>
      <CardPerson select={selectedRoom === id}>
        {
          person
        }
      </CardPerson>
    </Card>
  );
}

const Card = styled.div`
    width: 190px;
    height: 45px;
    border-radius: 10px;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #CECECE;
    background-color: ${(props) => props.select ? '#FFEED2' : '#FFFFFF'};
    cursor: pointer;
    & > p {
      font-size: 20px;
      color: #454545;
      font-family: 'Roboto';
      font-weight: 700;
      line-height: 23px;
    }
`;

const CardPerson = styled.div`
  display: flex;
  gap: 7px;
  svg:first-child {
    color: ${props => props.select ? '#FF4791': ''};
  }
`;
