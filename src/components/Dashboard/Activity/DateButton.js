import styled from 'styled-components';

export default styled.div`
  background: ${props => props.selected? '#FFD37D' : '#E0E0E0'};
  box-shadow: 0px 2px 10px 0px #00000040;
  border-radius: 4px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 26px;
  padding-right: 26px;
  display: 'inline-block';
  text-align: center;
  margin-right: 17px;

  transition: .2s;
		&:hover{
			transform: scale(1.05);
			transition: .2s;
			cursor: pointer;
		}
`;
