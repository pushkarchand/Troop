import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '@context/authprovider';
import ReichTextEditor from '@modules/common/components/richtexteditor';
import MainNavigation from '@modules/common/components/mainnavigation';
import SideBar from '@modules/common/components/sidebar';
import styled from '@emotion/styled';
import spacing from '@utils/styles/spacing';

const MainContainer = styled.div`
  display: flex;
  box-sizing: borde-box;
`;

const RightSection = styled.div`
  display: flex;
  width: 150px;
`;

const CenterSection = styled.div`
  display: flex;
  flex-grow: 1;
  padding: ${spacing.small}px;
  box-sizing: borde-box;
  padding: ${spacing.large}px;
`;

const Home = () => {
  const { setAuth }: any = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});
    navigate('/');
  };

  return (
    <section>
      <MainNavigation />
      <MainContainer>
        <SideBar />
        <CenterSection>
          <ReichTextEditor />
        </CenterSection>
        <RightSection>- First</RightSection>
      </MainContainer>
    </section>
  );
};

export default Home;
