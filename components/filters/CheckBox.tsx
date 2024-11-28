const CheckBox = ({
  eltStatus,
  handleCheckValue,
  defaultChecked,
}: {
  eltStatus: string;
  handleCheckValue: (value: string) => void;
  defaultChecked: boolean;
}) => {
  return (
    <div key={eltStatus} className="form-control">
      <label className="flex gap-3 items-center cursor-pointer">
        <input
          onChange={(e) => {
            const checkedValue = e.currentTarget.value;
            handleCheckValue(checkedValue);
          }}
          type="checkbox"
          className="checkbox checkbox-primary checkbox-sm"
          value={eltStatus}
          defaultChecked={defaultChecked}
        />
        <span className="label-text">{eltStatus}</span>
      </label>
    </div>
  );
};

export default CheckBox;
