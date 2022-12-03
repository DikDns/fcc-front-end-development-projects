import styled from "styled-components";

export default styled.section`
  padding: ${({ py }) => (py ? py : `0`)} ${({ px }) => (px ? px : `0`)};
  padding-top: ${({ pt }) => (pt ? pt : `0`)};
  padding-right: ${({ pe }) => (pe ? pe : `0`)};
  padding-bottom: ${({ pb }) => (pb ? pb : `0`)};
  padding-left: ${({ ps }) => (ps ? ps : `0`)};

  margin: ${({ my }) => (my ? my : `0`)} ${({ mx }) => (mx ? mx : `0`)};
  margin-top: ${({ mt }) => (mt ? mt : `0`)};
  margin-right: ${({ me }) => (me ? me : `0`)};
  margin-bottom: ${({ mb }) => (mb ? mb : `0`)};
  margin-left: ${({ ms }) => (ms ? ms : `0`)};

  width: ${({ width }) => (width ? width : `100%`)};

  display: flex;
  flex-direction: ${({ column, row }) =>
    column ? `column` : row ? `row` : `row`};
  justify-content: ${({ justify }) => (justify ? justify : `center`)};
  align-items: ${({ align }) => (align ? align : `center`)};
`;
