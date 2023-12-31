import * as React from 'react';
import ReichTextEditor from '@modules/common/components/richtexteditor';
import styled from '@emotion/styled';
import spacing from '@utils/styles/spacing';
import color from '@utils/styles/color';
import cursor from '@utils/styles/cursor';
import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import align from '@utils/styles/align';
import { Content, CreatePayload, Page, SubPage } from '@datatypes/project';
import { deleteSafe, getSafe, post, putSafe } from '@api/safe';
import { useEffect, useState } from 'react';
import { OutputData } from '@editorjs/editorjs';
import CreateEditSubPage from '@modules/common/components/editcreatemodal';
import MoreOption from '@modules/common/components/moreoption';
import { Action, Option } from '@datatypes/common';
import ConfirmModal from '@modules/common/components/confirmModal';
import { useSnackbar } from '@modules/common/components/snackbar';
import { useMainContext } from '@context/maincontext';

type SubPageProps = {
  subPages: SubPage[];
  currentSubPage: SubPage | null;
  currentPage: Page;
  changeInSubPage: (id: string) => void;
  updateDetails: () => void;
};

const Options: Option[] = [
  { label: 'Edit', value: Action.EDIT },
  { label: 'Delete', value: Action.DELETE },
];

const EditorContainer = styled.div`
  display: flex;
  flex: 1;
  box-sizing: border-box;
  padding: ${spacing.large}px;
  overflow-y: auto;

  @media (min-width: 768px) {
    .ce-block__content,
    .ce-toolbar__content {
      max-width: 75%;
    }
  }

  @media (min-width: 992px) {
    .ce-block__content,
    .ce-toolbar__content {
      max-width: 80%;
    }
  }

  @media (min-width: 1200px) {
    .ce-block__content,
    .ce-toolbar__content {
      max-width: 80%;
    }
  }

  @media (min-width: 1600px) {
    .ce-block__content,
    .ce-toolbar__content {
      max-width: 70%;
    }
  }
`;

const TabsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Tabs = styled.div`
  display: flex;
  gap: ${spacing.small}px;
  padding: 0 ${spacing.large}px;
  border-bottom: 1px solid ${color.purple50};
`;
const Tab = styled.div<any>`
  font-size: 13px;
  color: ${color.gray900};
  padding: ${spacing.small}px ${spacing.large}px ${spacing.small}px
    ${spacing.medium}px;
  ${cursor.pointer};
  transition: border-color 0.1s ease;
  border-bottom: ${({ hasBorderBottom }) =>
    hasBorderBottom ? `3px solid ${color.purple400}` : 'none'};
  ${align.center};
  box-sizing: border-box;
  position: relative;
`;

const More = styled.div`
  position: absolute;
  right: -5px;
  top: 8px;
`;

