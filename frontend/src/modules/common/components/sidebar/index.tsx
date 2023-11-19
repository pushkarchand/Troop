import React from 'react';
import styled from '@emotion/styled';
import align from '@utils/styles/align';
import color from '@utils/styles/color';
import { sections } from '@utils/contants/sections';
import Section from './section';
import spacing from '@utils/styles/spacing';

type Props = {};

const Container = styled.div`
  display: flex;
  flex: 1 1 0;
  padding: ${spacing.small}px 0 60px ${spacing.small}px;
  box-sizing: content-box;
  overflow-y: auto;
  width: 250px;
  max-width: 250px;
  background-color: ${color.gray50};
`;

const SectionsConationer = styled.div`
  display: flex;
  flex: 1;
  overflow-y: auto;
  flex-direction: column;
  padding: ${spacing.small}px;
  gap: ${spacing.medium}px;
`;

const SideBar = () => {
  return (
    <Container>
      <SectionsConationer>
        {sections.map((item) => (
          <Section item={item} key={item.id} />
        ))}
      </SectionsConationer>
    </Container>
  );
};

export default SideBar;
