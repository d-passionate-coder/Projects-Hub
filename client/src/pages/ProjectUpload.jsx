import { useEffect } from "react";
import ProgressLevels from "../components/Project/ProgressLevels";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStep } from "../redux/features/proposalSlice";

const fields = [
  { name: "Submit", path: "submit/1" },
  { name: "Approval", path: "approval/2/" },
];
const ProjectUpload = () => {
  const dispatch = useDispatch();
  const { step: curStep } = useParams();

  useEffect(() => {
    dispatch(setStep(Number(curStep - 1)));
  });

  return (
    <div className="flex justify-center pt-7 bg-background">
      <div>
        <ProgressLevels fields={fields} />
        <Outlet />
      </div>
    </div>
  );
};

export default ProjectUpload;
