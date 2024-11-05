import React, { useState, useEffect } from "react";

interface CommandInterfaceProps {
    onCommand: (command: string) => void;
    onFocus: () => void;
    onBlur: () => void;
}

const CommandInterface: React.FC<CommandInterfaceProps> = ({ onCommand, onFocus, onBlur }) => {
    const [inputValue, setInputValue] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            onCommand(inputValue);
            setInputValue("");
            setIsVisible(false);
        } else if (e.key === "Escape") setIsVisible(false);
    };

    // Mostrar/ocultar la interfaz con la tecla "/"
    useEffect(() => {
        const toggleCommandInterface = (e: KeyboardEvent) => {
            if (e.key === "/") setIsVisible(true);
        };

        window.addEventListener("keydown", toggleCommandInterface);
        return () => window.removeEventListener("keydown", toggleCommandInterface);
    }, []);

    if (!isVisible) return null;

    return (
        <input
            type="text"
            className="command-input"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onFocus={onFocus}
            onBlur={onBlur}
            autoFocus
            placeholder="Enter a command..."
        />
    );
};

export default CommandInterface;