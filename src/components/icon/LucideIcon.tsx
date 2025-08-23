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
    AtomIcon,
    MicroscopeIcon,
    DatabaseIcon,
    PiIcon,
    RadioTowerIcon,
    PencilLineIcon,
    BitcoinIcon,
    BinaryIcon,
    ChartNoAxesCombinedIcon,
    CookingPotIcon,
    DramaIcon,
    DumbbellIcon,
    PaintbrushVerticalIcon,
    PianoIcon,
    TestTubeIcon,
} from "lucide-react";

export const iconMap = {
    activity: Activity,
    atom: AtomIcon,
    binary: BinaryIcon,
    bitcoin: BitcoinIcon,
    book: BookOpen,
    chart: ChartNoAxesCombinedIcon,
    code: Code,
    cooking: CookingPotIcon,
    ComponentIcon,
    cpu: Cpu,
    database: DatabaseIcon,
    drama: DramaIcon,
    file: FileText,
    folder: Folder,
    gym: DumbbellIcon,
    layers: Layers,
    microscope: MicroscopeIcon,
    paint: PaintbrushVerticalIcon,
    pencil: PencilLineIcon,
    pi: PiIcon,
    piano: PianoIcon,
    radioTower: RadioTowerIcon,
    settings: Settings,
    tube: TestTubeIcon,
};

export type LucideIconName = keyof typeof iconMap;

export function LucideIcon({ name, ...props }: { name: LucideIconName } & React.ComponentProps<'svg'>) {
    const IconComponent = iconMap[name];
    return IconComponent ? <IconComponent {...props} /> : <ComponentIcon />;
}
