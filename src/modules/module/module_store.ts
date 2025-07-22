
import { create } from "zustand"
import { Module } from "./module_interface"

type IModuleStore = {
    modules: Module[]
    create: (module: Module) => void
    remove: (id: string) => void
    rename: (id: string, newName: string) => void
}

const useModuleStore = create<IModuleStore>((set) => ({
    modules: [],
    create: (module) =>
        set((state) => ({
            modules: [...state.modules, module]
        })),

    remove: (id) =>
        set(state => ({
            modules: state.modules.filter(mod => mod.id != id)
        })),

    rename: (id, newName) =>
        set(state => ({
            modules: state.modules.map(mod =>
                mod.id === id ? { ...mod, name: newName } : mod
            )
        }))
}))

export { useModuleStore }