import {
  Menu,
  MenuItem,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import { Item } from "./item";
import { ProSidebarCustom, SlideBarContainer } from "./style";
interface Props {
  colapsed: boolean;
  logout: any;
}

export function SlideBar({ colapsed, logout }: Props) {
  return (
    <SlideBarContainer>
      <ProSidebarCustom collapsed={colapsed}>
        <SidebarContent>
          <Menu iconShape="square">
            <Item />
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu>
            <MenuItem onClick={logout}>Sair</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebarCustom>
    </SlideBarContainer>
  );
}
