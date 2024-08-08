import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import Filter from "../components/filter";
import SchList from "../components/schList";
import { useRouter } from "next/navigation";
import { db } from "../config/firebase";
import SchCard from "../components/schCard";


async function getScholarships(degrees, country) {
  
  "use server";
  const levels = ["bachelor", "master", "PHD", "others"]
  console.log(degrees)
  try {
    const scholarshipsRef = collection(db, "scholarships");

    // Start with a base query
    let q = query(scholarshipsRef, orderBy("open", "desc"));

    // Add filtering for 'levels' if it's provided
    if (degrees) {
      if (Array.isArray(degrees)) {
        // 'levels' is an array
        q = query(q, where("degree", "array-contains-any", degrees));
      } else if (typeof degrees === "string") {
        if (degrees == "all") {
          q = query(q, where("degree", "array-contains-any", levels));
        } else {
          q = query(q, where("degree", "array-contains", degrees));

        }
        // 'levels' is a string
      }
    }

    // Add filtering for 'country' if it's provided
    if (country) {
      q = query(q, where("country", "==", country));
    }

    const querySnapshot = await getDocs(q);

    // Transform the data into an array of objects
    const scholarships = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        open: data.open.toDate().toLocaleDateString(),
        deadline: data.deadline.toDate().toLocaleDateString(),
      };
    });

    return scholarships;
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    throw new Error("Failed to fetch data");
  }
}

const degrees = ["all", "bachelor", "master", "PHD", "others"];

export default async function Home({ searchParams }) {
  const degrees = searchParams.degree;
  const country = searchParams.country;

  let data = [];
  let error = null;

  try {
    data = await getScholarships(degrees, country);
  } catch (err) {
    error = err;
  }

  return (
    <section className="mt-8">
      <div className="main-container grid md:grid-cols-5 md:gap-16 gap-4 grid-cols-1 gap-8 justify-items-center md:justify-items-stretch">
        <Filter />
        <div className="content md:col-span-4 w-full"> 
          <h2 className="mb-8 text-center">{data?.length}{"  "}  Scholarships {country ? `to Study in${country}` : ""}</h2>
          <div className="flex flex-col w-full">
            {error ? (
              <div className="error-message text-red-500">
                <p className="text-error ">
                  Failed to load scholarshis. Please try again later.
                </p>
              </div>
            ) : data.length > 0 ? (
              data.map((s, i) => <SchList {...s} key={data.id} />)
            ) : (
              <p className="md-latest:col-span-3 sm-latest:col-span-2 lg:col-span-4">
                No scholarships available at the moment.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
