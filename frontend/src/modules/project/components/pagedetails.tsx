import React, { useEffect, useState } from 'react';
import { Page, SubPage } from '@datatypes/project';
import styled from '@emotion/styled';
import spacing from '@utils/styles/spacing';
import SubPagesSection from './subpagessection';
import { putSafe } from '@api/safe';

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
  currentSubPage: SubPage | null;
  changeInSubPage: (id: string) => void;
  updateDetails: () => void;
};

const PageDetails = ({
  page,
  currentSubPage,
  changeInSubPage,
  updateDetails,
}: PageProps) => {
  const [name, setName] = useState(page.name);
  const [description, setDescription] = useState(page.description);

  useEffect(() => {
    setName(page.name);
    setDescription(page.description);
  }, [page]);

  const updatePageDetails = async () => {
    try {
      const payload = {
        id: page._id,
        name,
        description,
        subPages: page.subPages.map((item) => item._id),
      };
      await putSafe('/api/pages', payload);
      updateDetails();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CenterSection>
      <HeaderSection>
        <BorderlessInput
          placeholder="Page"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onBlur={updatePageDetails}
        />
        <BorderlessTextarea
          placeholder="Add description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          onBlur={updatePageDetails}
        />
      </HeaderSection>
      {page.subPages ? (
        <SubPagesSection
          subPages={page.subPages}
          currentSubPage={currentSubPage}
          changeInSubPage={changeInSubPage}
          currentPage={page}
          updateDetails={updateDetails}
        />
      ) : null}
    </CenterSection>
  );
};

export default PageDetails;
