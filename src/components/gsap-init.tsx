// src/components/gsap-init.tsx
import { useEffect } from "react";

const GSAPInit = () => {
    useEffect(() => {
        // Your GSAP initialization logic here
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null; // No UI to render, just a side effect
};

export default GSAPInit;
