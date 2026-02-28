import { FiPieChart } from 'react-icons/fi';

const CategoryChart = ({ data, isLoading }) => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-indigo-500'
  ];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
        <div className="text-center py-8 text-gray-500">
          <FiPieChart className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>No category data available</p>
        </div>
      </div>
    );
  }

  const total = data.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-6">Category Distribution</h3>
      <div className="space-y-4">
        {data.map((item, index) => {
          const percentage = ((item.count / total) * 100).toFixed(1);
          return (
            <div key={item._id}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{item._id}</span>
                <span className="text-gray-600">{item.count} ({percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${colors[index % colors.length]} h-2 rounded-full`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryChart;