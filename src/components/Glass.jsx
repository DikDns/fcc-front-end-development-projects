import styled from "styled-components";

export default styled.div`
  background: rgba(255, 255, 255, 0.31);
  border-radius: 8px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  position: absolute;

  width: ${({ width }) => (width ? width : "50px")};
  height: ${({ height }) => (height ? height : "50px")};
  opacity: ${({ opacity }) => (opacity ? opacity : "0.5")};
  top: ${({ top }) => (top ? top : "0")};
  right: ${({ right }) => (right ? right : "0")};
  left: ${({ left }) => (left ? left : "0")};
  bottom: ${({ bottom }) => (bottom ? bottom : "0")};
  transform: ${({ rotate }) =>
    rotate ? "rotate(" + rotate + "turn);" : "rotate(0turn)"};
`;
