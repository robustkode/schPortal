import Link from "next/link";

export default function SchList({
  name, university, description, degree, tution, id
}) {
  return (
    <div className="flex flex-col gap-2 bg-gray-200 px-8 py-4 rounded-md shadow-md ">
    <div>
      <Link href={`/scholarships/${id}`}><h4 className="text-primary">{name}</h4></Link>
      <p className="text-small text-gray-600">{university}</p>
    </div>
    <p>
     {description}
    </p>
    <div>
      <p className="text-small text-gray-600">{degree?.join(", ")}</p>
      <p className="text-small text-gray-600">{tution?.join(" ")}</p>
    </div>
  </div>
  );
}
