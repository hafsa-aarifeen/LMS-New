import { css } from "@emotion/react";

const styles = ({ theme, backgroundColor, height }) => {
  const root = css`
    color: #ffffff;
    border-radius: 18px;
    height: ${height ? height : "24px"};
    font-weight: 600;
    font-style: normal;
    font-size: 14px;
    line-height: 19px;
    margin: 0px 3px;
    background-color: ${backgroundColor ? backgroundColor : "#B5BDE9"};
  `;
  const title = css`
    font-size: "14px";
  `;

  return {
    root,
    title,
  };
};

export default styles;
