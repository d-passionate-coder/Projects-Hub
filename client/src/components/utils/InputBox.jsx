import React from "react";

const InputBox = ({
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  customText = false,
}) => {
  const isEmail = name == "email";
  const isPass = type == "password";

  return (
    <div className="flex gap-3 items-center border border-[#E1E3E6] border-2 rounded-lg h-8 px-3">
      {isEmail && <img src="/assets/svg/emailIcon.svg" alt="email"></img>}
      {isPass && <img src="/assets/svg/passIcon.svg" alt="password"></img>}
      <input
        type={type}
        required
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full placeholder:text-[#999999] placeholder:text-${
          customText ? "sm" : "[0.75rem]"
        } focus:outline-none ${customText ? "text-sm" : "text-[0.8rem]"}`}
      />
    </div>
  );
};

export default InputBox;
