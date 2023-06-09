import styled from 'styled-components';

export default function Type({ type, selectedType, setSelectedType }) {
  function selectType() {
    setSelectedType(type);
    console.log(type);
  };

  return (
    <TypeContainer selected={selectedType?.isRemote === type.isRemote} onClick={selectType}>
      <p>{type.isRemote ? 'Online' : 'Presencial'}</p>
      <p>R$ {type.price}</p>
    </TypeContainer>
  );
};

const TypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #CECECE;
  border-radius: 1.25rem;
  width: 9.0625rem;
  height: 9.0625rem;
  background-color: ${props => props.selected ? '#FFEED2' : '#FFFFFF'};
  cursor: pointer;

 p:first-child {
    font-size: 1rem;
  font-family: "Roboto", sans-serif;
  color: #454545;
 }

 p:last-child {
  font-size: 0.875rem;
  font-family: "Roboto", sans-serif;
  color: #898989;
  margin-top: 0.25rem;
 }
`;
