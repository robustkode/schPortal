"use client";

import Link from "next/link";
import { countries } from "../constants";
import { useState, useEffect, useRef } from "react";
import Button from "./ui/button";
import { useRouter } from "next/navigation";

const SelectWith = ({  }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);


  const filteredOptions = countries.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  ).filter((c) => !selectedOptions.includes(c))

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsDropdownOpen(true);
  };

  // Handle option selection
  const handleOptionSelect = (option) => {

    setIsDropdownOpen(false)
    setSelectedOptions([...selectedOptions, option])
  };

  const handleCancelOption = (option) => {
    setSelectedOptions((prev) => {
        return selectedOptions.filter((c) => c !== option)
    })
  }

  // Handle click outside to close dropdown
  const handleClickOutside = (e) => {
    if (e.target.closest(".dropdown") === null) {
      setIsDropdownOpen(false);
    }
  };



  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
      <div className="relative dropdown">
        <input
          ref={inputRef}
          type="text"
          value=""
          onChange={handleInputChange}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          placeholder="Where do you want to study"
          className="w-full h-100px"

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
        <div className="flex flex-wrap absolute top-[6px] left-[15px] gap-1 ">
        { selectedOptions.length ? (
            selectedOptions.map((opt, i) => (
                <div className="flex bg-gray-300 rounded-sm px-1 shadow-md text-center" key={i}>
                    <p className="text-sm mb-0 pb-0">{opt}</p>
                    <span>X</span>
                </div>
            ))
        ): ""}
        </div>
        
      </div>
  );
};

export default SelectWith;

