import styled from 'styled-components';
import { toast } from 'react-toastify';
import RoomCard from './RoomCard';
import useHotelsWithRoom from '../../../../hooks/api/useHotelsRoom';
import { useEffect } from 'react';
import { useState } from 'react';
import useBooking from '../../../../hooks/api/useBooking';

export default function RoomsContainer({ selectedHotel, selectedRoom, setSelectedRoom,  booking }) {
  const { getHotelsRooms } = useHotelsWithRoom();
  const { createBooking } = useBooking();
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    async function openHotels() {
      const hotelData = await getHotelsRooms(selectedHotel);
      setRooms(hotelData.data.Rooms);
    }
    if (selectedHotel) {
      openHotels();
    }
  }, [selectedHotel, selectedRoom]);

  if (!selectedHotel || !rooms) {
    return '';
  };

  async function submitBooking() {
    try {
      await createBooking({ roomId: selectedRoom }); 
      toast('Reserva realizada com sucesso.');
    } catch (error) {
      toast('Não é possível reservar este quarto.');
    }
  };

  return (
    <RoomContainer>
      <p>Ótima pedida! Agora escolha seu quarto:</p>
      <Rooms>
        {rooms.map(item => <RoomCard
          key={item.id}
          id={item.id}
          name={item.name}
          capacity={item.capacity}
          bookings={item.Booking}
          booking={booking}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
        />
        )}
      </Rooms>
      {selectedRoom && <button onClick={submitBooking}> RESERVAR QUARTO</button>}
    </RoomContainer>
  );
}

const RoomContainer = styled.div`
  width: 100%;
  margin-top: 52px;
  & > p {
   font-size : 20px;
   font-family: 'Roboto';
   font-weight: 400;
   color: #8E8E8E;
   margin-bottom: 33px;
  };
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

const Rooms = styled.div`
  display: flex;
  gap: 17px;
  flex-wrap: wrap;
  padding-bottom: 43px;
`;
