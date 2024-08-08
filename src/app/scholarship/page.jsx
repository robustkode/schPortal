import { IoIosArrowForward } from "react-icons/io";
import Button from "../components/ui/button";
import SchList from "../components/schList";

export default function Scholarship() {
  return (
    <section className="scholarship mt-8">
      <div className="main-container grid md:grid-cols-4 gap-8">
        <div className="md:col-span-3 bg-gray-100 shadow-lg py-4 px-8 rounded-md">
          <div className="flex gap-2 underline text-gray-500 items-center">
            <a href="/">Home</a>
            <IoIosArrowForward />
            <a href="/">Scholarships</a>
            <IoIosArrowForward />
            <a href="/">VSB</a>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-primary">VSBfonds Grant</h1>
              <div className="text-small text-secondary mb-4">
                <p>Bachelor, Masters</p>
                <p>10k</p>
              </div>
            </div>

            <p className="text-gray-800 mb-8">
              VSBfonds awards grants annually to graduating students who wish to
              study abroad after their study programme. It is not possible to
              use this grant for an internship or research project. You
              personally choose the educational institute abroad and arrange for
              your admission. The educational institute where you will study
              must be accredited by that country's government. If that is not
              the case, you must demonstrate that the quality of the institute
              and study programme you have chosen meet the Dutch standards for
              higher education.
            </p>
            <div className="">
                <p className="text-secondary text-sm underline"> see also</p>
              <SchList />
            </div>
            <div className="mt-8 flex flex-col gap-2">
              <h3 className="text-primary">Eligibility</h3>
              <p>
                To be eligible for a VSBfonds grant, you must meet a number of
                requirements:
              </p>
              <ul>
                <li>
                  you are a full-time student graduating as Bachelor or Master;
                </li>
                <li>
                  you have Dutch nationality or a demonstrable connection with
                  the Netherlands;
                </li>
                <li>
                  you are extremely motivated and proficient enough in the
                  language of your country of destination;
                </li>
                <li>
                  you draw up a study plan that is in line with the study
                  programme your have completed.
                </li>
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="mb-2 text-primary">Benefits</h3>
              <p>The scholarship is worth 10,000 €.</p>
            </div>

            <div className="flex flex-col gap-2 text-primary">
              <h3>Application</h3>
              <p>
                More information about the VSBfonds study grants, the conditions
                and the application procedure can be found on the VSBfonds
                website. You can also fill in the application form there.
              </p>
              <div className="mt-2 w-fit">
                <Button>Apply</Button>
              </div>
            </div>

            <div className="mt-4">
              <p>Find related Scholarships</p>
              <div className="flex gap-4 text-secondary underline">
                <a href="/">Bachelor</a>
                <a href="/">Master</a>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 w-full md:h-[100vh]"></div>
      </div>
    </section>
  );
}
