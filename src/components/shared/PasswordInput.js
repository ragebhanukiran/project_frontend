const TextInput = ({label, placeholder, value, setValue}) => {
    return (
      <div className = "textInputDiv d-flex flex-column mt-3">
          <label for = {label} className="fw-bold">{label}</label>
      <input
        type="password"
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