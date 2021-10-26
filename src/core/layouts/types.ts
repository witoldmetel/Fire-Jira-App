export type MenuItemProps = {
  title: string;
  path: string;
  isExternal?: boolean;
  icon?: JSX.Element;
  to?: string;
  children?: {
    subheader: string;
    items: {
      title: string;
      path: string;
    }[];
  }[];
};
