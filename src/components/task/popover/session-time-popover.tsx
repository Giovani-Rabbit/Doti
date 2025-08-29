import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Settings2Icon } from "lucide-react";

type ModuleTimes = {
    sessionTime: number
    restTime: number
}

export default function SessionTimePopover({ sessionTime, restTime }: ModuleTimes) {
    const sessionTimeInMinutes = `${sessionTime}min`;
    const restTimeInMinutes = `${restTime}min`;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Settings2Icon size={20} className="cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="w-50">
                <div className="grid gap-4 w-full">
                    <div className="space-y-2">
                        <h4 className="leading-none font-medium">Session Time</h4>
                        <p className="text-muted-foreground text-sm">
                            Set time for this module
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="session">Session</Label>
                            <Input
                                id="session"
                                defaultValue={sessionTimeInMinutes}
                                className="col-span-2 h-8"
                            />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="rest">Rest</Label>
                            <Input
                                id="rest"
                                defaultValue={restTimeInMinutes}
                                className="col-span-2 h-8"
                            />
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}