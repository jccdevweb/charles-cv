import leftContent from "../../data/left-content.json";
import rightContent from "../../data/right-content.json";
import { LeftContent } from "../../types/left-content";
import { RightContent } from "../../types/right-content";

const leftContentData: LeftContent = leftContent;
const rightContentData: RightContent = rightContent;

export default function Home() {
  return (
    <div className="my-2 border-10 border-[#7FAEA7] min-h-screen w-full max-w-4xl mx-auto">
      <div className="flex items-center mt-10">
        <div className="md:text-4xl flex flex-col gap-4 text-center px-4">
          <p>JOSEPH CHARLES C. VARGAS</p>
          <hr className="border-2 border-[#7FAEA7] w-full my-2" />
        </div>

        <div className="flex justify-center mx-auto">
          <img
            src="/images/Jcharles.jpg"
            alt="Joseph Charles C. Vargas"
            className="rounded-full h-32 w-32 object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse flex-col sm:flex-row">
        {/* Left Content Section */}
        <div className="w-full sm:w-80 p-4 overflow-y-visible h-auto sm:h-full border-b-4 sm:border-b-0 sm:border-r-4 border-[#7FAEA7] flex-shrink-0">
          {leftContentData.sections.map((section, index) => (
            <div key={index}>
              <p className="text-md font-semibold">{section.title}</p>
              {section.items && (
                <div className="flex flex-wrap gap-2">
                  {section.items.map((item, itemIndex) => (
                    <p key={itemIndex} className="text-xs inline-block mr-2">
                      {item}
                    </p>
                  ))}
                </div>
              )}
              {section.subsections &&
                section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex} className="mt-2">
                    <p className="text-sm font-semibold leading-[1.8]">
                      {subsection.title}:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {subsection.items.map((item, itemIndex) => (
                        <p
                          key={itemIndex}
                          className="text-xs inline-block mr-2"
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              {index !== leftContentData.sections.length - 1 && (
                <hr className="border-2 border-[#7FAEA7] w-full my-2" />
              )}
            </div>
          ))}
        </div>

        {/* Right Content Section */}
        <div className="sm:p-2 p-4 w-full flex-1 overflow-y-auto">
          <div className="flex flex-col gap-2">
            <p className="text-md font-semibold leading-[1.8]">
              {rightContentData.professionalSummary.title}
            </p>
            <p className="text-xs inline-block mr-2 leading-[1.9]">
              {rightContentData.professionalSummary.content}
            </p>

            <hr className="border-6 border-[#7FAEA7] w-full my-2" />

            <p className="text-md font-semibold leading-[1.8]">Experience</p>

            {rightContentData.experience.map((job, jobIndex) => (
              <div key={jobIndex} className="mt-2">
                <p className="text-md font-semibold leading-[1.8]">
                  {job.title}
                </p>
                <p className="text-xs text-gray-600">
                  {job.company} | {job.location} | {job.date}
                </p>
                <ul className="list-disc pl-5 text-xs leading-[1.9] mt-1">
                  {job.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
