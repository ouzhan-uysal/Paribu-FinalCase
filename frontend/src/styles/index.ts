import styled from "@emotion/styled";

export const GlobalWrapper = styled.div`
  display: grid;
  grid-template-areas: 
    "header header header"
    "article article article"
    "footer footer footer";
  grid-template-rows: auto 1fr;  // header / container / footer
  grid-template-columns: 1fr; // sidebar / header & container & footer
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  height: 100vh;
  margin: 0;
  background-color: #000;
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
    Helvetica Neue, sans-serif;

  * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  
  button {
    cursor: pointer;
  }

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