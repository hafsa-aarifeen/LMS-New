import { css } from "@emotion/react";

const styles = (theme) => {
  const container = css`
    display: flex;
    flex-direction: column;
    flex: 1;
  `;
  const select = css`
    font-family: Ubuntu;
    font-style: normal;
    font-weight: normal;
    color: #001847;
  `;

  const label = css`
    ${theme.appDirector.label}
    flex-direction: column;
  `;
  const error = css`
    color: red;
  `;

  return {
    container,
    select,
    label,
    error,
  };
};

export default styles;
