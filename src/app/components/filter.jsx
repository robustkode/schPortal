// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { countries } from "../constants";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// const levels = ["All", "Bachelor", "Master", "PHD", "Others"];

// export default function Filter() {
//   const [checkedItems, setCheckedItems] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const searchParams = useSearchParams();
//   const degree = searchParams.getAll("degree");
//   const search = searchParams.get("country");
//   const router = useRouter();


//   const handleCheckboxChange = (index = null, country = selectedCountry) => {
//     if (index != null) {
//       setCheckedItems((prev) => {


//         if (index == 0) {
//           return [1, 2, 3, 4];
//         } else if (prev.includes(index)) {
//           return prev.filter((l) => l != index);
//         } else {
//           return [...prev, index];
//         }
//       });
//     } else {
//       setSelectedCountry(country);
//     }
//   };

//   useEffect(() => {
//     // Create a URL object based on the current URL
//     const currentUrl = new URL(window.location.href);

//     // Clone the current search parameters
//     const searchParams = new URLSearchParams(currentUrl.search);

//     // Clear existing 'degree' parameters
//     searchParams.delete("degree");
//     if (selectedCountry) {
//       searchParams.delete("country");

//       searchParams.append(
//         "country",
//         selectedCountry.toLowerCase().replace(/ /g, "_")
//       );
//     }
  


//     // Add new 'degree' parameters based on checkedItems
//     if (checkedItems.length === levels.length - 1) {
//       searchParams.append("degree", "all");
//     } else {
//       checkedItems.forEach((l) => {
//         if (l !== 0) {
//           searchParams.append("degree", levels[l].toLowerCase());
//         }
//       });
//     }

//     // Update the URL without reloading the page
//     router.push(`${currentUrl.pathname}?${searchParams.toString()}`);
//   }, [checkedItems, selectedCountry, router]);

//   const filteredOptions = countries.filter((option) =>
//     option.toLowerCase().includes(inputValue.toLowerCase())
//   );


//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };


//   return (
//     <div className="filter">
//       <div className="place flex flex-col gap-4">
//         <h4>Country</h4>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={handleInputChange}
//           placeholder="Where do you want to study"
//           className="w-full"
//         />
//         <ul className="countries h-[200px] overflow-y-scroll border border-gray-300 py-2 pl-4 custom-scrollbar">
//           {countries.map((c, i) => (
//             <li
//               key={i}
//               className="p-1 hover:bg-gray-200 cursor-pointer"
//               onClick={() => handleCheckboxChange(null, c)}
//             >
//               {c}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="flex flex-col mt-12 gap-2  p-2">
//         <h4 className="mb-4">Degree</h4>
//         <div className="flex md:flex-col gap-4 md:gap-2 flex-wrap">
//           {levels.map((l, i) => (
//             <label className="cursor-pointer custom-checkbox flex items-center" key={i}>
//               <input
//                 type="checkbox"
//                 checked={checkedItems.includes(i)}
//                 onChange={() => handleCheckboxChange(i)}
//               />
//               <span></span>
//               <span className="pl-2">{l}</span>
//             </label>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { countries } from "../constants";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MdClose } from "react-icons/md";

const levels = ["All", "Bachelor", "Master", "PHD", "Others"];

export default function Filter() {
  const searchParams = useSearchParams();
  const degree = searchParams.getAll("degree");
  const country = searchParams.get("country");
  const test = searchParams.get("test")
  const test2 = searchParams.get("test2")
  const [checkedItems, setCheckedItems] = useState(degree.map(i => levels.indexOf(i.charAt(0).toUpperCase() + i.slice(1))).filter(index => index !== -1));
  const [inputValue, setInputValue] = useState(country);
  //const initSelectedCountry = countries.some((c) => c == country.charAt(0).toUpperCase() + country.slice(1)) ? country.charAt(0).toUpperCase() + country.slice(1) : ""
  const [selectedCountry, setSelectedCountry] = useState("");
  // console.log(initSelectedCountry, selectedCountry, country,  "kkkk")
  console.log(test2, test, "mnm")
  

  const router = useRouter();

  const handleCheckboxChange = (index = null, country = selectedCountry) => {
    if (index != null) {
      setCheckedItems((prev) => {
        if (index === 0) {
          return [1, 2, 3, 4];
        } else if (prev.includes(index)) {
          return prev.filter((l) => l !== index);
        } else {
          return [...prev, index];
        }
      });
    } else {
      setSelectedCountry(country);
      setInputValue(country)
    }
  };

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);
    searchParams.delete("degree");
    if (selectedCountry !== null) {
      searchParams.delete("country");
      searchParams.append(
        "country",
        selectedCountry.toLowerCase().replace(/ /g, "_")
      );
    }
    if (checkedItems.length === levels.length - 1) {
      searchParams.append("degree", "all");
    } else {
      checkedItems.forEach((l) => {
        if (l !== 0) {
          searchParams.append("degree", levels[l].toLowerCase());
        }
      });
    }
    router.push(`${currentUrl.pathname}?${searchParams.toString()}`);
  }, [checkedItems, selectedCountry, router]);

  const filteredOptions = countries.filter((option) =>
    option.toLowerCase().includes(inputValue?.toLowerCase())
  );

  const sortedCountries = [
    ...filteredOptions,
    ...countries.filter((option) =>
      !option.toLowerCase().includes(inputValue?.toLowerCase()))
  ]

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleRemoveCountry = () => {
  setInputValue("")
  setSelectedCountry("")
  }

  return (
    <div className="filter">
      <div className="place flex flex-col gap-4">
        <h4>Country</h4>
        <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Where do you want to study"
          className="w-full"
        />
        {inputValue &&  <MdClose size={25} onClick={handleRemoveCountry} className=" fill-secondary absolute top-[5px] right-[10px]"/>}
       
        </div>
        
        <ul className="countries h-[200px] overflow-y-scroll border border-gray-300 py-2 pl-4 custom-scrollbar">
          {sortedCountries.map((c, i) => (
            <li
              key={i}
              className={`${selectedCountry == c ? "text-secondary" : ""} p-1 hover:bg-gray-200 cursor-pointer`}
              onClick={() => handleCheckboxChange(null, c)}
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col mt-12 gap-2 p-2">
        <h4 className="mb-4">Degree</h4>
        <div className="flex md:flex-col gap-4 md:gap-2 flex-wrap">
          {levels.map((l, i) => (
            <label className="cursor-pointer custom-checkbox flex items-center" key={i}>
              <input
                type="checkbox"
                checked={checkedItems.includes(i) | checkedItems.length == 4}
                onChange={() => handleCheckboxChange(i)}
              />
              <span></span>
              <span className="pl-2">{l}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
