import { css } from '@emotion/react';

export const initial = css`
  cursor: default;
`;

export const pointer = css`
  cursor: pointer;
`;

export const grab = css`
  cursor: grab;
`;

export const grabbing = css`
  cursor: grabbing;
`;

export const horizontalResize = css`
  cursor: ew-resize;
`;

export const columnResize = css`
  cursor: col-resize;
`;

export const rowResize = css`
  cursor: row-resize;
`;

export const notAllowed = css`
  cursor: not-allowed;
`;

export const text = css`
  cursor: text;
`;

export default {
  initial,
  pointer,
  grab,
  grabbing,
  horizontalResize,
  columnResize,
  rowResize,
  notAllowed,
  text,
};
