import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import BlogsList from "@/app/components/blogsList";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import Link from "next/link";

export async function getBlog(id) {
  "use server";
  try {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt.toDate().toLocaleDateString(),
      };
    } else {
      return null; // Document does not exist
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    throw new Error("Failed to fetch scholarship");
  }
}

export default async function Blog({ params }) {
  let data = {
    id: "kcAcEd3E4IWI69j8bm7F",
    content1:
      "Designing a database for a blog website involves identifying key entities, defining their attributes, establishing relationships, and implementing the structure in SQL format. By efficiently managing blog posts, user profiles, interactions, and analytics, such a database can support personalized content delivery, community engagement, and revenue generation, ensuring a vibrant and dynamic blogging platform for creators and readers alike.",
    title: "Famous Abroad Study Scholarships: Dream Catcher!",
    content2:
      "Summer-time is here and so is the time to skill-up! More than 5,000 learners have now completed their journey from basics of DSA to advanced level development programs such as Full-Stack, Backend Development, Data Science. ",
    image1: "oops",
    createdAt: "8/7/2024",
  };
  let error = null;

  try {
    //data = await getBlog(params.id);
    //console.log(data)
  } catch (err) {
    error = err;
  }

  return (
    <section className="blog mt-8">
      <div className="main-container grid md:grid-cols-4 md:gap-16 gap-8 grid-cols-1">
        <div className=" md:col-span-3 col-span-1">
          <div className="flex flex-col gap-4 bg-gray-100 py-4 px-8 rounded-md shadow-lg">
            <div className="flex gap-2 underline text-gray-500 items-center">
              <Link href="/">Home</Link>
              <IoIosArrowForward />
              <Link href="/blogs">Blogs</Link>
              {/* <IoIosArrowForward />
            <Link href={`/scholarships/${params.id}`}>{data?.name}</Link> */}
            </div>
            {error ? (
              <div className="error-message text-red-500">
                <p className="text-error ">
                  Failed to load scholarshis. Please try again later.
                </p>
              </div>
            ) : data ? (
              <>
                <h1>{data.title}</h1>
                <p>{data.content1}</p>
                <div className="relative">
                  <Image
                    src="/pic1.png"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }} // optional
                  />
                </div>
                <p>{data.content2}</p>
                <div className="relative">
                  <Image
                    src="/pic2.png"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }} // optional
                  />
                </div>

                <div className=" flex items center  border-t-2 border-gray-300 gap-4 py-2">
                  <p className="text-primary">share this article</p>
                  <FaFacebook className="fill-primary" size={25} />
                  <FaTwitter className="fill-primary" size={25} />
                  <IoMdMail className="fill-primary" size={25} />
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          
          <div></div>
        </div>

        <div className="w-full bg-gray-100 rounded-md shadow-lg md:h-[100vh]">
          <p className="text-center">ad</p>
        </div>
      </div>
    </section>
  );
}
