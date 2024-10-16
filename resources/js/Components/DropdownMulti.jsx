import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import Checkbox from "./Checkbox";
import { Transition } from "@headlessui/react";

const DropdownMulti = forwardRef(function DropdownMulti(
    {
        className = "",
        isFocused = false,
        options = [],
        onChange,
        value = [],
        ...props
    },
    ref
) {
    const localRef = useRef(null);
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(value);

    // Normalize the selectedOptions to always contain full objects
    const normalizedSelectedOptions = selectedOptions
        .map((option) =>
            typeof option === "object"
                ? option
                : options.find((o) => o.value === option)
        )
        .filter(Boolean);

    // Filter available options (remove the ones already selected)
    const availableOptions = options.filter(
        (option) =>
            !normalizedSelectedOptions.some((o) => o.value === option.value)
    );

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    useEffect(() => {
        setSelectedOptions(value);
    }, [value]);

    // Add click outside listener
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleOption = (option) => {
        const updatedSelection = normalizedSelectedOptions.some(
            (o) => o.value === option.value
        )
            ? normalizedSelectedOptions.filter(
                  (item) => item.value !== option.value
              )
            : [...normalizedSelectedOptions, option];

        setSelectedOptions(updatedSelection);
        onChange && onChange(updatedSelection.map((o) => o.value));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            setIsOpen(!isOpen);
        }
    };

    const removeOption = (optionValue) => {
        const updatedSelection = normalizedSelectedOptions.filter(
            (item) => item.value !== optionValue
        );
        setSelectedOptions(updatedSelection);
        onChange && onChange(updatedSelection.map((o) => o.value));
    };

    return (
        <div
            className="relative"
            ref={(el) => {
                localRef.current = el;
                dropdownRef.current = el;
            }}
            tabIndex="0"
            onKeyDown={handleKeyDown}
        >
            <div
                className={`block w-full bg-white border border-gray-300 rounded-md shadow-sm ${
                    isOpen ? "border-indigo-500 ring-1 ring-indigo-500" : ""
                } focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 p-2 cursor-pointer ${className}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {normalizedSelectedOptions.length === 0 ? (
                    "Select options..."
                ) : (
                    <div className="flex flex-wrap gap-1">
                        {normalizedSelectedOptions.map((option) => (
                            <div
                                key={option.value}
                                className="flex items-center bg-gray-200 px-2 py-1 rounded-md "
                            >
                                <span className="text-xs">{option.label}</span>
                                <button
                                    type="button"
                                    onClick={() => removeOption(option.value)}
                                    className="flex items-center justify-center w-4 h-4 text-gray-500 hover:text-gray-800 focus:outline-none "
                                    aria-label="Remove option"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="size-3"
                                    >
                                        <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-20 overflow-auto">
                    {availableOptions.length === 0 ? (
                        <div className="p-2 text-gray-500">
                            No options available
                        </div>
                    ) : (
                        availableOptions.map((option) => (
                            <div
                                key={option.value}
                                className={`pl-4 cursor-pointer hover:bg-blue-600 hover:text-white ${
                                    normalizedSelectedOptions.some(
                                        (o) => o.value === option.value
                                    )
                                        ? "bg-gray-200"
                                        : ""
                                }`}
                                onClick={() => toggleOption(option)}
                            >
                                <Checkbox
                                    checked={normalizedSelectedOptions.some(
                                        (o) => o.value === option.value
                                    )}
                                    onChange={() => {}}
                                    className="invisible absolute"
                                />
                                {option.label}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
});

export default DropdownMulti;
