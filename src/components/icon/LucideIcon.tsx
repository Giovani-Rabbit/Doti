// LucideIcon.tsx
import {
    BookOpen,
    Code,
    Cpu,
    Folder,
    Settings,
    Layers,
    Activity,
    FileText,
    ComponentIcon,
} from "lucide-react";

export const iconMap = {
    book: BookOpen,
    code: Code,
    cpu: Cpu,
    folder: Folder,
    settings: Settings,
    layers: Layers,
    activity: Activity,
    file: FileText,
    ComponentIcon
};

export type LucideIconName = keyof typeof iconMap;

export function LucideIcon({ name, ...props }: { name: LucideIconName } & React.ComponentProps<'svg'>) {
    const IconComponent = iconMap[name];
    return IconComponent ? <IconComponent {...props} /> : <ComponentIcon />;
}
