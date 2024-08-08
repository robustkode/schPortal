// "use client";

// import Button from "./ui/button";
// import { useEffect, useRef, useState } from "react";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { MdClose } from "react-icons/md";
// import { IoIosArrowDown } from "react-icons/io";
// import Link from "next/link";

// export default function Navbar() {
//   const [toggled, setToggled] = useState(false);
//   const [navToggled, setNavToggled] = useState(false);
//   const menuRef = useRef(null);

//   const handleClickOutside = (event) => {
//     // if (menuRef.current && !menuRef.current.contains(event.target)) {
//     //   closeMenu();
//     // }
//     closeMenu();
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("scroll", closeMenu);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("scroll", closeMenu);
//     };
//   }, []);

//   const closeMenu = () => {
//     setNavToggled(false);
//   };

//   const toggleNavbar = (event) => {
//     setNavToggled(!navToggled);
//     event.stopPropagation();
//   };
//   return (
//     <nav className="header text-gray-800 border border-gray-300">
//       <div className="flex justify-between main-container items-center py-2">
//         <div className="flex gap-16  sm:gap-8 items-center">
//           <div className="flex items-center">
//             {!navToggled && (
//               <RxHamburgerMenu
//                 size={24}
//                 className="mr-4 md:hidden cursor-pointer"
//                 onClick={(event) => toggleNavbar(event)}
//               />
//             )}
//             {/* if else doesnt work */}
//             {navToggled && <MdClose className="md:hidden mr-4" size={24} />}

//             <Link href="/">EthioAcademy</Link>
//           </div>

//           <div className="md:flex  gap-16 items-center hidden">
//             <div
//               className=" cursor-pointer flex items-center gap-1 relative z-10"
//               onMouseOver={() => setToggled(true)}
//               onMouseLeave={() => setToggled(false)}
//             >
//               <p className="hover:text-gray-800">Degree</p>
//               <IoIosArrowDown className="" size={24} />
//               <div
//                 id="dropdownMenu"
//                 className={`${
//                   toggled ? "" : "hidden"
//                 } dropdown-menu absolute top-[0px] left-[-20px] z-190000000`}
//               >
//                 <div className="h-[44px]"></div>
//                 <ul className="flex flex-col border py-1  bg-white rounded-b-sm">
//                   <li className="text-sm hover:text-gray-500 text-gray-600 px-[20px] py-0">
//                     <Link href="/scholarships">Bachelor</Link>
//                   </li>
//                   <li className="text-sm px-[20px] hover:text-gray-500 text-gray-600">
//                     <Link href="/scholarships">Master</Link>
//                   </li>
//                   <li className="text-sm px-[20px] hover:text-gray-500 text-gray-600">
//                     <Link href="/scholarships">PHD</Link>
//                   </li>
//                   <li className="text-sm px-[20px] hover:text-gray-500 text-gray-600">
//                     <Link href="/scholarships">Others</Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <Link href="/" className="hover:text-gray-700">
//               Contact
//             </Link>
//             <Link href="/blogs" className="hover:text-gray-7.pkl0">
//               Blogs
//             </Link>
//           </div>

//           {navToggled ? (
//             <div
//               className="flex flex-col gap-2 md:hidden absolute left-0 top-[66px] w-[200px]  h-[100vh] p-4 bg-white pl-[64px] z-10"
//               onClick={(event) => event.stopPropagation()}
//             >
//               <div>
//                 <p className="border- border-gray-400">Degrees</p>
//                 <div className="flex flex-col pl-4 pt-1">
//                   <Link
//                     href="/scholarships"
//                     className="text-gray-600 border-gray-400 text-sm"
//                   >
//                     Bachelor
//                   </Link>
//                   <Link
//                     href="/scholarships"
//                     className="text-gray-600 border-gray-400 text-sm"
//                   >
//                     Master
//                   </Link>
//                   <Link
//                     href="/scholarships"
//                     className="text-gray-600 border-gray-400 text-sm"
//                   >
//                     PHD
//                   </Link>
//                   <Link
//                     href="/scholarships"
//                     className="text-sm border- border-gray-400
//                     text-gray-600"
//                   >
//                     Others
//                   </Link>
//                 </div>
//               </div>
//               <Link
//                 href="/"
//                 className="border- border-gray-400 block fit-content"
//               >
//                 Contact
//               </Link>
//               <Link href="/blogs" className="border- border-gray-400 block">
//                 Blogs
//               </Link>
//               <div className="block sm:hidden">
//                 <Button outline className="sm:hidden">
//                   Subscribe
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             ""
//           )}
//         </div>
//         <div className="sm:block hidden">
//           <Button outline>Subscribe</Button>
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import Button from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for programmatic navigation
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";

import { useFocus } from "../stores/focus";

