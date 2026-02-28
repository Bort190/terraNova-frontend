import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub,
    SidebarMenuSubButton, SidebarMenuSubItem
} from "@/components/ui/sidebar.tsx";
import {ChevronRight} from "lucide-react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import {DynamicIcon, type IconName} from 'lucide-react/dynamic';
import {Link} from "@tanstack/react-router";
import {useState} from "react";
import {Separator} from "@/components/ui/separator.tsx";

type ItemType = {
    title: string;
    url: string;
}

type NavItem = {
    title: string;
    url: string;
    icon?: IconName;
    items?: ItemType[];
}

type NavItemsType = {
    navMain: NavItem[]
}

export const AppSidebar = () => {
    const [openItem, setOpenItem] = useState<string | null>(null)
    const data: NavItemsType = {
        navMain: [
            {
                title: "Dashboard",
                url: "/",
                icon: "square-terminal"
            },
            {
                title: "Pferde",
                url: "/horses",
                icon: "house",
                items: [
                    {
                        title: "Hinzufügen",
                        url: "/horses/create",
                    }
                ],
            },
            {
                title: "Termine",
                url: "/appointments",
                icon: "clipboard-clock",
                items: [
                    {
                        title: "Hinzufügen",
                        url: "/appointments/create",
                    },
                    {
                        title: "Update",
                        url: "/appointments/update",
                    }
                ],
            },
            {
                title: "Dokumentation",
                url: "#",
                icon: "book-open",
                items: [
                    {
                        title: "Introduction",
                        url: "#",
                    },
                    {
                        title: "Get Started",
                        url: "#",
                    },
                    {
                        title: "Tutorials",
                        url: "#",
                    },
                    {
                        title: "Changelog",
                        url: "#",
                    },
                ],
            },
            {
                title: "Einstellungen",
                url: "#",
                icon: "settings",
                items: [
                    {
                        title: "General",
                        url: "#",
                    },
                    {
                        title: "Team",
                        url: "#",
                    },
                    {
                        title: "Billing",
                        url: "#",
                    },
                    {
                        title: "Limits",
                        url: "#",
                    },
                ],
            },
        ]
    }

    type NavMainPropsType = {
        items: NavItem[],
        openItem: string | null
        setOpenItem: (value: string | null) => void
    }


    const NavMain = ({items, openItem, setOpenItem}: NavMainPropsType) => (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        className="group/collapsible"
                        open={openItem === item.title}
                        onOpenChange={(open) =>
                            setOpenItem(open ? item.title : null)
                        }
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton asChild tooltip={item.title}>
                                    <Link to={item.url} activeOptions={{exact: false}}
                                          activeProps={{className: "bg-gray-200 font-medium",}}
                                          className="flex items-center gap-2 w-full">
                                        {item.icon && <DynamicIcon name={item.icon} size={20}/>}
                                        <span>{item.title}</span>
                                        {item.items && <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>}
                                    </Link>
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.items?.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton asChild>
                                                <Link to={subItem.url}
                                                      activeProps={{className: "bg-gray-100"}}>{subItem.title}</Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>Terra Nova CRM</SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <Separator/>
            <SidebarContent>
                <NavMain items={data.navMain} openItem={openItem} setOpenItem={setOpenItem}/>
            </SidebarContent>
            <SidebarFooter/>
        </Sidebar>
    );
};

