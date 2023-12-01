import React, { useState } from 'react';
import styled from '@emotion/styled';
import color from '@utils/styles/color';
import spacing from '@utils/styles/spacing';
import cursor from '@utils/styles/cursor';
import AddIcon from '@mui/icons-material/Add';
import { CreatePayload, Page, Section } from '@datatypes/project';
import CreateModal from '../createmodal';
import { post } from '@api/safe';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import align from '@utils/styles/align';

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 13px;
  color: #968f93;
  padding-left: ${spacing.small}px;
  ${cursor.pointer};
  &:hover {
    background-color: ${color.gray100};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: ${color.gray100};
  }
`;

const PageTitle = styled.div<{ selected: boolean }>`
  font-size: 13px;
  color: ${color.gray900};
  ${cursor.pointer};
  padding: 2px ${spacing.xsmall}px;
  background: ${({ selected }) => (selected ? `${color.gray200}` : 'inherit')};
  &:hover {
    background-color: ${({ selected }) =>
      selected ? `${color.gray200}` : `${color.gray100}`};
  }
`;

const PagesConatiner = styled.div`
  padding: 0 0 0 ${spacing.medium}px;
  display: flex;
  flex-direction: column;
  gap: ${spacing.xsmall}px;
`;

type Props = {
  item: Section;
  updateDetails: () => void;
  changeInPage: (id: string) => void;
};

const SectionComponent = ({ item, updateDetails, changeInPage }: Props) => {
  const { projectId, pageId } = useParams();
  const navigate = useNavigate();
  const [isCreatePage, setIsCreatePage] = useState(false);

  const createNewPage = async (payload: CreatePayload) => {
    try {
      const createPagePayload = { ...payload, sectionId: item._id };
      await post('/api/pages', createPagePayload);
      updateDetails();
      setIsCreatePage(false);
    } catch (error: any) {
      console.log(error);
      setIsCreatePage(false);
    }
  };

  const setSelectedPage = (currentPage: Page) => {
    changeInPage(currentPage.localId);
    if (currentPage.subPages.length > 0) {
      navigate(
        `/project/${projectId}/${currentPage.localId}/${currentPage.subPages[0].localId}`
      );
    } else {
      navigate(`/project/${projectId}/${currentPage.localId}`);
    }
  };

  return (
    <SectionContainer>
      <Header>
        <Title>{item.name}</Title>
        <Tooltip title="Add new page">
          <IconButton
            onClick={() => {
              setIsCreatePage(true);
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Header>
      <PagesConatiner>
        {item.pages.map((page: Page) => (
          <PageTitle
            key={page._id}
            selected={pageId === page.localId}
            onClick={() => {
              setSelectedPage(page);
            }}
          >
            {page.name}
          </PageTitle>
        ))}
      </PagesConatiner>
      {isCreatePage ? (
        <CreateModal
          open={isCreatePage}
          close={() => {
            setIsCreatePage(false);
          }}
          create={createNewPage}
          title={'Create Page'}
        />
      ) : null}
    </SectionContainer>
  );
};

export default SectionComponent;
