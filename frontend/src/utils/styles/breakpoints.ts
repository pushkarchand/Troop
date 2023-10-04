import { css } from "@emotion/react";

const PHONE = 420;
const TABLET_POTRAIT = 420;
const TABLET_LANDSCAPE = 420;
const DESKTOP = 420;

const media =
  (unit: number) =>
  (...args: Array<any>) =>
    css`
      @media only screen and max-width(${unit}px) {
        ${css(
          ...args
        )}
      }
    `;

export const phone = media(PHONE);
export const tabletPotrait = media(TABLET_POTRAIT);
export const tabletLandscape = media(TABLET_LANDSCAPE);
export const desktop = media(DESKTOP);

export default{
    phone,
    tabletLandscape,
    tabletPotrait,
    desktop
}