export default function Navbar() {
  const [toggled, setToggled] = useState(false);
  const [navToggled, setNavToggled] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter(); // Initialize useRouter
  const { inputRef } = useFocus();

  const handleSubscribeClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", closeMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", closeMenu);
    };
  }, []);

  const closeMenu = () => {
    setNavToggled(false);
  };

  const handleLinkClick = (url, level, event) => {
    event.preventDefault(); // Prevent the default anchor behavior
    closeMenu(); // Close the menu
    const filurl = new URL(url, window.location.origin);
    filurl.searchParams.append("degree", level);

    // Navigate using the constructed URL
    router.push(filurl.toString());

    // setTimeout(() => {
    //   router.push(url); // Navigate to the URL
    // }, 300); // Delay to ensure the menu closes before navigation
  };

  return (
    <nav className="header text-gray-800 border border-gray-300">
      <div className="flex justify-between main-container items-center py-2">
        <div className="flex gap-16 sm:gap-8 items-center">
          <div className="flex items-center">
            {!navToggled && (
              <RxHamburgerMenu
                size={24}
                className="mr-4 md:hidden cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation(); // Prevent event bubbling
                  setNavToggled(!navToggled);
                }}
              />
            )}
            {navToggled && (
              <MdClose
                className="md:hidden mr-4 cursor-pointer"
                size={24}
                onClick={(event) => {
                  event.stopPropagation(); // Prevent event bubbling
                  closeMenu();
                }}
              />
            )}
            {/* <Link href="/">EthioAcademy</Link> */}
            <Link href="/"><p>EthioAcademy</p></Link>
          </div>

          <div className="md:flex gap-16 items-center hidden">
            <div
              className="cursor-pointer flex items-center gap-1 relative z-10"
              onMouseOver={() => setToggled(true)}
              onMouseLeave={() => setToggled(false)}
            >
              <p className="hover:text-gray-800">Degree</p>
              <IoIosArrowDown className="" size={24} />
              <div
                id="dropdownMenu"
                className={`${
                  toggled ? "" : "hidden"
                } dropdown-menu absolute top-[0px] left-[-20px] z-190000000`}
              >
                <div className="h-[44px]"></div>
                <ul className="flex flex-col border py-1 bg-white rounded-b-sm">
                  <li className="text-sm hover:text-gray-500 text-gray-600 px-[20px] py-0">
                    <a
                      href="/scholarships"
                      onClick={(e) => handleLinkClick("/scholarships", 1, e)}
                    >
                      Bachelor
                    </a>
                  </li>
                  <li className="text-sm px-[20px] hover:text-gray-500 text-gray-600">
                    <a
                      href="/scholarships"
                      onClick={(e) => handleLinkClick("/scholarships", 2, e)}
                    >
                      Master
                    </a>
                  </li>
                  <li className="text-sm px-[20px] hover:text-gray-500 text-gray-600">
                    <a
                      href="/scholarships"
                      onClick={(e) => handleLinkClick("/scholarships", 3, e)}
                    >
                      PHD
                    </a>
                  </li>
                  <li className="text-sm px-[20px] hover:text-gray-500 text-gray-600">
                    <a
                      href="/scholarships"
                      onClick={(e) => handleLinkClick("/scholarships", 4, e)}
                    >
                      Others
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <Link href="/" className="hover:text-gray-700">
              Contact
            </Link>
            <Link href="/blogs" className="hover:text-gray-700">
              Blogs
            </Link>
          </div>

          {navToggled && (
            <div
              ref={menuRef}
              className="flex flex-col gap-2 md:hidden absolute left-0 top-[66px] w-[200px] h-[100vh] p-4 bg-white pl-[64px] z-10"
              onClick={(event) => event.stopPropagation()}
            >
              <div>
                <p className="border- border-gray-400">Degrees</p>
                <div className="flex flex-col pl-4 pt-1">
                  <a
                    href="/scholarships"
                    className="text-gray-600 border-gray-400 text-sm"
                    onClick={(e) => handleLinkClick("/scholarships", 1, e)}
                  >
                    Bachelor
                  </a>
                  <a
                    href="/scholarships"
                    className="text-gray-600 border-gray-400 text-sm"
                    onClick={(e) => handleLinkClick("/scholarships", 2, e)}
                  >
                    Master
                  </a>
                  <a
                    href="/scholarships"
                    className="text-gray-600 border-gray-400 text-sm"
                    onClick={(e) => handleLinkClick("/scholarships", 3, e)}
                  >
                    PHD
                  </a>
                  <a
                    href="/scholarships"
                    className="text-sm border- border-gray-400 text-gray-600"
                    onClick={(e) => handleLinkClick("/scholarships", 4, e)}
                  >
                    Others
                  </a>
                </div>
              </div>
              <a
                href="/"
                className="border- border-gray-400 block"
                onClick={(e) => handleLinkClick("/", 0, e)}
              >
                Contact
              </a>
              <a
                href="/blogs"
                className="border- border-gray-400 block"
                onClick={(e) => handleLinkClick("/blogs", "0", e)}
              >
                Blogs
              </a>
              <div className="block sm:hidden" onClick={handleSubscribeClick}>
                <Button outline className="sm:hidden">
                  Subscribe
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="sm:block hidden" onClick={handleSubscribeClick}>
          <Button outline>Subscribe</Button>
        </div>
      </div>
    </nav>
  );
}
