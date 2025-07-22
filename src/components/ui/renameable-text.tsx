import { forwardRef, useEffect } from "react"

type IRenameableText = {
    text: string
    isRenaming: boolean
    onConfirm: () => void
    onCancel: () => void
}

export const RenameableText = forwardRef<HTMLInputElement, IRenameableText>(
    ({ text, isRenaming, onConfirm, onCancel }, ref) => {
        useEffect(() => {
            if (isRenaming && ref && typeof ref !== "function") {
                ref.current?.focus();
                ref.current?.select();
            }
        }, [isRenaming, ref])

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") onConfirm();
            if (e.key === "Escape") onCancel();
        }

        if (!isRenaming) return <span>{text}</span>

        return (
            <input
                ref={ref}
                className="w-[90%] bg-transparent border-none shadow-none focus:outline-none focus:ring-0 focus:border-none focus:shadow-none text-inherit p-0 m-0"
                defaultValue={text}
                onKeyDown={handleKeyDown}
                onBlur={onCancel}
            />
        )
    }
)

export default RenameableText;