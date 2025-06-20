
const LoadingSpinner = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
