import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { updateNewsAPI, getSingleNewsAPI } from '../../lib/api/news.api';
import { useEffect, useState } from 'react';
import {
  FiSave,
  FiX,
  FiArrowLeft,
  FiEdit2,
  FiTag,
  FiImage,
  FiAlertCircle,
  FiCheckCircle,
  FiFileText,
  FiUpload,
  FiRefreshCw,
  FiClock,
  FiCalendar,
  FiEye,
  FiLink,
  FiInfo,
  FiHelpCircle,
} from 'react-icons/fi';

const EditNews = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const [activeTab, setActiveTab] = useState('edit');
  const [wordCount, setWordCount] = useState(0);
  const MAX_CHARS = 5000;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    mode: 'onChange',
  });

  // Watch description for character count
  const description = watch('description', '');
  const title = watch('title', '');
  const category = watch('category', '');

  useEffect(() => {
    setCharCount(description?.length || 0);
    setWordCount(description?.split(/\s+/).filter(Boolean).length || 0);
  }, [description]);

  // ✅ Fetch single news
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['single-news', id],
    queryFn: () => getSingleNewsAPI(id),
  });

  // ✅ Set existing image preview
  useEffect(() => {
    if (data?.image) {
      setImagePreview(data.image);
    }
  }, [data]);

  // ✅ VERY IMPORTANT (this fills form)
  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        category: data.category,
        description: data.description,
      });
      setCharCount(data.description?.length || 0);
      setWordCount(data.description?.split(/\s+/).filter(Boolean).length || 0);
    }
  }, [data, reset]);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error('Image size should be less than 5MB');
        e.target.value = '';
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        e.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const removeImage = () => {
    setImagePreview(null);
    setValue('image', '');
    document.getElementById('image').value = '';
  };

  // ✅ Update mutation
  const updateMutation = useMutation({
    mutationFn: updateNewsAPI,
    onSuccess: (res) => {
      toast.success(res.message || 'News updated successfully', {
        icon: '✅',
        duration: 4000,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Update failed', {
        icon: '❌',
      });
    },
  });

  const onSubmit = (formValues) => {
    const { image, ...rest } = formValues;

    const formData = new FormData();
    formData.append('data', JSON.stringify(rest));

    // ✅ only send image if selected
    if (image && image.length > 0) {
      formData.append('image', image[0]);
    }

    updateMutation.mutate({ id, formData });
  };

  // Categories list with icons
  const categories = [
    { value: 'Technology', icon: '💻', color: 'blue' },
    { value: 'Sports', icon: '⚽', color: 'green' },
    { value: 'Health', icon: '🏥', color: 'red' },
    { value: 'Business', icon: '💼', color: 'purple' },
    { value: 'Politics', icon: '🏛️', color: 'gray' },
    { value: 'Entertainment', icon: '🎬', color: 'pink' },
    { value: 'Science', icon: '🔬', color: 'cyan' },
    { value: 'Education', icon: '📚', color: 'yellow' },
    { value: 'Travel', icon: '✈️', color: 'indigo' },
    { value: 'Food', icon: '🍳', color: 'orange' },
    { value: 'Fashion', icon: '👗', color: 'fuchsia' },
    { value: 'Music', icon: '🎵', color: 'violet' },
  ];

  // Get category icon
  const getCategoryIcon = (catValue) => {
    const category = categories.find((c) => c.value === catValue);
    return category ? category.icon : '📰';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-blue-200 border-t-blue-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FiFileText className="h-8 w-8 text-blue-600 animate-pulse" />
            </div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading your News...</p>
          <p className="text-sm text-gray-400 mt-2">
            Please wait while we fetch the content
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header with back button and stats */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-blue-100 hover:border-blue-300 hover:shadow-md"
          >
            <FiArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>

          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <FiEdit2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit News</h1>
              <p className="text-sm text-gray-500">
                News ID: {id?.substring(0, 8)}...
              </p>
            </div>
          </div>
        </div>

        {/* News Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Title Length</p>
                <p className="text-lg font-bold text-gray-900">
                  {title?.length || 0}
                </p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiFileText className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Words</p>
                <p className="text-lg font-bold text-gray-900">{wordCount}</p>
              </div>
              <div className="h-8 w-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <FiClock className="h-4 w-4 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Reading Time</p>
                <p className="text-lg font-bold text-gray-900">
                  {Math.ceil(wordCount / 200)} min
                </p>
              </div>
              <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <FiEye className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="text-sm font-bold text-gray-900 truncate max-w-[80px]">
                  {category || 'Not set'}
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                <FiTag className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm border border-blue-100 mb-8 w-fit">
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex items-center px-6 py-3 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'edit'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <FiEdit2 className="mr-2 h-4 w-4" />
            Edit News
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center px-6 py-3 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'preview'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <FiEye className="mr-2 h-4 w-4" />
            Preview
          </button>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <FiEdit2 className="mr-3 h-6 w-6" />
                  Edit News Information
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  Update the details of your news News
                </p>
              </div>
              {isDirty && (
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                  Unsaved changes
                </span>
              )}
            </div>
          </div>

          {activeTab === 'edit' ? (
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
              {/* Title Field with progress */}
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-700"
                >
                  News Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="title"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                      errors.title
                        ? 'border-red-300 bg-red-50 focus:border-red-500'
                        : dirtyFields.title
                          ? 'border-green-300 bg-green-50 focus:border-green-500'
                          : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
                    }`}
                    placeholder="Enter an attention-grabbing title"
                    {...register('title', {
                      required: 'Title is required',
                      minLength: {
                        value: 10,
                        message: 'Title must be at least 10 characters',
                      },
                      maxLength: {
                        value: 200,
                        message: 'Title must be less than 200 characters',
                      },
                    })}
                  />
                  {dirtyFields.title && !errors.title && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <FiCheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                  {errors.title && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <FiAlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Title strength</span>
                    <span
                      className={
                        title?.length > 50
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }
                    >
                      {title?.length > 50 ? 'Good' : 'Could be longer'}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        title?.length > 50 ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{
                        width: `${Math.min((title?.length / 100) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {errors.title && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <FiAlertCircle className="h-4 w-4 mr-1" />
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Category Field with icons */}
              <div className="space-y-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="category"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none bg-white ${
                      errors.category
                        ? 'border-red-300 bg-red-50 focus:border-red-500'
                        : dirtyFields.category
                          ? 'border-green-300 bg-green-50 focus:border-green-500'
                          : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
                    }`}
                    {...register('category', {
                      required: 'Please select a category',
                    })}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.icon} {cat.value}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none flex items-center space-x-2">
                    {category && (
                      <span className="text-xl">
                        {getCategoryIcon(category)}
                      </span>
                    )}
                    <FiTag className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <FiAlertCircle className="h-4 w-4 mr-1" />
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Description Field with rich features */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Description <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {wordCount} words
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                      {charCount} chars
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    id="description"
                    rows="12"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none ${
                      errors.description
                        ? 'border-red-300 bg-red-50 focus:border-red-500'
                        : dirtyFields.description
                          ? 'border-green-300 bg-green-50 focus:border-green-500'
                          : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
                    }`}
                    placeholder="Write your news News content here..."
                    {...register('description', {
                      required: 'Description is required',
                      minLength: {
                        value: 50,
                        message: 'Description must be at least 50 characters',
                      },
                      maxLength: {
                        value: MAX_CHARS,
                        message: `Description must be less than ${MAX_CHARS} characters`,
                      },
                    })}
                  />
                </div>

                {/* Character counter with warning */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    {errors.description ? (
                      <p className="text-red-500 flex items-center">
                        <FiAlertCircle className="h-4 w-4 mr-1" />
                        {errors.description.message}
                      </p>
                    ) : (
                      <p className="text-gray-400 text-xs flex items-center">
                        <FiInfo className="h-3 w-3 mr-1" />
                        Minimum 50 characters recommended
                      </p>
                    )}
                  </div>

                  <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`absolute left-0 top-0 h-full transition-all duration-300 ${
                        charCount > MAX_CHARS
                          ? 'bg-red-500'
                          : charCount > MAX_CHARS * 0.9
                            ? 'bg-yellow-500'
                            : charCount > 50
                              ? 'bg-green-500'
                              : 'bg-blue-500'
                      }`}
                      style={{ width: `${(charCount / MAX_CHARS) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Image Upload Field with preview */}
              <div className="space-y-2">
                <label
                  htmlFor="image"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Featured Image{' '}
                  <span className="text-gray-400 text-xs font-normal">
                    (optional)
                  </span>
                </label>

                {/* Image Preview */}
                {imagePreview ? (
                  <div className="relative rounded-xl overflow-hidden border-2 border-blue-200 mb-4 group">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all shadow-lg hover:scale-110"
                    >
                      <FiX className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
                      Current Image
                    </div>
                    <div className="absolute bottom-4 right-4 bg-blue-500/90 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                      {data?.image ? 'Update available' : 'New image'}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`border-2 border-dashed rounded-xl p-10 transition-all text-center ${
                      errors.image
                        ? 'border-red-300 bg-red-50'
                        : 'border-blue-200 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      className="hidden"
                      {...register('image', {
                        onChange: handleImageChange,
                      })}
                    />
                    <label
                      htmlFor="image"
                      className="cursor-pointer flex flex-col items-center justify-center space-y-4"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FiUpload className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-center">
                        <p className="text-gray-700 font-medium text-lg">
                          Click to upload new image
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          PNG, JPG, GIF up to 5MB
                        </p>
                        {data?.image && (
                          <p className="text-blue-600 text-xs mt-3 bg-blue-50 px-3 py-1 rounded-full inline-block">
                            Current image will be replaced
                          </p>
                        )}
                      </div>
                    </label>
                  </div>
                )}
              </div>

              {/* Form Actions with progress */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={updateMutation.isPending || !isDirty}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  {updateMutation.isPending ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Updating News...
                    </>
                  ) : (
                    <>
                      <FiSave className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      {!isDirty ? 'No Changes to Save' : 'Update News'}
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center group"
                >
                  <FiX className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform" />
                  Cancel
                </button>
              </div>

              {/* Form Help Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 flex items-start space-x-3 border border-blue-100">
                  <FiCheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-2">Editing Guidelines:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Make sure your title is clear and engaging</li>
                      <li>• Use proper formatting for better readability</li>
                      <li>• Add relevant keywords for better SEO</li>
                      <li>• Preview your changes before saving</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 flex items-start space-x-3 border border-gray-200">
                  <FiHelpCircle className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold mb-2">Need Help?</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Changes are visible immediately after update</li>
                      <li>• You can always edit again later</li>
                      <li>• Contact support for technical issues</li>
                    </ul>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            /* Preview Tab */
            <div className="p-8">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-blue-100 overflow-hidden">
                {/* Preview Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                  <h3 className="text-white font-semibold flex items-center">
                    <FiEye className="mr-2 h-5 w-5" />
                    News Preview
                  </h3>
                </div>

                {/* Preview Content */}
                <div className="p-8">
                  {imagePreview && (
                    <div className="mb-6 rounded-xl overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}

                  <div className="mb-4">
                    <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {getCategoryIcon(category)} {category || 'Category'}
                    </span>
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {title || 'News Title'}
                  </h1>

                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <FiCalendar className="mr-2 h-4 w-4" />
                    <span>Last edited: Just now</span>
                    <span className="mx-2">•</span>
                    <FiClock className="mr-2 h-4 w-4" />
                    <span>{Math.ceil(wordCount / 200)} min read</span>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {description || 'Your News content will appear here...'}
                    </p>
                  </div>

                  {(!description || description.length === 0) && (
                    <div className="bg-gray-50 rounded-xl p-8 text-center">
                      <FiFileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">No content to preview yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Version History Card */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-blue-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiClock className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-medium text-gray-700">Version History</span>
            </div>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              Last updated today
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            You're editing the latest version of this News
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditNews;
