import React, { CSSProperties } from "react";
import clsx from "clsx";

interface ChatButtonProps {
    onClick: () => void;
    image: string;
    alt: string;
    badge?: number;
    className?: string; // Added className as optional prop
    position?: {
        bottom?: string;
        top?: string;
        left?: string;
        right?: string;
    };
    style?: CSSProperties;
}

const ChatButton: React.FC<ChatButtonProps> = ({
    onClick,
    image,
    alt,
    badge,
    className,
    position,
    style
}) => (
    <div
        onClick={onClick}
        className={clsx(
            "indicator fixed md:hidden z-50 shadow-xl p-1 rounded-full bg-dark ",
            position && {
                [`bottom-${position.bottom}`]: position.bottom,
                [`top-${position.top}`]: position.top,
                [`left-${position.left}`]: position.left,
                [`right-${position.right}`]: position.right,
            },
            className
        )}
        style={{
            ...style,

        }}
    >
        {(badge ?? 0) > 0 && (
            <span className="indicator-item badge badge-secondary">{badge}+</span>
        )}
        <button>
            <img
                src={image}
                className="h-8 w-8 object-contain md:h-12 md:w-12 bg-black rounded-full"
                alt={alt}
            />
        </button>
    </div>
);

export default ChatButton;
