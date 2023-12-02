import styled from '@emotion/styled';
import align from '@utils/styles/align';
import React from 'react';
const EmptyPageContainer = styled.div`
  flex: 1;
  ${align.center};
`;

const EmptyPage = ({ noSection }: { noSection: boolean }) => {
  return noSection ? (
    <EmptyPageContainer>Please create a section and a page</EmptyPageContainer>
  ) : (
    <EmptyPageContainer>Please create a page</EmptyPageContainer>
  );
};

export default EmptyPage;
