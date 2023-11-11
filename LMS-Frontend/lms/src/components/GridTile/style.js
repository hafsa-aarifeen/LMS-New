import { css } from "@emotion/react";

const styles = (theme) => {
  const subTitleInfoTopic = css`
    font-family: Ubuntu;
    font-style: normal;
    font-weight: bold;
    font-size: 1rem;
    margin-top: 0.5em;
  `;
  const container = css`
    box-shadow: 0px 1px 8px rgb(20 46 110 / 15%);
    border-radius: 8px;
    padding: 1em 1em 0.5em 1em;
    &:hover {
      box-shadow: 0px 1px 8px #696969;
      cursor: pointer;
    }
    width: 600px;
  `;

  const title = css`
    font-family: Ubuntu;
    font-style: normal;
    font-weight: bold;
    font-size: 1.4em;
    color: theme.palette.common.blue;
    margin: 0.2em 0;
    width: 250px;
    white-space: nowrap;
    over-flow: hidden;
    text-overflow: ellipsis;
    color: grey;
  `;
  const tagGridConainer = css`
    height: 20px;
  `;
  const tagGrid = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
  const deletedChip = css`
    text-align: "end";
  `;

  return {
    subTitleInfoTopic,
    container,
    title,
    tagGridConainer,
    tagGrid,
    deletedChip,
  };
};

export default styles;
