const TextInput = ({label, placeholder, className, value, setValue, labelClassName}) => {
  return (
    <div className ={ `textInputDiv d-flex flex-column w-100 ${className}`} >
        <label for = {label} className={`fw-bold ${labelClassName}`}>{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      className="border-2 border-solid border-black rounded p-2"
      id= {label}
      value = {value}
      onChange={(e)=>{
        setValue(e.target.value);
      }}
    ></input>
    </div>
  );
};

export default TextInput;
