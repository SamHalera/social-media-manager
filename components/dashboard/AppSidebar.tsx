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
  LayoutDashboard,
  LogOut,
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

export function AppSidebar({ wallets }: { wallets: WalletProps[] | null }) {
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
                  "text-blue-700": pathname.includes("/dashboard/wallet"),
                })}
              >
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Wallets">
                    <Wallet />
                    <span>Wallets</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {wallets &&
                      wallets.map((item) => (
                        <SidebarMenuSubItem key={item.name}>
                          <SidebarMenuSubButton
                            className={clsx({
                              "text-blue-700":
                                pathname === `/dashboard/wallets/${item.id}`,
                            })}
                            asChild
                          >
                            <a href={`/dashboard/wallets/${item.id}`}>
                              <span>{item.name}</span>
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
