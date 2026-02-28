import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createNewsAPI } from '../../lib/api/news.api';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import {
  FiUpload,
  FiX,
  FiArrowLeft,
  FiFileText,
  FiTag,
  FiImage,
  FiSend,
  FiSave,
  FiAlertCircle,
  FiCheckCircle,
} from 'react-icons/fi';

const CreateNews = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 5000;

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      image: '',
      category: '',
      description: '',
    },
  });

  // Watch description for character count
  const description = watch('description', '');

  useEffect(() => {
    setCharCount(description?.length || 0);
  }, [description]);

  // Handle image preview
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
    } else {
      setImagePreview(null);
    }
  };

  // Remove image
  const removeImage = () => {
    setImagePreview(null);
    setValue('image', '');
    document.getElementById('image').value = '';
  };

  const createNewsMutation = useMutation({
    mutationKey: ['create-news'],
    mutationFn: createNewsAPI,
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message, {
          icon: '🎉',
          duration: 4000,
        });
        navigate('/dashboard');
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create news', {
        icon: '❌',
      });
    },
  });

  const onSubmit = (data) => {
    const { image, ...restData } = data;
    const formData = new FormData();
    formData.append('data', JSON.stringify(restData));
    formData.append('image', image[0]);
    createNewsMutation?.mutate(formData);
  };

  // Categories list
  const categories = [
    'Technology',
    'Sports',
    'Health',
    'Business',
    'Politics',
    'Entertainment',
    'Science',
    'Education',
    'Travel',
    'Food',
    'Fashion',
    'Music',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="group flex items-center text-gray-600 hover:text-gray-900 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 hover:shadow-md"
            >
              <FiArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <FiFileText className="h-5 w-5 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Create New News
            </h1>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <FiFileText className="mr-3 h-6 w-6" />
              News Information
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              Fill in the details below to create your news News
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            {/* Title Field */}
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
                {errors.title && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <FiAlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.title && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FiAlertCircle className="h-4 w-4 mr-1" />
                  {errors.title.message}
                </p>
              )}
              <p className="text-gray-400 text-xs">
                Tip: Keep your title clear and engaging
              </p>
            </div>

            {/* Category Field */}
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
                      : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
                  }`}
                  {...register('category', {
                    required: 'Please select a category',
                  })}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
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

            {/* Description Field */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  rows="10"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none ${
                    errors.description
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
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

              {/* Character counter */}
              <div className="flex justify-between items-center">
                {errors.description ? (
                  <p className="text-red-500 text-sm flex items-center">
                    <FiAlertCircle className="h-4 w-4 mr-1" />
                    {errors.description.message}
                  </p>
                ) : (
                  <p className="text-gray-400 text-xs">Minimum 50 characters</p>
                )}
                <span
                  className={`text-sm font-medium ${
                    charCount > MAX_CHARS
                      ? 'text-red-500'
                      : charCount > MAX_CHARS * 0.9
                        ? 'text-yellow-500'
                        : 'text-gray-400'
                  }`}
                >
                  {charCount} / {MAX_CHARS}
                </span>
              </div>
            </div>

            {/* Image Upload Field */}
            <div className="space-y-2">
              <label
                htmlFor="image"
                className="block text-sm font-semibold text-gray-700"
              >
                Featured Image <span className="text-red-500">*</span>
              </label>

              {/* Image Preview */}
              {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden border-2 border-blue-200 mb-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                    Preview
                  </div>
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-xl p-8 transition-all ${
                    errors.image
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                >
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="hidden"
                    {...register('image', {
                      required: 'Featured image is required',
                      onChange: handleImageChange,
                    })}
                  />
                  <label
                    htmlFor="image"
                    className="cursor-pointer flex flex-col items-center justify-center space-y-3"
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <FiImage className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-gray-700 font-medium">
                        Click to upload featured image
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {errors.image && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <FiAlertCircle className="h-4 w-4 mr-1" />
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={createNewsMutation?.isPending}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
              >
                {createNewsMutation?.isPending ? (
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
                    Publishing News...
                  </>
                ) : (
                  <>
                    <FiSend className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Publish News
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

            {/* Form Hint */}
            <div className="bg-blue-50 rounded-xl p-4 flex items-start space-x-3">
              <FiCheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Pro tip:</p>
                <p>
                  Add a high-quality featured image and write a compelling
                  description to engage your readers. Newses with images get 3x
                  more views!
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNews;
