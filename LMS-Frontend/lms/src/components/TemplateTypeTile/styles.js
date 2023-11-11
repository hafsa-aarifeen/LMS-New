import { css } from "@emotion/react";

const styles = (theme, props) => {
  const tile = css`
    padding: 1.5em;
    background: #ffffff;
    box-shadow: 0px 2px 2px 2px rgba(20, 46, 110, 0.1);

    border-radius: 20px;
    width: ${props.width ? props.width : "100%"};
    height: ${props.height ? props.height : "100%"};
  `;

  const tileClicked = css`
    padding: 1.5em;
    background: #ffffff;
    box-shadow: 0px 0px 0px 1px rgba(20, 46, 110, 0.1);

    border-radius: 20px;
    width: ${props.width ? props.width : "100%"};
    height: ${props.height ? props.height : "100%"};
  `;

  const tileContent = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  `;

  const tileHeader = css`
    flex: 0;
  `;

  const templateTitle = css`
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: ${props.textAlign ? props.textAlign : "left"};
  `;

  const templateDescription = css`
    font-size: 1rem;
    font-weight: none;
    margin-bottom: 5rem;
  `;

  const tileBody = css`
  flex: 1,
  height: 100%
  width: 100%
  display: flex
  flex-direction: column
  `;

  return {
    tile,
    tileClicked,
    tileContent,
    tileHeader,
    templateTitle,
    templateDescription,
    tileBody,
  };
};
export default styles;
