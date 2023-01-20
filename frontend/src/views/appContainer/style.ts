import styled from "@emotion/styled";

export const AppContainerWrapper = styled.div`
  height: 100%;

  .pContainer {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 1rem;
    height: 100%;
  }
  .pSide {
    border: 2px solid #000;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    .proposalContainer {
      padding: 1rem;
      width: 100%;
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      .proposal {
        text-align: center;
        border: 1px solid #000;
        border-radius: 1rem;
        padding: 1rem;
        cursor: pointer;
        :hover {
          background-color: lightblue;
        }
      }
      .selected {
        background-color: lightblue;
      }
    }
  }

  .pWindow {
    border: 2px solid #000;
    border-radius: 1rem;
    padding: 1rem;
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 1rem;
    .contractAddrContainer {
      border-radius: 1rem;
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 1rem;
    }
    .proposalContent {
      border-radius: 1rem;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .proposalBtns {
        display: flex;
        flex-direction: rows;
        justify-content: space-between;
      }
    }
  }
`;