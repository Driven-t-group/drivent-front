import github from '../../assets/images/github.svg';
import styled from 'styled-components';

export default function ThirdPartyAuth(props) {
  const githubRedirect = () => {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=dea6dd764b82f1c2c545'; //use process.env.CLIENT_ID
  };

  return (
    <div Style="background-color: #d0d3d9; border-radius: 8px; width: 100%; padding-top: 10px; padding-bottom: 10px; margin-bottom: 10px; align-items: center; display: flex; flex-direction: column;">
      <h1>Outras formas de autenticação:</h1>
      <ThirdPartyBlock onClick={githubRedirect}>
        <span Style="padding-right: 7px;"><img Style="#vertical-align: middle;" src={github} alt="Github" width="22em"/></span> <a>Continue com GitHub</a>
      </ThirdPartyBlock>
    </div>
  );
}

const ThirdPartyBlock = styled.div`
  background-color: #24292e;
  color: #fff;
  border-radius: 5px;
  height: 35px;
  width: 90%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .2s;
		&:hover{
			transform: scale(1.05);
			transition: .2s;
			cursor: pointer;
		}
`;
