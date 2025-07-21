
import { create } from "zustand"
import { ModuleDTO } from "./module_dto"
import { Module } from "./module_interface"

type ModuleStore = Module

type IModuleStore = {
    modules: ModuleStore[]
    create: (module: ModuleStore) => void
}

const useModuleStore = create<IModuleStore>((set) => ({
    modules: [],
    create: (module) => (
        set((state) => ({
            modules: [...state.modules, module],
        }))
    )
}))

export { useModuleStore }
export type { ModuleStore }
