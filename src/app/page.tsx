"use client"; // <-- must be client component for interactivity

import leftContent from "../../data/left-content.json";
import rightContent from "../../data/right-content.json";
import { LeftContent } from "../../types/left-content";
import { RightContent } from "../../types/right-content";

const leftContentData: LeftContent = leftContent;
const rightContentData: RightContent = rightContent;

const contactSection = leftContentData.sections.find(
  (section) => section.title.toLowerCase() === "contact"
);

const sidebarSections = leftContentData.sections.filter(
  (section) => section.title.toLowerCase() !== "contact"
);

export default function Home() {
  const downloadCV = async () => {
    try {
      const response = await fetch("/api/generate-pdf");
      if (!response.ok) throw new Error("Failed to fetch");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "charles-cv.pdf";
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Failed to download CV. Please try again later.");
    }
  };

  return (
    <>
      {/* Main container */}
      <div className=" border-10 border-[#7FAEA7] min-h-screen w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mt-2">
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

        <div className="flex flex-col-reverse sm:flex-row">
          {/* Sidebar (Left) */}
          <div className="w-full sm:w-80 p-4 overflow-y-visible h-auto sm:h-full border-b-4 sm:border-b-0 sm:border-r-4 border-[#7FAEA7] flex-shrink-0">
            {/* Contact in sidebar (desktop only) */}
            {contactSection && (
              <div className="hidden sm:block mb-4">
                <p className="text-md font-semibold">{contactSection.title}</p>
                <div className="flex flex-wrap gap-2">
                  {contactSection.items &&
                    contactSection.items.map((item, index) => (
                      <p key={index} className="text-xs inline-block mr-2">
                        {item}
                      </p>
                    ))}
                </div>
                <hr className="border-2 border-[#7FAEA7] w-full my-2" />
              </div>
            )}

            {/* Other sidebar sections */}
            {sidebarSections.map((section, index) => (
              <div key={index}>
                <p className="text-md font-semibold">{section.title}</p>
                {section.items && (
                  <div className="flex flex-wrap gap-2">
                    {section.items.map((item, itemIndex) => {
                      const isURL =
                        item.startsWith("http://") ||
                        item.startsWith("https://");
                      return isURL ? (
                        <a
                          key={itemIndex}
                          href={item}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs inline-block mr-2 text-blue-600 underline"
                        >
                          {item.replace(/^https?:\/\//, "")}
                        </a>
                      ) : (
                        <p
                          key={itemIndex}
                          className="text-xs inline-block mr-2"
                        >
                          {item}
                        </p>
                      );
                    })}
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
                {index !== sidebarSections.length - 1 && (
                  <hr className="border-2 border-[#7FAEA7] w-full my-2" />
                )}
              </div>
            ))}
          </div>

          {/* Right Content */}
          <div className="sm:p-2 p-4 w-full flex-1 overflow-y-auto">
            <div className="flex flex-col gap-2">
              {/* Contact on mobile only */}
              {contactSection && (
                <div className="block sm:hidden mb-4">
                  <p className="text-md font-semibold">
                    {contactSection.title}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {contactSection.items &&
                      contactSection.items.map((item, index) => (
                        <p key={index} className="text-xs inline-block mr-2">
                          {item}
                        </p>
                      ))}
                  </div>
                  <hr className="border-2 border-[#7FAEA7] w-full my-2" />
                </div>
              )}

              {/* Professional Summary */}
              <p className="text-md font-semibold leading-[1.8]">
                {rightContentData.professionalSummary.title}
              </p>
              <p className="text-xs inline-block mr-2 leading-[1.9]">
                {rightContentData.professionalSummary.content}
              </p>

              <hr className="border-6 border-[#7FAEA7] w-full my-2" />

              {/* Experience */}
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
                      <li
                        key={itemIndex}
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Download Button outside main container, centered top */}
      <div className="w-full flex justify-center my-4 cursor-pointer">
        <button
          onClick={downloadCV}
          className="bg-[#7FAEA7] text-white px-6 py-2 rounded hover:bg-[#6b958d] transition cursor-pointer"
        >
          Download CV
        </button>
      </div>
    </>
  );
}
