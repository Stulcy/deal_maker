const InputField = ({
  isNumeric,
  title,
  setter,
}: {
  isNumeric: boolean;
  title: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div id="no-hiding" className="flex flex-col gap-1 w-full">
      <label id="no-hiding">{title}</label>
      <input
        type={isNumeric ? "number" : "text"}
        id="no-hiding"
        onChange={(e) => setter(e.target.value)}
        maxLength={42}
        spellCheck={false}
        className="outline-none w-full p-2 border border-1 border-mainLight bg-[#545454] text-mainBlue"
      />
    </div>
  );
};

export default InputField;
