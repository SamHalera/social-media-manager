"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  ChartNoAxesCombined,
  ChevronRight,
  Hash,
  Instagram,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Settings,
  Wallet,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Campaign, Post } from "@prisma/client";

export function AppSidebar({ campaigns }: { campaigns: Campaign[] | null }) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem
              className={clsx(" ", {
                "text-blue-700": pathname === "/dashboard",
              })}
            >
              <a href="/dashboard">
                <SidebarMenuButton>
                  <LayoutDashboard />
                  <span>Dahsboard</span>
                </SidebarMenuButton>
              </a>
            </SidebarMenuItem>
            <Collapsible
              asChild
              defaultOpen={true}
              className="group/collapsible"
            >
              <SidebarMenuItem
                className={clsx("", {
                  "text-blue-700": pathname.includes("/dashboard/campaign"),
                })}
              >
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Campaigns">
                    <Megaphone />
                    <span>Campaigns</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {campaigns &&
                      campaigns.map((campaign) => (
                        <SidebarMenuSubItem key={campaign.name}>
                          <SidebarMenuSubButton
                            className={clsx({
                              "text-blue-700":
                                pathname ===
                                `/dashboard/campaign/${campaign.id}`,
                            })}
                            asChild
                          >
                            <a href={`/dashboard/campaign/${campaign.id}`}>
                              <span>{campaign.name}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
            <SidebarMenuItem
              className={clsx("", {
                "text-blue-700": pathname === "/dashboard/stats",
              })}
            >
              <a href="/dashboard/stats">
                <SidebarMenuButton>
                  <ChartNoAxesCombined />
                  <span>Stats</span>
                </SidebarMenuButton>
              </a>
            </SidebarMenuItem>
            <SidebarMenuItem
              className={clsx("", {
                "text-blue-700": pathname === "/dashboard/hash",
              })}
            >
              <a href="/dashboard/hash">
                <SidebarMenuButton>
                  <Hash />
                  <span>Hashtags</span>
                </SidebarMenuButton>
              </a>
            </SidebarMenuItem>
            <SidebarMenuItem
              className={clsx("", {
                "text-blue-700": pathname === "/settings",
              })}
            >
              <SidebarMenuButton>
                <Settings />
                <a href="/settings">Settings</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-1">
              <SidebarMenuButton
                onClick={async () => {
                  signOut();
                }}
              >
                <LogOut /> Logout
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
