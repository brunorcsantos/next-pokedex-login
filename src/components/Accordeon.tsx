"use client";
import { useState } from "react";

interface Accordeon{
  title: string;
  answer: string;
}

export default function Accordeon(props: any) {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  return (
    <div className="p-2">
      <div className="p-4 bg-gray-200 rounded-lg">
        <div className="py-2">
          <button
            onClick={() => {
              setAccordionOpen(!accordionOpen);
            }}
            className="flex justify-between w-full"
          >
            <span>{props.title}</span>
            <svg
              className="fill-indigo-500 shrink-0 ml-8"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                y="7"
                width="16"
                height="2"
                rx="1"
                className={`transform origin-center transition durantion-200 ease-out ${
                  accordionOpen && "!rotate-180"
                }`}
              />
              <rect
                y="7"
                width="16"
                height="2"
                rx="1"
                className={`transform origin-center rotate-90 transition durantion-200 ease-out ${
                  accordionOpen && "!rotate-180"
                }`}
              />
            </svg>
          </button>
          <div
            className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
              accordionOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0] opacity-0"
            }`}
          >
            <div className="overflow-hidden">{props.answer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