export default function SubPagesSection({
  subPages,
  changeInSubPage,
  currentSubPage,
  currentPage,
  updateDetails,
}: SubPageProps) {
  const { openSnackbar } = useSnackbar();
  const { setLoading, user }: any = useMainContext();
  const [currentTab, setCurrentTab] = useState(currentSubPage?._id);
  const [contentDetails, setContentDetails] = useState<Content | null>(null);
  const [iscreateSubPage, setIscreateSubPage] = useState(false);
  const [editedSubPage, setEditedSubPage] = useState<SubPage | null>(null);
  const [deletedSubPage, setDeletedSubPage] = useState<SubPage | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    if (currentSubPage) {
      fetchContentDetails();
      setCurrentTab(currentSubPage._id);
    }
  }, [currentSubPage]);

  const fetchContentDetails = async () => {
    try {
      setLoading(true);
      const response = await getSafe(`/api/contents/${currentSubPage?._id}`);
      setContentDetails(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const changeInData = (outputData: OutputData) => {
    const targetData: any = { ...contentDetails, data: outputData };
    setContentDetails(targetData);
    updateContent(outputData);
  };

  const updateContent = async (outputData: OutputData) => {
    try {
      const payload = {
        id: contentDetails?._id,
        data: outputData,
      };
      await putSafe('/api/contents', payload);
    } catch (error) {
      console.log(error);
    }
  };

  const createNewSubPage = async (payload: CreatePayload) => {
    try {
      setLoading(true);
      setIscreateSubPage(false);
      const data = {
        name: payload.name,
        tooltip: payload.description,
        pageId: currentPage._id,
      };
      await post(`/api/subpages`, data);
      updateDetails();
      setLoading(false);
    } catch (error) {
      setIscreateSubPage(false);
      setLoading(false);
      console.log(error);
    }
  };

  const handleMoreClick = (action: Action, item: SubPage) => {
    if (action === Action.EDIT) {
      setEditedSubPage(item);
    } else {
      setDeletedSubPage(item);
      setIsConfirmModalOpen(true);
    }
  };

  const handleConfirmDelte = async () => {
    try {
      setLoading(true);
      setIsConfirmModalOpen(false);
      const response = await deleteSafe(`/api/subpages/${deletedSubPage?._id}`);
      setDeletedSubPage(null);
      openSnackbar(
        `Successfully deleted subpage "${response.name}"`,
        'success'
      );
      updateDetails();
      setLoading(false);
    } catch (error) {
      setIsConfirmModalOpen(false);
      setDeletedSubPage(null);
      setLoading(false);
      console.log(error);
    }
  };

  const updateSubPage = async (argPayload: CreatePayload) => {
    try {
      const payload = {
        name: argPayload.name,
        tooltip: argPayload.description,
        id: editedSubPage?._id,
      };
      setLoading(true);
      const response = await putSafe('/api/subpages', payload);
      setEditedSubPage(null);
      openSnackbar(
        `Successfully updated subpage "${response.name}"`,
        'success'
      );
      updateDetails();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setEditedSubPage(null);
      console.log(error);
    }
  };

  return (
    <TabsContainer>
      <Tabs>
        {subPages.map((item) => (
          <Tab
            key={item._id}
            hasBorderBottom={currentTab === item._id}
            onClick={() => {
              setCurrentTab(item._id);
              changeInSubPage(item._id);
            }}
          >
            {item.name}
            {subPages.length > 1 && user?.type !== 'VIEWER' ? (
              <More>
                <MoreOption
                  options={Options}
                  handleClick={(action) => {
                    handleMoreClick(action, item);
                  }}
                  horizontal={true}
                />
              </More>
            ) : null}
          </Tab>
        ))}
        {user?.type !== 'VIEWER' ? (
          <Tab>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                setIscreateSubPage(true);
              }}
            >
              <Add fontSize="inherit" />
            </IconButton>
          </Tab>
        ) : null}
      </Tabs>

      <EditorContainer>
        {contentDetails && currentTab === contentDetails.subPageId ? (
          <ReichTextEditor
            data={contentDetails.data}
            setData={changeInData}
            readOnly={user?.type === 'VIEWER'}
          />
        ) : null}
      </EditorContainer>
      {iscreateSubPage ? (
        <CreateEditSubPage
          open={iscreateSubPage}
          close={() => {
            setIscreateSubPage(false);
          }}
          create={createNewSubPage}
          title={'Create sub page'}
        />
      ) : null}

      {editedSubPage ? (
        <CreateEditSubPage
          open={!!editedSubPage}
          close={() => {
            setEditedSubPage(null);
          }}
          item={{
            name: editedSubPage.name,
            description: editedSubPage.tooltip,
          }}
          create={updateSubPage}
          title={'Edit sub page'}
        />
      ) : null}

      {deletedSubPage && isConfirmModalOpen ? (
        <ConfirmModal
          open={isConfirmModalOpen}
          title="Are you sure?"
          message={`Are you sure you want to delete "${deletedSubPage?.name}" subpage`}
          close={() => {
            setDeletedSubPage(null);
            setIsConfirmModalOpen(false);
          }}
          confirm={handleConfirmDelte}
        />
      ) : null}
    </TabsContainer>
  );
}
