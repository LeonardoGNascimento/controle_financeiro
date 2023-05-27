import { ProSidebar } from "react-pro-sidebar";
import styled from "styled-components";

export const SlideBarContainer = styled.div`
  .pro-sidebar-inner {
    color: #ffffff;
    background-color: #ff2e2e;

    .pro-sidebar-layout {
      height: 100vh;
    }
  }

  .collapsed {
    width: 0px;
    min-width: 0px;
  }
  overflow: hidden;

  box-shadow: ${({ theme }) => theme.shadow};
`;

export const ProSidebarCustom = styled(ProSidebar)`
  box-shadow: ${({ theme }) => theme.shadow};
`;
