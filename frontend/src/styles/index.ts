import styled from "@emotion/styled";

export const GlobalWrapper = styled.div`
  display: grid;
  grid-template-areas: 
    "header header header"
    "article article article"
    "footer footer footer";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  height: 100vh;
  margin: 0;
  background-color: #000;
  padding: 0;
  margin: 0;

  header, footer, article, nav {
    padding: 1.2rem;
    background: #96A825;
  }

  #pageHeader {
    grid-area: header;
  }
  #pageContainer {
    grid-area: article;
  }
  #pageSidebar {
    grid-area: nav;
  }
  #pageFooter {
    grid-area: footer;
  }

  /* Stack the layout on small devices/viewports. */
  @media all and (max-width: 575px) {
    grid-template-areas: 
      "header"
      "article"
      "footer";
    grid-template-rows: auto 1fr 1fr auto;  //
    grid-template-columns: 1fr;
  }
`;