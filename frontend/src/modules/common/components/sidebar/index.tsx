import React from 'react';
import styled from '@emotion/styled';
import align from '@utils/styles/align';
import color from '@utils/styles/color';

type Props = {};

const Container = styled.div`
  ${align.centerV};
  flex-direction: column;
  width: 250px;
  background-color: ${color.gray50};
`;

const SideBar = (props: Props) => {
  return <Container>SideBar</Container>;
};

export default SideBar;
