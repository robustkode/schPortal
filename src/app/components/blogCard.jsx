import Link from "next/link";


export default function BlogCard({
  id, 
  title,
  content1
}) {
  return (
    <div className="flex flex-col gap-1 py-4 px-8 bg-gray-100 rounded-lg shadow-lg border-secondary/10 border">
      <Link href="/blogs"> <h4 className=" header">{title}</h4>
      </Link>
        <p className="text-gray-700 line-clamp-2 md:line-clamp-6">{content1}</p>
      <Link href={`/blogs/${id}`} className="text-red-500 mt-2">
        Read more...
      </Link>
    </div>
  );
}
