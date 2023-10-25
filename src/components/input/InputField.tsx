const InputField = ({
  isNumeric,
  title,
  setter,
  value,
  error,
}: {
  isNumeric: boolean;
  title: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  error: string;
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label>
        <div className="flex items-center">
          {title}&nbsp;
          {error && <h1 className="text-red-400 text-[12px]">{error}</h1>}
        </div>
      </label>
      <input
        value={value}
        key={title}
        type={isNumeric ? "number" : "text"}
        onChange={(e) => setter(e.target.value)}
        maxLength={42}
        spellCheck={false}
        className={`outline-none w-full p-2 border border-1 ${
          error ? "border-red-400" : "border-mainLight"
        } bg-[#545454] text-mainBlue`}
      />
    </div>
  );
};

export default InputField;
