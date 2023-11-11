import { css } from "@emotion/react";

const styles = (theme) => {
  const Grid = css`
    align-items: center;
    display: flex;
  `;
  const list = css`
    margin-top: 0.5em;
    overflow-y: auto;
    max-height: 23em;
    li {
      padding: 5px 0;
      margin: 5px 0;
    }
  `;
  const text = css`
    font-family: Ubuntu;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    color: #000000;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      overflow: visible;
      white-space: normal;
    }
  `;
  const title = css`
    font-family: Ubuntu;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    color: #000000;
  `;
  const subHeader = css`
    font-family: Ubuntu;
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.54);
  `;
  const allNamespaces = css`
    font-family: Ubuntu;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    color: #808ca3;
  `;
  const listItemIcon = css`
    max-height: 40px;
  `;
  const listItemText = css`
    height: 2.5em;
  `;
  const paper = css`
    height: 30em;
    padding: 20px;
    background: #ffffff;
    box-shadow: 0px 1px 8px rgba(20, 46, 110, 0.1);
    border-radius: 8px;
  `;
  const searchBar = css`
    height: "2.5em";
  `;
  const labelledSelect = css`
    paddingleft: 2px;
    margin: 5px;
  `;
  const transferButtons = css`
    &:hover: {
      border: 2px solid #626799;
    }
  `;

  const buttonSm = css`
    min-width: 60px;
  `;

  const removeButton = css`
    background-color: #ffffff;
    border-radius: 4px;
    color: #626799;
    &:hover {
      background-color: #ffffff !important;
      border: 2px solid #626799;
    }
    border: 1px solid rgba(0, 0, 0, 0.5);
    &:disabled {
      border: none;
    }
  `;

  const disabledText = css`
    font-family: Ubuntu !important;
    font-weight: 600 !important;
    font-style: normal !important;
    font-size: 16px !important;
    line-height: 22px !important;
    color: rgba(0, 0, 0, 0.54);
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      overflow: visible;
      white-space: normal;
    }
  `;
  const disabledList = css`
    margin-left: 1.5em;
  `;

  const select = css`
    background-color: #EFF3FA,
    border-radius: ${theme.shape.borderRadius},
    height: 100px,
    padding-left: 20px,
    // font-family: Ubuntu,
    // font-style: normal,
    // font-weight: normal,
    // font-size: 15px,
    color: #001847 !important,
    margin-right: 10px,
    margin-top: 50px,
  `;

  return {
    Grid,
    list,
    text,
    title,
    subHeader,
    allNamespaces,
    listItemIcon,
    paper,
    searchBar,
    labelledSelect,
    transferButtons,
    removeButton,
    disabledText,
    disabledList,
    select,
    listItemText,
    buttonSm,
  };
};

export default styles;
