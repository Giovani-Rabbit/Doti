import NextSessionProvider from "@/components/provider/auth/next-session-provider";
import QueryProvider from "@/components/provider/query/query_provider";
import SideberBody from "@/components/sidebar/sidebar-body";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <NextSessionProvider>
            <QueryProvider>
                <SideberBody>
                    {children}
                </SideberBody>
            </QueryProvider>
        </NextSessionProvider>
    )
}