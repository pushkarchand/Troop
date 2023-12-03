import React from 'react';
import { Action, Option } from '@datatypes/common';
import { IconButton, Menu, MenuItem } from '@mui/material';
import styled from '@emotion/styled';
import MoreHorIcon from '@mui/icons-material/MoreHoriz';
import MoreVerIcon from '@mui/icons-material/MoreVert';

type Props = {
  options: Option[];
  horizontal?: boolean;
  handleClick: (action: Action) => void;
};

const CustomMenuItem = styled(MenuItem)`
  min-width: 175px !important;
`;

const MoreOption = ({ options, handleClick, horizontal }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(event) => handleOpen(event)}
        size='small'
      >
        {horizontal?<MoreHorIcon />:<MoreVerIcon/>}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {options.map((item) => (
          <CustomMenuItem
            key={item.value}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleClick(item.value);
              setAnchorEl(null);
            }}
          >
            {item.label}
          </CustomMenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MoreOption;
