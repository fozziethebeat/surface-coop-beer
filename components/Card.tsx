import styled from "styled-components";
import { color, layout, typography } from "styled-system";

const Card = styled.div`
  ${color}
  ${layout}
  ${typography}

  border-color: rgba(229, 231, 235);
  border-radius: 0.5rem;
  border-style: solid;
  border-width: 1px;

  box-sizing: border-box;

  display: block;

  padding: 1rem;
  text-align: center;

  :hover {
    background-color: rgba(219, 234, 254);
    border-color: transparent;
  }

`;

export default Card;
