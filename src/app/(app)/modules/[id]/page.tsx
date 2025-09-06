import Tasks from "@/components/task/tasks";
import ModuleHeader from "./__components/module_header";

export default function ModulePage() {
    return (
        <div className="h-screen flex flex-col text-800">
            <ModuleHeader />
            <Tasks tasks={tasks} />
        </div>
    );
}

const tasks = [
    {
        id: "1",
        name: "Algebra Linear",
        isComplete: false,
        position: 1,
        created_at: "28/08/2025",
        updated_at: "28/08/2025"
    },
    {
        id: "2",
        name: "Programaca Funcional",
        isComplete: true,
        position: 2,
        created_at: "28/08/2025",
        updated_at: "28/08/2025"
    },
    {
        id: "3",
        name: "Arquitetura limpa",
        isComplete: false,
        position: 3,
        created_at: "28/08/2025",
        updated_at: "28/08/2025"
    },
    {
        id: "4",
        name: "Banco de dados",
        isComplete: false,
        position: 4,
        created_at: "28/08/2025",
        updated_at: "28/08/2025"
    },
    {
        id: "5",
        name: "Server Side Rendering",
        isComplete: true,
        position: 5,
        created_at: "28/08/2025",
        updated_at: "28/08/2025"
    },
    {
        id: "6",
        name: "Algebra Linear",
        isComplete: false,
        position: 6,
        created_at: "28/08/2025",
        updated_at: "28/08/2025"
    },
    {
        id: "7",
        name: "Banco de dados",
        isComplete: false,
        position: 7,
        created_at: "28/08/2025",
        updated_at: "28/08/2025"
    },
    {
        id: "8",
        name: "System Design",
        isComplete: true,
        position: 8,
        created_at: "28/08/2025",
        updated_at: "28/08/2025"
    },
]
