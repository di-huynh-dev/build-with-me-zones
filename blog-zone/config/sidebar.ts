export interface SidebarItem {
  type: "link" | "category";
  label: string;
  href?: string; // For type: 'link'
  items?: SidebarItem[]; // For type: 'category'
  collapsed?: boolean; // Default collapsed state for categories
}

export const sidebarConfig: SidebarItem[] = [
  {
    type: "category",
    label: "Get Started",
    collapsed: false,
    items: [
      {
        type: "link",
        label: "Introduction",
        href: "/docs/intro",
      },
    ],
  },
  {
    type: "category",
    label: "TanStack",
    collapsed: false,
    items: [
      {
        type: "link",
        label: "TanStack Query",
        href: "/docs/tanstack-query",
      },
    ],
  },
];
