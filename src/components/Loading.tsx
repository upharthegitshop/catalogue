interface LoadingProps {
  message?: string;
}

const Loading = ({ message = "Loading beautiful things..." }: LoadingProps) => {
  return (
    <div className="text-center py-20">
      <div className="spinner" />
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default Loading;
