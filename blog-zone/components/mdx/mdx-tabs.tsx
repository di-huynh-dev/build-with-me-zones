"use client";

import React, { ReactElement, ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TabItemProps {
  value: string;
  label: string;
  default?: boolean;
  children: ReactNode;
}

export function TabItem({ children }: TabItemProps) {
  return <>{children}</>;
}

interface MdxTabsProps {
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
  defaultValue?: string;
  groupId?: string; // Docusaurus uses this for syncing tabs, we can ignore or implement later
}

export function MdxTabs({ children, defaultValue }: MdxTabsProps) {
  const tabs = React.Children.toArray(children) as ReactElement<TabItemProps>[];
  
  // Find default value
  let defaultVal = defaultValue;
  if (!defaultVal) {
    const defaultTab = tabs.find((tab) => tab.props.default);
    defaultVal = defaultTab ? defaultTab.props.value : tabs[0]?.props.value;
  }

  return (
    <Tabs defaultValue={defaultVal} className="w-full my-6">
      <TabsList className="w-full justify-start overflow-x-auto">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.props.value} value={tab.props.value}>
            {tab.props.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.props.value} value={tab.props.value} className="mt-4 border rounded-lg p-4">
          {tab.props.children}
        </TabsContent>
      ))}
    </Tabs>
  );
}
