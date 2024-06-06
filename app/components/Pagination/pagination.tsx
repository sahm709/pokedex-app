import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface PaginationProps {
  currentPage: number;
  maxPokemon: number;
  maxPages: number;
  goToPrevPage: () => void;
  goToNextPage: () => void;
}
const Pagination = ({
  currentPage,
  maxPokemon,
  maxPages,
  goToPrevPage,
  goToNextPage,
}: PaginationProps) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{currentPage * 15 - 14}</span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(currentPage * 15, maxPokemon)}
            </span>{" "}
            of <span className="font-medium">{maxPokemon}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {/* Previous button */}
            <button
              onClick={goToPrevPage}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Pagination buttons */}
            {currentPage > 2 && (
              <>
                <button
                  key={1}
                  onClick={() => router.push(`/?page=${1}`)}
                  className={`text-gray-900 relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:outline-offset-0 hover:bg-gray-50`}
                >
                  {1}
                </button>
                <span className="text-gray-900 relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                  ...
                </span>
              </>
            )}

            {Array.from({
              length: Math.min(3, maxPages - Math.max(1, currentPage - 1)),
            }).map((_, index) => {
              const pageNumber = currentPage + index;

              return (
                <button
                  key={pageNumber}
                  onClick={() => router.push(`/?page=${pageNumber}`)}
                  className={`${
                    pageNumber === currentPage
                      ? "bg-indigo-600 text-white"
                      : "text-gray-900"
                  } relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:outline-offset-0 hover:bg-gray-50`}
                >
                  {pageNumber}
                </button>
              );
            })}
            {currentPage < maxPages - 3 && (
              <>
                <span className="text-gray-900 relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                  ...
                </span>
                <button
                  key={maxPages}
                  onClick={() => router.push(`/?page=${maxPages}`)}
                  className={`text-gray-900 relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:outline-offset-0 hover:bg-gray-50`}
                >
                  {maxPages}
                </button>
              </>
            )}
            {/* Next button */}
            <button
              onClick={goToNextPage}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              disabled={currentPage === maxPages}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
      <div className="flex justify-between items-center sm:hidden w-full">
        <button
          onClick={goToPrevPage}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={goToNextPage}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={currentPage === maxPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
