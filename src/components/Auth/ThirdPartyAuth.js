import github from '../../assets/images/github.svg';

export default function ThirdPartyAuth(props) {
  return (
    <div Style="background-color: #d0d3d9; border-radius: 8px; width: 100%; padding-top: 10px; padding-bottom: 10px; margin-bottom: 10px; align-items: center; display: flex; flex-direction: column;">
      <h1>Outras formas de autenticação:</h1>
      <div Style="background-color: #24292e; color: #fff; border-radius: 5px; height: 35px; width: 90%; margin-top: 10px; display: flex; align-items: center; justify-content: center;">
        <span Style="padding-right: 7px;"><img Style="#vertical-align: middle;" src={github} alt="Github" width="22em"/></span> <a>Continue com GitHub</a>
      </div>
    </div>
  );
}
