import { FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const RecentActivity = ({ news, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
      {!news?.length ? (
        <div className="text-center py-8 text-gray-500">
          <FiClock className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>No recent activity</p>
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((item) => (
            <div key={item._id} className="flex items-start space-x-3 pb-4 border-b last:border-0 last:pb-0">
              <div className="w-2 h-2 mt-2 rounded-full bg-primary-500"></div>
              <div className="flex-1">
                <Link 
                  to={`/news/${item._id}`}
                  className="font-medium text-gray-900 hover:text-primary-600"
                >
                  {item.title}
                </Link>
                <p className="text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                {item.author && (
                  <p className="text-xs text-gray-400 mt-1">
                    By: {item.author.name || item.author.email}
                  </p>
                )}
              </div>
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;