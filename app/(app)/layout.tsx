import HeaderLayout from "@/components/layout/header/headerLayout";
import ProjectListLayout from "@/components/layout/projectList/projectListLayout";
import SideNav from "@/components/layout/sidebar/sidenav";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-16 border-r border-zinc-300">
                <SideNav />
            </div>
            <div className="flex flex-col flex-grow md:overflow-y-auto">
                <div className="flex h-full">
                    <ProjectListLayout />
                    <HeaderLayout />
                </div>
                <div className="flex-grow overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};


export default Layout;