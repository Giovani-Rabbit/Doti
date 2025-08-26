import { Checkbox } from "@/components/ui/checkbox"

export default function Tasks() {
    return (
        <div className="pb-8 grow overflow-auto">
            <ul className="divide-y">
                {[1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, , 8].map((num) => (
                    <li className="py-2 px-8">
                        <div className="flex items-center gap-4">
                            <Checkbox />
                            <span>Nome da tarefa {num}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
} 