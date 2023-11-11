import { css } from "@emotion/react";

const styles = (theme) => {
  const root = css`
    flex-grow: 1;
    display: flex;
    height: 224;
  `;
  const text = css`
    font-family: Ubuntu;
    font-style: normal;
    font-size: 0.875rem;
    line-height: 20px;
    font-weight: bold;
    color: #001847;
    cursor: default;
  `;
  const stagesBox = css`
    background: #ffffff;
    box-shadow: 0px 1px 8px rgba(20, 46, 110, 0.1);
    border-radius: 4px;
    padding: 20px;
  `;
  const tab = css`
    display: flex;
    align-items: normal;
    justify-content: space-between;
    padding: 10px;
    margin-left: 0;
    margin-right: 0;
    background: #ffffff;
    box-shadow: 0px 1px 8px rgba(20, 46, 110, 0.1);
    border-radius: 4px;
  `;
  const stageText = css`
    font-family: Ubuntu;
    font-style: normal;
    font-weight: normal;
    font-size: 0.875rem;
    color: #808ca3;
  `;
  const stepText = css`
    font-family: Ubuntu;
    font-style: normal;
    text-align: left;
    font-weight: 600;
    font-size: 1rem;
    line-height: 22px;
    color: #001847;
  `;
  const tabIcon = css`
    margin-right: 10px;
  `;
  const input = css`
    cursor: default;
  `;

  return {
    root,
    text,
    stagesBox,
    tab,
    stageText,
    stepText,
    tabIcon,
    input,
  };
};
export default styles;
