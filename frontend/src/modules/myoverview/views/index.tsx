import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '@context/authprovider';

const Home = () => {
  const { setAuth }: any = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});
    navigate('/');
  };

  return (
    <section>
      <h1>Home</h1>
      <p>You are logged in!</p>
      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
