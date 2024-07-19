export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex justify-center mt-6">
      <nav className="flex space-x-2">
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 border rounded-md ${currentPage === page ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'}`}
          >
            {page}
          </button>
        ))}
      </nav>
    </div>
  );
}
