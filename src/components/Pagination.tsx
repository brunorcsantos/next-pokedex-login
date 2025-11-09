import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = (props: any) => {
  const {startIndex, itemsPerPage, filteredPokemon, goToPrevious, currentPage, getVisiblePages, setCurrentPage, goToNext, totalPages} = props;
  
  return (
    <div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 dark:border-white/10 dark:bg-transparent">
        <div className="flex w-full items-center justify-between">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Mostrando <span className="font-medium">{startIndex + 1}</span> -{" "}
            <span className="font-medium">
              {Math.min(startIndex + itemsPerPage, filteredPokemon.length)}
            </span>{" "}
            de <span className="font-medium">{filteredPokemon.length}</span>
          </p>

          <nav className="isolate inline-flex -space-x-px rounded-md shadow-xs">
            {/* Botão Anterior */}
            <button
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-40"
            >
              <ChevronLeftIcon className="size-5" />
            </button>

            {/* Números de página (limitados) */}
            {getVisiblePages().map((page: any) => (
              <button
                key={`page-${page}`} // ✅ chave única
                onClick={() => setCurrentPage(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ${
                  page === currentPage
                    ? "z-10 bg-indigo-600 text-white dark:bg-indigo-500"
                    : "text-gray-900 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/5"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Botão Próximo */}
            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-40"
            >
              <ChevronRightIcon className="size-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
