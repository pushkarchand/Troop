import React, { useState } from 'react';
import styled from '@emotion/styled';
import color from '@utils/styles/color';
import spacing from '@utils/styles/spacing';
import cursor from '@utils/styles/cursor';
import AddIcon from '@mui/icons-material/Add';
import { CreatePayload, Page, Section } from '@datatypes/project';
import CreateEditPage from '../editcreatemodal';
import { deleteSafe, post } from '@api/safe';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import MoreOption from '../moreoption';
import { Action, Option } from '@datatypes/common';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ConfirmModal from '../confirmModal';
import { useSnackbar } from '../snackbar';

type Props = {
  item: Section;
  updateDetails: () => void;
  changeInPage: (id: string) => void;
  editSection: (item: Section) => void;
  deleteSection: (item: Section) => void;
};

const Options: Option[] = [
  { label: 'Edit', value: Action.EDIT },
  { label: 'Delete', value: Action.DELETE },
];

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
  position: relative;
  padding-right: 30px;
  &:hover {
    background-color: ${color.gray100};
  }
`;

const PageTitle = styled.div<{ selected: boolean }>`
  font-size: 13px;
  color: ${color.gray900};
  ${cursor.pointer};
  position: relative;
  padding: 2px ${spacing.xsmall}px;
  background: ${({ selected }) => (selected ? `${color.gray200}` : 'inherit')};
  &:hover {
    background-color: ${({ selected }) =>
      selected ? `${color.gray200}` : `${color.gray100}`};
  }
`;

const More = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  ${cursor.pointer}
`;

const PagesConatiner = styled.div`
  padding: 0 0 0 ${spacing.medium}px;
  display: flex;
  flex-direction: column;
  gap: ${spacing.xsmall}px;
`;

const SectionComponent = ({
  item,
  updateDetails,
  changeInPage,
  editSection,
  deleteSection,
}: Props) => {
  const { openSnackbar } = useSnackbar();
  const { projectId, pageId } = useParams();
  const navigate = useNavigate();
  const [isCreatePage, setIsCreatePage] = useState(false);
  const [deletedPage, setDeletedPage] = useState<Page | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

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

  const handleClick = (action: Action, item: Section) => {
    if (action === Action.EDIT) {
      editSection(item);
    } else {
      deleteSection(item);
    }
  };

  const deletePage = (item: Page) => {
    setDeletedPage(item);
    setConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setConfirmModalOpen(false)
      const response= await deleteSafe(`/api/pages/${deletedPage?._id}`)
      setDeletedPage(null)
      openSnackbar(`Successfully deleted page "${response.name}"`, 'success');
      updateDetails()
    } catch (error) {
      setDeletedPage(null)
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
        <More>
          <MoreOption
            options={Options}
            handleClick={(action: Action) => {
              handleClick(action, item);
            }}
          />
        </More>
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
            <More>
              <IconButton
                aria-haspopup="true"
                onClick={() => {
                  deletePage(page);
                }}
                size="small"
              >
                <DeleteOutlineIcon />
              </IconButton>
            </More>
          </PageTitle>
        ))}
      </PagesConatiner>
      {isCreatePage ? (
        <CreateEditPage
          open={isCreatePage}
          close={() => {
            setIsCreatePage(false);
          }}
          create={createNewPage}
          title={'Create Page'}
        />
      ) : null}
      {deletedPage && confirmModalOpen ? (
        <ConfirmModal
          open={confirmModalOpen}
          title="Are you sure?"
          message={`Want to delete "${deleteSection?.name}" page`}
          close={() => {
            setConfirmModalOpen(false);
            setDeletedPage(null);
          }}
          confirm={handleConfirmDelete}
        />
      ) : null}
    </SectionContainer>
  );
};

export default SectionComponent;
