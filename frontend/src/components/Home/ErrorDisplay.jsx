const ErrorDisplay = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-center max-w-md border border-white/20">
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">😕</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-300 mb-6">{error}</p>
        <button
          onClick={onRetry}
          className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-semibold"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;