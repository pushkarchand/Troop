import React from 'react';
import styled from '@emotion/styled';
import color from '@utils/styles/color';
import spacing from '@utils/styles/spacing';
import cursor from '@utils/styles/cursor';

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 13px;
  color: ${color.gray500};
  padding: ${spacing.small}px;
  ${cursor.pointer};
  &:hover{
    background-color: ${color.gray100};
  }
`;

const PageTitle = styled.div`
  font-size: 13px;
  color: ${color.gray900};
  padding:${spacing.small}px;
  ${cursor.pointer};
  &:hover{
    background-color: ${color.gray100};
  }
`;

const PagesConatiner = styled.div`
  padding-left: ${spacing.medium}px;
  display: flex;
  flex-direction: column;
  gap: ${spacing.medium}px;
`;

type Props = {
  item: any;
};

const Section = ({ item }: Props) => {
  return (
    <SectionContainer>
      <Title>{item.title}</Title>
      <PagesConatiner>
        {item.pages.map((page: any) => (
          <PageTitle key={page.id}>{page.title}</PageTitle>
        ))}
      </PagesConatiner>
    </SectionContainer>
  );
};

export default Section;
