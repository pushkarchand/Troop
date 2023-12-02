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
import { getSafe, post, putSafe } from '@api/safe';
import { useEffect, useState } from 'react';
import { OutputData } from '@editorjs/editorjs';
import CreateModal from '@modules/common/components/createmodal';

type SubPageProps = {
  subPages: SubPage[];
  currentSubPage: SubPage | null;
  currentPage: Page;
  changeInSubPage: (id: string) => void;
  updateDetails: () => void;
};

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
  padding: ${spacing.small}px ${spacing.medium}px;
  ${cursor.pointer};
  transition: border-color 0.1s ease;
  border-bottom: ${({ hasBorderBottom }) =>
    hasBorderBottom ? `3px solid ${color.purple400}` : 'none'};
  ${align.center};
  box-sizing: border-box;
`;

export default function SubPagesSection({
  subPages,
  changeInSubPage,
  currentSubPage,
  currentPage,
  updateDetails,
}: SubPageProps) {
  const [currentTab, setCurrentTab] = useState(currentSubPage?._id);
  const [contentDetails, setContentDetails] = useState<Content | null>(null);
  const [iscreateSubPage, setIscreateSubPage] = useState(false);

  useEffect(() => {
    if (currentSubPage) {
      fetchContentDetails();
      setCurrentTab(currentSubPage._id);
    }
  }, [currentSubPage]);

  const fetchContentDetails = async () => {
    try {
      const response = await getSafe(`/api/contents/${currentSubPage?._id}`);
      setContentDetails(response);
    } catch (error) {
      console.log(error);
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
      const data = {
        name: payload.name,
        tooltip: payload.description,
        pageId: currentPage._id,
      };
      await post(`/api/subpages`, data);
      setIscreateSubPage(false);
      updateDetails();
    } catch (error) {
      setIscreateSubPage(false);
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
          </Tab>
        ))}
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
      </Tabs>

      <EditorContainer>
        {contentDetails && currentTab === contentDetails.subPageId ? (
          <ReichTextEditor data={contentDetails.data} setData={changeInData} />
        ) : null}
      </EditorContainer>
      {
        <CreateModal
          open={iscreateSubPage}
          close={() => {
            setIscreateSubPage(false);
          }}
          create={createNewSubPage}
          title={'Create sub page'}
        />
      }
    </TabsContainer>
  );
}
