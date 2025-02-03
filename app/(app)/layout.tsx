import HeaderLayout from "@/components/layout/header/headerLayout";
import ProjectsLayout from "@/components/layout/projectList/projectsLayout";
import SideNav from "@/components/layout/sidebar/sidenav";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-16 border-r border-zinc-200">
                <SideNav />
            </div>
            <div className="flex w-full h-screen md:overflow-y-auto">
                <ProjectsLayout />

                <div className="flex flex-col h-screen w-full">
                    <HeaderLayout />
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;