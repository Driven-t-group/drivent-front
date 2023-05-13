import useTicket from '../../../hooks/api/useTicket';
import useHotels from '../../../hooks/api/useHotels';
import HotelCard from '../../../components/Dashboard/Hotel/HotelCard';
import NoIncludesHotel from '../../../components/Dashboard/Hotel/NoIncludesHotel';
import NoPaymentHotel from '../../../components/Dashboard/Hotel/NoPaymentHotel';
import styled from 'styled-components';
import { useState } from 'react';

export default function Hotel() {
  const { ticketLoadding, ticket } = useTicket();
  const { hotels, loaddingHotels } = useHotels();
  const [selectedHotel, setSelectedHotel] = useState(null);

  return (
    <Container>
      <h1>Escolha de hotel e quarto</h1>
      {
        ticketLoadding | loaddingHotels ? <div>loadding...</div> : (
          ticket.data.status === 'RESERVED' ? <NoPaymentHotel /> : (
            !ticket.data.TicketType.includesHotel ? <NoIncludesHotel /> : (
              <Choices>
                <p>Primeiro, escolha seu hotel</p>
                <HotelContainer>
                  {hotels.data.map((h) => <HotelCard hotelImage={h.image}
                    name={h.name}
                    hotelId={h.id}
                    key={h.id}
                    selectedHotel={selectedHotel}
                    setSelectedHotel={setSelectedHotel}
                  />
                  )}
                </HotelContainer>
              </Choices>
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
