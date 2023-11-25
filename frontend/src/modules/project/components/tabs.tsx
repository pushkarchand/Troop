import * as React from 'react';
import ReichTextEditor from '@modules/common/components/richtexteditor';
import styled from '@emotion/styled';
import spacing from '@utils/styles/spacing';
import color from '@utils/styles/color';
import cursor from '@utils/styles/cursor';
import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import align from '@utils/styles/align';

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
`;

export default function BasicTabs() {
  const [currentTab, setCurrentTab] = React.useState(0);

  return (
    <TabsContainer>
      <Tabs>
        <Tab
          hasBorderBottom={currentTab === 0}
          onClick={() => {
            setCurrentTab(0);
          }}
        >
          Implementation
        </Tab>
        <Tab
          hasBorderBottom={currentTab === 1}
          onClick={() => {
            setCurrentTab(1);
          }}
        >
          Usage
        </Tab>
        <Tab>
          <IconButton aria-label="delete" size="small">
            <Add fontSize="inherit" />
          </IconButton>
        </Tab>
      </Tabs>

      <EditorContainer>
        <ReichTextEditor />
      </EditorContainer>
    </TabsContainer>
  );
}
