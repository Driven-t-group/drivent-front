import useTicket from '../../../hooks/api/useTicket';
import useHotels from '../../../hooks/api/useHotels';
import HotelCard from '../../../components/Dashboard/Hotel/HotelCard';
import NoIncludesHotel from '../../../components/Dashboard/Hotel/NoIncludesHotel';
import NoPaymentHotel from '../../../components/Dashboard/Hotel/NoPaymentHotel';
import RoomsContainer from '../../../components/Dashboard/Hotel/Rooms/RoomContainer';
import useGetBooking from '../../../hooks/api/useGetBooking';
import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import BookingUpdate from '../../../components/Dashboard/Hotel/BookingUpdate';

export default function Hotel() {
  const { ticketLoadding, ticket } = useTicket();
  const { hotels, loaddingHotels } = useHotels();
  const { getBooking } = useGetBooking();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [booking, setBooking] = useState();
  const [loadingBooking, setLoadingBookings] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function openBooking() {
      try {
        const bookingData = await getBooking();
        setLoadingBookings(false);
        setBooking(bookingData.data);
      } catch (error) {
        setLoadingBookings(false);
      }
    }
    openBooking();
  }, [reload]);

  return (
    <Container>
      <h1>Escolha de hotel e quarto</h1>
      {
        ticketLoadding | loaddingHotels | loadingBooking ? <div>loadding...</div> : (
          ticket?.data.status === 'RESERVED' | !ticket ? <NoPaymentHotel /> : (
            !ticket.data.TicketType.includesHotel ? <NoIncludesHotel /> : (
              booking ? <BookingUpdate booking={booking} reload={reload} setReload={setReload}/> : (
                <Choices>
                  <p>Primeiro, escolha seu hotel</p>
                  <HotelContainer>
                    {
                      hotels.data.map((h) => <HotelCard
                        hotelImage={h.image}
                        name={h.name}
                        hotelId={h.id}
                        key={h.id}
                        selectedHotel={selectedHotel}
                        setSelectedHotel={setSelectedHotel}
                        setSelectedRoom={setSelectedRoom}
                      />
                      )}
                  </HotelContainer>
                  <RoomsContainer selectedHotel={selectedHotel} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} booking={booking}/>
                </Choices>
              )
            )
          )
        )
      }
    </Container>
  );
}

const HotelContainer = styled.div`
  display: flex;
  gap: 19px;
  flex-wrap: wrap;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  h1 {
    color: #000000;
    font-family: 'Roboto';
    font-size: 34px;
    line-height: 40px;
    margin-bottom: 36px;
  }
`;

const Choices = styled.div`
   & > p {
    font-size: 20px;
    font-weight: 400;
    font-family: 'Roboto';
    color: #8E8E8E;
    line-height: 23px;
    margin-bottom: 18px;
  }
`;
