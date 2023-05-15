import styled from 'styled-components';
import HotelCard from './HotelCard';
import useHotelsWithRoom from '../../../hooks/api/useHotelsRoom';
import useUpdateBooking from '../../../hooks/api/useUpdateBooking';
import RoomCard from './Rooms/RoomCard';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function BookingUpdate({ booking, reload, setReload }) {
  const { getHotelsRooms } = useHotelsWithRoom();
  const [selectedHotel, setSelectedHotel] = useState();
  const [selectedRoom, setSelectedRoom] = useState();
  const { updateBooking } = useUpdateBooking();
  const [hotelsWithRooms, setHotelsWithRooms]= useState();

  useEffect(() => {
    async function openRooms() {
      try {
        const newHotelsWithRooms = await getHotelsRooms(booking.Room.Hotel.id);
        setHotelsWithRooms(newHotelsWithRooms);
      } catch (error) {

      }
    }
    console.log(booking);
    setSelectedRoom(booking.Room.id);
    setSelectedHotel(booking.Room.Hotel.id);
    openRooms();
  }, []);

  if (!hotelsWithRooms) {
    return '';
  }

  async function submitBooking() {
    try {
      await updateBooking(booking.id, selectedRoom);
      setReload(!reload);
      toast('Atualizado com sucesso!');
    } catch (error) {
      toast('Não foi possível alterar para este quarto!');
    }
  };

  return (
    <ContainerBookingUpdate>
      <p>Você já escolheu seu quarto:</p>
      <HotelContainer>
        <HotelCard
          hotelId={booking.Room.Hotel.id}
          hotelImage={booking.Room.Hotel.image}
          name={booking.Room.Hotel.name}
          selectedHotel={selectedHotel}
          setSelectedHotel={setSelectedHotel}
          setSelectedRoom={setSelectedRoom}
        />
      </HotelContainer>
      <ContainerRooms>
        {
          hotelsWithRooms.data.Rooms.map(item => <RoomCard
            key={item.id}
            id={item.id}
            name={item.name}
            capacity={item.capacity}
            bookings={item.Booking}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            booking={booking}
          />)
        }
      </ContainerRooms>
      <button onClick={submitBooking}>TROCAR DE QUARTO</button>
    </ContainerBookingUpdate>
  );
};

const ContainerBookingUpdate = styled.div`
    width: 100%;
		& > button {
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
    & > p {
    font-size: 20px;
    font-weight: 400;
    font-family: 'Roboto';
    color: #8E8E8E;
    line-height: 23px;
    margin-bottom: 18px;
  }
`;

const HotelContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 19px;
    margin-bottom: 33px;
`;

const ContainerRooms = styled.div`
  display: flex;
  gap: 17px;
  flex-wrap: wrap;
  padding-bottom: 43px;
`;
