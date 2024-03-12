import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setPlagReport, setStep } from "../redux/features/proposalSlice";
import computePlagiarism from "../redux/actions/computePlagiarism";

const PlagiarismChecker = () => {
  const dispatch = useDispatch();
  const { loading, plagReport, error } = useSelector((state) => state.proposal);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/project/${id}`)
      .then((res) => {
        if (res.data.plagiarism) {
          dispatch(setPlagReport(res.data.plagiarism));
        } else {
          dispatch(computePlagiarism(id));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      <div className="bg-white relative rounded-lg shadow my-2 p-8 font-poppins">
        <form className="p-8  px-10 font-poppins h-96 w-96 text-base flex flex-col gap-4">
          {loading && <p>Loading...</p>}
          {!loading && plagReport && <p>done</p>}
          {!loading && error && <p>Error</p>}
        </form>
        <button
          onClick={(e) => {
            dispatch(setStep(2));
            navigate(`/proposal/approval/3/${id}`);
          }}
          disabled={loading || plagReport?.score >= 50 ? true : false}
          className="disabled:cursor-not-allowed absolute bottom-2 right-2 border px-1"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PlagiarismChecker;
