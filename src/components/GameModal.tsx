import clsx from "clsx";
import { ReactNode } from "react";
import logoCircle from "../assets/saintlogocircle.png";
interface GameModalProps {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
    className?: string;
}

const GameModal: React.FC<GameModalProps> = ({
    isOpen,
    title,
    onClose,
    children,
    className,
}) => (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className={clsx(
            "bg-black border border-grey rounded-box p-6",
            "max-h-[calc(100vh-5em)] transform scale-90",
            "shadow-2xl overflow-y-auto overscroll-contain",
            className
        )}>
            <div className="flex items-center justify-center flex-row gap-3 mb-4">
                <img
                    src={logoCircle}
                    className="h-10 w-10 object-contain md:h-8 md:w-8 bg-black rounded-full"
                    alt="Chat Button"
                />
                <h5 className="font-bold text-xl">{title}</h5>
                <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">✕</button>
            </div>
            {children}
        </div>
    </dialog>
);

export default GameModal;