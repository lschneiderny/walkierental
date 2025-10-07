"use client";

import { useState } from "react";

interface AccordionItem {
  q: string;
  a: string;
}

export default function Accordian({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div data-accordion="collapse">
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        const isOpen = openIndex === index;
        
        return (
          <div key={index}>
            <h2 id={`accordion-collapse-heading-${index}`}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 gap-3 ${
                  isFirst ? "rounded-t-xl" : ""
                } ${isLast && !isOpen ? "rounded-b-xl" : ""} ${
                  !isLast ? "border-b-0" : ""
                }`}
                data-accordion-target={`#accordion-collapse-body-${index}`}
                aria-expanded={isOpen}
                aria-controls={`accordion-collapse-body-${index}`}
              >
                <span>{item.q}</span>
                <svg
                  data-accordion-icon
                  className={`w-3 h-3 shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id={`accordion-collapse-body-${index}`}
              className={isOpen ? "" : "hidden"}
              aria-labelledby={`accordion-collapse-heading-${index}`}
            >
              <div
                className={`p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 ${
                  !isLast ? "border-b-0" : ""
                } ${isLast ? "rounded-b-xl" : ""}`}
              >
                <p className="text-gray-500 dark:text-gray-400">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
