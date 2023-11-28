import React from 'react';
import styled from '@emotion/styled';
import color from '@utils/styles/color';
import spacing from '@utils/styles/spacing';
import Logo from '@assets/images/logo.svg';
import { Avatar, MenuItem, Select } from '@mui/material';
import UserAvatar from '@assets/images/avatar.png';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContextType, useMainContext } from '@context/maincontext';
const Header = styled.nav`
  display: flex;
  width: 100%;
  background: ${color.gray50};
  padding: ${spacing.small}px ${spacing.medium}px;
  position: sticky;
  top: 0;
  z-index: 999;
  justify-content: space-between;
  box-sizing: border-box;
`;

const LeftSection = styled.div`
  display: flex;
  gap: ${spacing.medium}px;
`;
const RightSection = styled.div``;

const MainLogo = styled.img`
  width: 100px;
  height: 50px;
  margin-left: ${spacing.medium}px;
`;

type Props = {};

function MainNavigation({}: Props) {
  const { projectId } = useParams();
  const { projects }: AppContextType = useMainContext();
  const [value, setvalue] = useState<string>(projectId || '');
  const navigate = useNavigate();
  return (
    <Header>
      <LeftSection>
        <MainLogo
          src={Logo}
          alt="main Logo"
          onClick={() => {
            navigate('/');
          }}
        />
        <Select
          value={value}
          onChange={(e) => {
            setvalue(e.target.value);
          }}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          disableUnderline
          variant="standard"
        >
          {projects.map((option) => (
            <MenuItem key={option._id} value={option.localId}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </LeftSection>
      <RightSection>
        <Avatar alt="Cindy Baker" src={UserAvatar} />
      </RightSection>
    </Header>
  );
}

export default MainNavigation;
