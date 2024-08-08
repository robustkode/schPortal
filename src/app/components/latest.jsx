import SchCard from "./schCard";
import Link from "next/link";

import { db } from "../config/firebase"; // adjust the path as needed
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

async function getLatest() {
  "use server";

  // return new Promise((resolve, _) => {
  //   resolve(
  //     [
  //       {
  //         id: 'kcUrfXFcxa0WwhSl9rFK',
  //         university: 'Addis Ababa University',
  //         deadline: '8/6/2024',
  //         eligibility: [ 'blah blah', 'oops oops' ],
  //         name: 'Youth Scholarship',
  //         tution: [ 10000, 'euro' ],
  //         open: '8/5/2024',
  //         country: 'Ethiopia',
  //         benefits: [ 'die die', 'live live' ],
  //         degree: [ 'bachelor', 'Master' ],
  //         description: 'This is blah blah universiyt'
  //       }
  //     ])
  // });

  try {
    const scholarshipsRef = collection(db, "scholarships");
    // const querySnapshot = await getDocs(collection(db, 'scholarships'));

    const q = query(scholarshipsRef, orderBy("open", "desc"), limit(5));

    const querySnapshot = await getDocs(q);

    // Transform the data into an array of objects
    const scholarships = querySnapshot.docs.map(doc => {
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

export default async function Latest() {
  let data = [];
  let error = null;

  try {
    data = await getLatest();

  } catch (err) {
    error = err;
  }

  return (
    <section className="latest">
      <div className="main-container text-center text-gray-800 ">
        <h3 className="mb-8 header text-primary">Latest Scholarships</h3>
        <div className="grid md-latest:grid-cols-3 sm-latest:grid-cols-2 lg:grid-cols-4 gap-4">
          {error ? (
            <div className="error-message text-red-500">
              <p className="text-error ">
                Failed to load scholarshis. Please try again later.
              </p>
            </div>
          ) : data.length > 0 ? (
            data.map((s, i) => <SchCard {...s} key={data.id} />)
          ) : (
            <p className="md-latest:col-span-3 sm-latest:col-span-2 lg:col-span-4">
              No scholarships available at the moment.
            </p>
          )}
          <div className=" w-[100%] flex items-center justify-center h-[100px] sm:h-auto">
            <Link className="text-secondary underline" href={"/scholarships"}>
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
