import React from 'react';
import { Project } from '@datatypes/project';
import styled from '@emotion/styled';
import color from '@utils/styles/color';
import cursor from '@utils/styles/cursor';
import spacing from '@utils/styles/spacing';
import design1 from '@assets/images/design1.png';
import { useNavigate } from 'react-router-dom';
import MoreOption from '@modules/common/components/moreoption';
import { Action, Option } from '@datatypes/common';

type Props = {
  item: Project;
  isViewer: boolean
  deleteProject: (item: Project) => void;
  editProject: (item: Project) => void;
};

const ProjectContainer = styled.div`
  position: relative;
  width: 180px;
  height: 190px;
  ${cursor.pointer};
  padding: ${spacing.small}px;
  border-radius: ${spacing.small}px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: ${color.purple0};
`;

const TemplateImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: ${spacing.small}px;
`;

const Title = styled.div`
  padding: ${spacing.medium}px ${spacing.small}px;
`;

const ActionRow = styled.div`
  position: absolute;
  right: -5px;
  top: -5px;
`;

const options: Option[] = [
  {
    label: 'Edit',
    value: Action.EDIT,
  },
  {
    label: 'Delete',
    value: Action.DELETE,
  },
];

const ProjectItem = ({ item, editProject, deleteProject, isViewer }: Props) => {
  const navigate = useNavigate();
  const routeToProject = () => {
    navigate(`/project/${item.localId}`);
  };

  const handleAction = (action: Action) => {
    if (action === Action.EDIT) {
      editProject(item);
    } else {
      deleteProject(item);
    }
  };

  return (
    <ProjectContainer onClick={routeToProject}>
      <TemplateImageWrapper>
        <img src={design1} alt={item.name} />
      </TemplateImageWrapper>
      <Title>{item.name}</Title>
      <ActionRow>
        {!isViewer ? (
          <MoreOption
            options={options}
            handleClick={handleAction}
            horizontal={true}
          />
        ) : null}
      </ActionRow>
    </ProjectContainer>
  );
};

export default ProjectItem;
