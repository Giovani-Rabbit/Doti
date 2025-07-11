import SideberBody from "@/components/sidebar/sidebar-body";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <SideberBody>{children}</SideberBody>
}