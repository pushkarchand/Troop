import { css } from '@mui/material';

const baseText = css`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  margin: 0;
`;

/* Header */
export const h1 = css`
  ${baseText};
  font-size: 18px;
  line-height: 30px;
`;

export const h2 = css`
  ${baseText};
  font-size: 16px;
  line-height: 26px;
`;

/* Body */
export const regular = css`
  ${baseText};
  font-size: 14px;
  line-height: 16px;
`;

export const semibold = css`
  ${regular};
  font-weight: 600;
`;

export const small = css`
  ${baseText};
  font-size: 11px;
  line-height: 14px;
`;

export const smallSemibold = css`
  ${small};
  font-weight: 600;
`;
export const numeric = css`
  ${baseText};
  font-size: 14px;
  line-height: 16px;
  font-variant-numeric: tabular-nums;
`;
export const numericSemibold = css`
  ${numeric};
  font-weight: 600;
`;

export default {
  h1,
  h2,
  regular,
  semibold,
  small,
  smallSemibold,
  numeric,
  numericSemibold,
};
