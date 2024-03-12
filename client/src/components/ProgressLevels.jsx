import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setStep } from "../redux/features/proposalSlice";

const ProgressLevels = ({ fields }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { step } = useSelector((state) => state.proposal);
  let n = fields.length - 1;
  return (
    <div className="font-poppins">
      <div className="flex relative mx-4 w-[34rem] mt-5 mb-12 justify-between">
        {fields.map((field, index) => {
          return (
            <div className={`${index != n && "w-full"} flex items-center`}>
              <div
                onClick={
                  index != 0 && index <= step
                    ? (e) => {
                        dispatch(setStep(index));
                        navigate(field.path + id);
                      }
                    : null
                }
                className={`flex z-10 bg-background  ${
                  index != 0 && index <= step && "cursor-pointer"
                } transition ease duration-[0.4s] ${
                  index <= step
                    ? "bg-black border text-white"
                    : "border border-black border-opacity-10 border-2"
                } justify-center shrink-0 items-center rounded-full w-10 h-10 relative`}
              >
                {index >= step ? (
                  <p>{index + 1}</p>
                ) : (
                  <img src="/assets/svg/done.svg" alt="" />
                )}
                <div className="absolute -bottom-6 left-[50%] translate-x-[-50%] text-nowrap font-poppins text-black font-light text-sm">
                  {field.name}
                </div>
              </div>
              {index != n && (
                <hr
                  className={`transition-[width] z-10 ease duration-[0.4s] h-0.5 border-none bg-black ${
                    index < step ? "w-full" : "w-0"
                  }`}
                ></hr>
              )}
            </div>
          );
        })}
        <div className="absolute top-[50%] translate-y-[-50%] w-full h-0.5 bg-black opacity-10"></div>
      </div>
    </div>
  );
};

export default ProgressLevels;
