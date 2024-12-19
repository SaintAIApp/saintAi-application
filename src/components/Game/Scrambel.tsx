import React, { useEffect, useRef } from "react";
import scramble from "@ignatiusmb/scramble";

const ScrambleText: React.FC = () => {
    const textRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (textRef.current) {
            scramble(textRef.current).run();
        }
    }, []);

    return (
        <div ref={textRef} id="yourElement">
            Your scrambled text will appear here.
        </div>
    );
};

export default ScrambleText;
