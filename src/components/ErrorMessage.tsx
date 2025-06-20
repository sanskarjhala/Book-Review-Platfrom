
interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="text-center py-8">
      <div className="bg-red-50 text-red-700 p-4 rounded-md">
        Error: {message}
      </div>
    </div>
  );
};

export default ErrorMessage;
