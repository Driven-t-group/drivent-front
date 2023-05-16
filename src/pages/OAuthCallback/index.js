import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function OAuthCallback(props) {
  const [code, setCode] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const value = queryParams.get('code');
    setCode(value);
  }, []);

  return (
    <div>
      <h1>OAuthCallback</h1>
      <a>code: {code}</a>
    </div>
  );
}
