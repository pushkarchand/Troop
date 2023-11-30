import React, { useEffect, useState } from 'react';
import { Page } from '@datatypes/project';
import styled from '@emotion/styled';
import spacing from '@utils/styles/spacing';
import SubPagesSection from './subpagessection';

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${spacing.small}px ${spacing.large}px;
  box-sizing: border-box;
  gap: ${spacing.small}px;
`;

const CenterSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc(100% - 250px);
`;

const BorderlessInput = styled.input`
  border: none;
  outline: none;
  padding: 8px;
  font-size: 24px;
`;

const BorderlessTextarea = styled.textarea`
  border: none;
  outline: none;
  padding: 8px;
`;

type PageProps = {
  page: Page;
};

const PageDetails = ({ page }: PageProps) => {
  const [name, setName] = useState(page.name);
  const [description, setDescription] = useState(page.description);

  useEffect(() => {
    setName(page.name);
    setDescription(page.description);
  }, [page]);

  return (
    <CenterSection>
      <HeaderSection>
        <BorderlessInput
          placeholder="Page"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <BorderlessTextarea
          placeholder="Add description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </HeaderSection>
      {page.subPages ? <SubPagesSection subPages={page.subPages} /> : null}
    </CenterSection>
  );
};

export default PageDetails;
