import { FiChevronUp } from 'react-icons/fi';

const ScrollTopButton = ({ showScrollTop, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 ${
        showScrollTop
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-16 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <FiChevronUp className="h-6 w-6" />
    </button>
  );
};

export default ScrollTopButton;