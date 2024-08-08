import Image from "next/image";
import Button from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const populars = [
  { name: "Germany", pic: "/germany.png" },
  { name: 'United&nbsp;States', pic: "/usa.png" },
  { name: "United&nbsp;Kingdom", pic: "/uk.png" },
  { name: "Italy", pic: "/italy.png" },
  { name: "Netherlands", pic: "/neth.png" },
];

export default function Popular() {


  return (
    <section className="popular py-8 ">
      <div className="overlay"></div>
      <div className="main-container text-center relative z-2">
        <h3 className="pb-4 header text-gray-100">Popular Countries</h3>
        {/* <div className="mt-8 grid grid-cols-2 xs-popular:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] xs-popular:gap-20 gap-4 xs-popular:w-[100%] w-[60%] mx-auto"> */}
        <div className="grid xs-popular:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] xs-popular:gap-16 gap-4 grid-cols-2 mt-8">
          
          {populars.map((p, i) => (
            <div key={i} className="flex flex-col items-center aspect-[3/2] cursor-pointer">
              <div className="relative h-[64px] xs-popular:h-full aspect-[1/1] xs-popular:aspect-[3/2]">
                <Image
                  src={p.pic}
                  alt={`${p.name} flag`}
                  // layout="fill"
                  // objectFit="fill"
                  className="xs-popular:rounded-sm rounded-full"
                  fill
                  style={{objectFit: "fill"}}
                />
              </div>
              <Link href={`/scholarships?country=${p.name}`}>
              <h4 className="text-white mt-2 xs-popular:mt-4 text-small xs-popular:text-base text-sm hover:text-secondary">
                {p.name}
              </h4>
              </Link>
              
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mt-16">
          <Button><Link href={"/scholarships"}>Explore more</Link></Button>
        </div>
      </div>
    </section>
  );
}
