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
  color: #968f93;
  ${cursor.pointer};
  &:hover {
    background-color: ${color.gray100};
  }
`;

const PageTitle = styled.div`
  font-size: 13px;
  color: ${color.gray900};
  ${cursor.pointer};
  padding: 2px ${spacing.xsmall}px;
  &:hover {
    background-color: ${color.gray100};
  }
`;

const PagesConatiner = styled.div`
  padding: ${spacing.small}px 0px 0px ${spacing.medium}px;
  display: flex;
  flex-direction: column;
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
