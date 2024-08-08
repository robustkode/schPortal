import { IoIosArrowForward } from "react-icons/io";
import Button from "../../components/ui/button";
import SchList from "../../components/schList";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import Link from "next/link";

export async function getScholarship(id) {
  "use server";
  try {
    const docRef = doc(db, "scholarships", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data =  docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        open: data.open.toDate().toLocaleDateString(),
        deadline: data.deadline.toDate().toLocaleDateString(),
      }
    } else {
      return null; // Document does not exist
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    throw new Error("Failed to fetch scholarship");
  }
}

export default async function Scholarship({ params}) {
  let data = 
    {
        id: 'kcUrfXFcxa0WwhSl9rFK',
        tution: [ 10000, 'euro' ],
        open: '8/5/2024',
        degree: [ 'bachelor', 'master' ],
        name: 'Youth Scholarship',
        eligibility: [ 'blah blah', 'oops oops' ],
        country: 'ethiopia',
        benefits: [ 'die die', 'live live' ],
        description: 'This is blah blah universiyt',
        university: 'Addis Ababa University',
        deadline: '8/6/2024'
      }
  
  let error = null;


  try {
    //data = await getScholarship(params.id);
    console.log(data)
  } catch (err) {
    error = err;
  }
  return (
    <section className="scholarship mt-8">
      <div className="main-container grid md:grid-cols-4 gap-8">
        <div className="md:col-span-3 bg-gray-100 shadow-lg py-4 px-8 rounded-md">
          <div className="flex gap-2 underline text-gray-500 items-center">
            <Link href="/">Home</Link>
            <IoIosArrowForward />
            <Link href="/scholarships">Scholarships</Link>
            <IoIosArrowForward />
            <Link href={`/scholarships/${params.id}`}>{data?.name}</Link>
          </div>
          <div className="flex flex-col gap-4">
            {error ? (
            <div className="error-message text-red-500">
              <p className="text-error ">
                Failed to load scholarshis. Please try again later.
              </p>
            </div>
          ) : data ? (
           <><div>
           <h1 className="text-primary">{data.name}</h1>
           <div className="text-small text-secondary mb-4">
             <p>{data.degree.join(", ")}</p>
             <p>{data.tution.join(", ")}</p>
           </div>
         </div>

         <p className="text-gray-800">
          {data.description}
         </p>
         
         <div className="mt-8 flex flex-col gap-2">
           <h3 className="text-primary">Eligibility</h3>
           <p>
             To be eligible for a VSBfonds grant, you must meet a number of
             requirements:
           </p>
           <ul>
             {data.eligibility.map((e, i) => (
                 <li key={i}><p>e</p></li>
             ))}
           </ul>
         </div>

         <div className="mt-4">
           <h3 className="mb-2 text-primary">Benefits</h3>
           <ul>
             {data.benefits.map((e, i) => (
                 <li key={i}><p>e</p></li>
             ))}
           </ul>
         </div>

         <div className="flex flex-col gap-2 text-primary">
           <h3>Application</h3>
           <p>
             More information about the {data.name}, the conditions
             and the application procedure can be found on the official
             website. You can also fill in the application form there.
           </p>
           <div className="mt-2 w-fit">
             <Link href={"/link"}>Apply</Link>
           </div>
         </div>

         <div className="mt-4">
           <p>Find related Scholarships</p>
        
           <ul className="flex gap-4 text-secondary underline">
             {data.degree.map((e, i) => (
                   <Link key={i} href={`/scholarships?degree=${e}`}>{e}</Link>
             ))}
           </ul>
           

         </div></>
          ) : (
            <p className="md-latest:col-span-3 sm-latest:col-span-2 lg:col-span-4">
              No scholarships by this ID.
            </p>
          )}
            
          </div>
        </div>
        <div className="bg-gray-200 w-full md:h-[100vh]"></div>
      </div>
    </section>
  );
}
