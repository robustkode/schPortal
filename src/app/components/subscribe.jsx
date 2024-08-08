"use client";
import Button from "./ui/button";
import { MdClose } from "react-icons/md";
import { useFocus } from "../stores/focus";
import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SelectWith from "./selectWith";

const Levels = ["Bachelor", "Master", "PHD", "Others"];

const schema = z.object({
  checkboxes: z
    .array(z.boolean())
    .refine((value) => value.some((checked) => checked), {
      message: "At least one checkbox must be selected",
    }),
  email: z.string().email(), // Email validation

});

export default function Subscribe() {
  const [levels, setLevels] = useState([1]);
  const { inputRef } = useFocus();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      checkboxes: [true, false, false, false], // Initialize with as many checkboxes as needed
      email: "", // Default value for the email input
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
  };

  const handleClick = (level) => {
    setLevels((prev) => {
      if (prev.includes(level)) {
        return prev.filter((l) => l !== level);
      } else {
        return [...prev, level];
      }
    });
  };

  const isChecked = (i) => {
    return levels.includes(i);
  };

  return (
    <div className="subscribe">
      <div className="text-gray-100">
        <h3 className="text-center mb-8 text-gray-100 header">
          Sign up for email updates
        </h3>

        <form
          className="flex flex-col gap-4 sm:w-[330px] sm:mx-auto w-[100%]"
          onSubmit={handleSubmit(onSubmit)}
        >


          <input
            type="text"
            placeholder="email"
            {...register("email")}
          />
          {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}

          <SelectWith />
          <Controller
            name="checkboxes"
            control={control}
            render={({ field }) => (
              <div className="flex flex-wrap gap-1">
              
                {field.value.map((checked, index) => (
                  <li key={index} className="">
                    <input
                      type="checkbox"
                      id={`level-${index}`}
                      onChange={(e) => {
                        const newValues = [...field.value];
                        newValues[index] = e.target.checked;
                        field.onChange(newValues);
                      }}
                      className="sr-only" // Hide the checkbox visually
                    />
                    <label
                      htmlFor={`level-${index}`}
                      className={`cursor-pointer ${
                        checked
                          ? "bg-gray-200 text-gray-800"
                          : "bg-gray-700 text-gray-400"
                      } px-1  rounded-sm flex items-center`}
                    >
                      <p className="text-small">{Levels[index]}</p>
                      <span className="">
                        {checked ? (
                          <MdClose className="fill-secondary/80" size={20} />
                        ) : (
                          <IoMdCheckmark
                            className="fill-green-500/30"
                            size={20}
                          />
                        )}
                      </span>
                    </label>
                  </li>
                ))}
              </div>
            )}
          />

          {errors.level && (
            <div className="text-red-500">{errors.level.message}</div>
          )}
          {/* <button type="submit">Subscribe</button> */}
          <Button type="submit" className="mt-2">
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
}

// "use client";
// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';

// // Define the validation schema with an email field
// const schema = z.object({
//   checkboxes: z.array(z.boolean()).refine(value => value.some(checked => checked), {
//     message: 'At least one checkbox must be selected',
//   }),
//   email: z.string().email({ message: 'Invalid email address' }), // Email validation
// });

// const Subscribe = () => {
//   const { control, handleSubmit, formState: { errors } } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       checkboxes: [false, false, false], // Initialize with as many checkboxes as needed
//       email: '', // Default value for the email input
//     }
//   });

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Controller
//         name="checkboxes"
//         control={control}
//         render={({ field }) => (
//           <>
//             {field.value.map((checked, index) => (
//               <label key={index}>
//                 <input
//                   type="checkbox"
//                   checked={checked}
//                   onChange={(e) => {
//                     const newValues = [...field.value];
//                     newValues[index] = e.target.checked;
//                     field.onChange(newValues);
//                   }}
//                 />
//                 Checkbox {index + 1}
//               </label>
//             ))}
//           </>
//         )}
//       />

//       {errors.checkboxes && <p className='text-white'>{errors.checkboxes.message}</p>}

//       <Controller
//         name="email"
//         control={control}
//         render={({ field }) => (
//           <div>
//             <label>
//               Email:
//               <input
//                 type="email"
//                 {...field}
//               />
//             </label>
//             {errors.email && <p className='text-white'>{errors.email.message}</p>}
//           </div>
//         )}
//       />

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default Subscribe;
