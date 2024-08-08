"use client";

import Link from "next/link";
import { countries } from "../constants";
import { useState, useEffect, useRef } from "react";
import Button from "./ui/button";
import { useRouter } from "next/navigation";

const SelectWithFilter = ({ options, placeholder = "Select an option" }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);

  // Filter options based on input value
  const filteredOptions = countries.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsDropdownOpen(true); // Open the dropdown when typing
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setInputValue(option); // Update input with the selected option
    setIsDropdownOpen(false); // Close the dropdown

    const filurl = new URL("/scholarships", window.location.origin);
    filurl.searchParams.append("country", option);

    router.push(filurl.toString());
  };

  // Handle click outside to close dropdown
  const handleClickOutside = (e) => {
    if (e.target.closest(".dropdown") === null) {
      setIsDropdownOpen(false);
    }
  };

  const handleSearchButton = () => {
    //const filurl = new URL("/scholarships", window.location.origin);
    if (!filteredOptions.length) {
      setInputValue("")
      inputRef.current.focus();
      return;
    } else if (!inputValue) {
      filurl.searchParams.append("country", "all");
      router.push(filurl.toString());
    } else {
      const country = filteredOptions[0];
      filurl.searchParams.append("country", country);
      router.push(filurl.toString());
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex w-full justify-center gap-4">
      <div className="relative dropdown sm:w-[50%] md:w-[30%] w-[60%]">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          placeholder="Where do you want to study"
          className="w-full"
        />
        {isDropdownOpen && (
          <ul className="absolute border mt-1 bg-white rounded shadow-lg max-h-60 overflow-auto w-full text-start px-4">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No options found</li>
            )}
          </ul>
        )}
      </div>
      <Button onClick={handleSearchButton}>Search</Button>
    </div>
  );
};

export default SelectWithFilter;
