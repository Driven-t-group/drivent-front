import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';

export default function OAuthCallback(props) {
  const navigate = useNavigate();
  const [code, setCode] = useState(null);
  const { setUserData } = useContext(UserContext);

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const value = queryParams.get('code');
    setCode(value);
    const url = `${process.env.REACT_APP_API_BASE_URL}/getAccessToken?code=${value}`;
    axios.post(url)
      .then((resp) => {
        console.log(resp.data);
        setUserData(resp.data);
        toast('Login realizado com sucesso!');
        navigate('/dashboard');
      })
      .catch(() => {
        toast('Algo deu errado');
        setTimeout(() => (navigate('/enroll'), 800));
      });
  }, []);

  return (
    <div>
      <h1>Fazendo login...</h1>
    </div>
  );
}
