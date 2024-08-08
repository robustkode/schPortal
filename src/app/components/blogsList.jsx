import { db } from "../config/firebase"; // adjust the path as needed
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

import BlogCard from "./blogCard";

async function getBlogs() {
  "use server";
  try {
    const blogsRef = collection(db, "blogs");
    // const querySnapshot = await getDocs(collection(db, 'scholarships'));

    const q = query(blogsRef, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(q);

    // Transform the data into an array of objects
    const scholarships = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate().toLocaleDateString(),
      };
    });

    return scholarships;
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    throw new Error("Failed to fetch data");
  }
}

export default async function BlogsList() {
  let data = []
  let error = null;

  try {
  data = await getBlogs();
    
  } catch (err) {
    error = err;
  }

  return (
    <section className="blogs">
      <div className="main-container">
        <h3 className="header text-primary text-center mb-8">Blogs</h3>
        <div className=" flex flex-col gap-4">
          {error ? (
            <div className="error-message text-red-500">
              <p className="text-error ">
                Failed to load Blogs. Please try again later.
              </p>
            </div>
          ) : data.length > 0 ? (
            data.map((s, i) => <BlogCard {...s} key={data.id} />)
          ) : (
            <p className="md-latest:col-span-3 sm-latest:col-span-2 lg:col-span-4">
              No Blogs available at the moment.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
