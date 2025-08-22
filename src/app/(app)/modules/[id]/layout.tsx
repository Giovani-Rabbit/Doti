
export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="grid grid-cols-2 h-full">
            <div className="border-r border-zinc-200">{children}</div>

            <div className="">

            </div>
        </div>
    );
}