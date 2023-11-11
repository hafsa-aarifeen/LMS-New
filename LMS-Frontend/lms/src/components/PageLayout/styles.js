import { css } from "@emotion/react";

const styles = (theme, props) => {
  const gridContainer = css`
    flex-direction: column;
    flex-wrap: nowrap;
    padding: 10px;
    padding-right: 60px;
  `;
  const headingTitle = css`
    font-family: Ubuntu !important;
    font-weight: 600 !important;
    font-style: normal !important;
    font-size: 30px !important;
    font-color: #7192f5;
    line-height: 41px !important;
  `;
  const helperTextSection = css`
    padding-top: 15px;
  `;
  const section = css`
    padding-top: 30px;
  `;
  const bottomPageActions = css`
    z-index: 999;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid #e3e3e3;
    padding: 20px 15px;
    text-align: right;
  `;

  return {
    gridContainer,
    headingTitle,
    helperTextSection,
    section,
    bottomPageActions,
  };
};

export default styles;
