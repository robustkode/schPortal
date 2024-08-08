import { collection, getDocs, orderBy, query } from "firebase/firestore";
import BlogCard from "../components/blogCard";
import BlogsList from "../components/blogsList";
import { db } from "../config/firebase";

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

export default async function Blogs() {
  let data = [{
    id: 'kcAcEd3E4IWI69j8bm7F',
    title: 'Famous Abroad Study Scholarships: Dream Catcher!',
    createdAt: '8/7/2024',
    content2: 'Summer-time is here and so is the time to skill-up! More than 5,000 learners have now completed their journey from basics of DSA to advanced level development programs such as Full-Stack, Backend Development, Data Science. ',
    image1: 'oops',
    content1: 'Designing a database for a blog website involves identifying key entities, defining their attributes, establishing relationships, and implementing the structure in SQL format. By efficiently managing blog posts, user profiles, interactions, and analytics, such a database can support personalized content delivery, community engagement, and revenue generation, ensuring a vibrant and dynamic blogging platform for creators and readers alike.'
  }];
  let error = null;

  try {
    //data = await getBlogs();
    //console.log(data);
  } catch (err) {
    error = err;
  }

  return (
    <section className="blogs mt-0">
      <div className="main-container grid md:grid-cols-4 mt-8 md:gap-16">
        <div className="md:col-span-3">
          <h1 className="text-primary mb-4 text-center sm:text-start">Blogs</h1>
          <div className="flex flex-col gap-8">
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
        <div className="bg-gray-200 w-full h-full"></div>
      </div>
    </section>
  );
}
