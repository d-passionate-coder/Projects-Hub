import { useEffect } from "react";
import ProgressLevels from "../components/Project/ProgressLevels.jsx";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStep } from "../redux/features/proposalSlice.js";

const fields = [
  { name: "Submit", path: "submit/1" },
  { name: "Plagiarism check", path: "plagiarism-checker/2/" },
  { name: "Approval", path: "approval/3/" },
];
const ProposalUpload = () => {
  const dispatch = useDispatch();
  const { step: curStep } = useParams();

  useEffect(() => {
    dispatch(setStep(Number(curStep - 1)));
  });

  return (
    <div className="flex justify-center pt-7 bg-background">
      <div className="flex flex-col items-center">
        <ProgressLevels fields={fields} />
        <div className="min-w-[34rem]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProposalUpload;
