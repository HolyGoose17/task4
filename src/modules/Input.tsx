interface IInputProps {
  placeholder: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}

export const Input = ({ placeholder, type, value, onChange }: IInputProps) => {
  return (
    <input
      className="border rounded-sm border-gray-400 focus:border-blue-400 focus:outline-none focus:border-2 hover:border-black w-100 h-14 py-4 px-3.5"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
