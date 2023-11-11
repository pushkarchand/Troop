import styled from '@emotion/styled';
import color from '@utils/styles/color';
import spacing from '@utils/styles/spacing';
import Logo from '@assets/images/logo.svg';
import { Avatar, MenuItem, Select } from '@mui/material';
import UserAvatar from '@assets/images/avatar.png';
import { useState } from 'react';
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
  const [options] = useState([1, 2, 3, 4]);
  const [value, setvalue] = useState(1);

  return (
    <Header>
      <LeftSection>
        <MainLogo src={Logo} alt="main Logo" />
        <Select
          value={value}
          onChange={(e) => {
            setvalue(Number(e.target.value));
          }}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          disableUnderline
          variant="standard"
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              My design system {option}
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
