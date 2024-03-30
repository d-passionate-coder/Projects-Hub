import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setStep } from "../../redux/features/proposalSlice";
import computePlagiarism from "../../redux/actions/computePlagiarism";
import CustomTable from "../Table/CustomTable";

const PlagiarismChecker = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, plagReport } = useSelector((state) => state.proposal);

  useEffect(() => {
    dispatch(computePlagiarism(id));
  }, [id]);

  const plagiarismReportFields = [
    {
      name: "No.",
      uid: "serialNumber",
    },
    {
      name: "Title",
      uid: "title",
    },
    {
      name: "Plagiarism Score",
      uid: "similarity",
    },
  ];

  return (
    <div>
      <div className="bg-white relative rounded-lg shadow my-2 p-8 font-poppins">
        <div className="p-8  px-10 font-poppins min-h-80 min-w-96  text-base flex flex-col gap-4">
          {loading || !plagReport ? (
            <div>Loading...</div>
          ) : (
            <CustomTable
              fields={plagiarismReportFields}
              projects={plagReport}
              rowClickable={false}
            />
          )}
        </div>
        <button
          onClick={(e) => {
            dispatch(setStep(2));
            navigate(`/proposal/upload/approval/3/${id}`);
          }}
          //disabled={loading || plagReport?.score >= 50 ? true : false}
          className="disabled:cursor-not-allowed absolute bottom-2 right-2 border px-1"
        >
          Next
        </button>
      </div>
    </div>
  );
};

{
  /* (
            <div>
              <table className="text-left text-sm border-t border-x border-[#DBDBDB] border-separate border-spacing-0 w-full rounded-md overflow-hidden">
                <tr className="bg-[#F0F0F0]">
                  <td className="pl-7 w-80 border-b border-[#DBDBDB]">Title</td>
                  <td className="w-56 border-b border-[#DBDBDB]">
                    Plagiarism score
                  </td>
                  <td className="border-b pr-7 border-[#DBDBDB]"></td>
                </tr>
                {plagReport.length > 0 &&
                  plagReport.map(({ id, title, similarity }) => {
                    return (
                      <tr className="text-[#74828F] font-medium">
                        <td className="pr-12 pl-7 border-b border-[#DBDBDB] leading-relaxed">
                          {title}
                        </td>
                        <td
                          className={`border-b border-[#DBDBDB] ${
                            similarity > 75 && "text-[#dc2626]"
                          }`}
                        >
                          {similarity.toPrecision(3) + "%"}
                        </td>
                        <td className="border-b pr-7 border-[#DBDBDB]">
                          <p
                            onClick={() => {
                              navigate(`/project/${id}`);
                            }}
                            className="cursor-pointer underline text-[#3b82f6]"
                          >
                            View
                          </p>
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </div>
          )} */
}

export default PlagiarismChecker;
