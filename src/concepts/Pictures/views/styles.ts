import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-gap: 2rem;
  min-height: 100vh;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;

  @media (max-width: 780px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

export const InfiniteLoading = styled.div``;
