import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function SchCard({
  university,
  name,
  degree,
  tution,
  deadline,
}) {

  return (
    <div
      className="flex flex-col p-4 rounded-md shadow-md bg-gray-100 rounded-md shadow-md border border-secondary/10"
    >
      <div className="flex items-center gap-2">
        <div className="w-[48px] h-[48px] relative">
          <Image
            src="/germany.png"
            alt="Addis flag"
            fill
            style={{objectFit: "fill"}}
            className="rounded-full"
          />
        </div>
        <Link href="/scholarships">
        <p className="hover:text-gray-700">{university}</p>
        </Link>
        
      </div>
      <div className="flex flex-col items-start mt-4 gap-">
      <Link href="/scholarships">
        <p className="hover:text-gray-700">{name}</p>
        </Link>
        <p className="text-sm text-gray-500">
          {degree
            .map((degree) => degree.charAt(0).toUpperCase() + degree.slice(1))
            .join(", ")}
        </p>
        <p className="text-sm text-gray-500">{tution.join("")}</p>
        <p className="text-secondary text-sm">DeadLine:{" "}{deadline}</p>
      </div>
    </div>
  );
}
