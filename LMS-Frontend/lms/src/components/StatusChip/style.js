import { css } from "@emotion/react";

const styles = (theme, props) => {
  const chip = css`
    border: ${props.border};
    background: ${props.isHovered ? props.hoverBackgroundColor : "white"};
  `;

  const contentText = css`
    color: ${props.isHovered ? "white" : props.color};
    borderRadius: '21px',
    height: '22px',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: '13px',
    textTransform: 'capitalize',
    lineHeight: '18px',
  `;

  return {
    chip,
    contentText,
  };
};

export default styles;
