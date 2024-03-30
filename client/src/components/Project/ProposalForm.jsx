import React, { useEffect } from "react";
import InputBox from "../utils/InputBox.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStep } from "../../redux/features/proposalSlice.js";
import { uploadProposal } from "../../api/Upload.js";
import getGuideByInstitute from "../../api/getGuideByInstitute.js";
import { Button } from "@nextui-org/react";

const ProposalForm = () => {
  useEffect(() => {
    getGuideByInstitute()
      .then((guides) => {
        setGuides(guides);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [guides, setGuides] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    title: "",
    pdf: null,
    problemStatement: "",
    guide: "",
    fileName: "",
  });

  const { title, problemStatement, guide, fileName } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadProposal(formData)
      .then((res) => {
        dispatch(setStep(1));
        navigate(`/proposal/upload/plagiarism-checker/2/${res}`);
      })
      .catch((err) => {
        return err;
      });
  };

  const handleFileChange = (e) => {
    let str = e.target.files[0]?.name || "";
    str = str.substring(0, Math.min(str.length, 12));
    str = str && str + "..";

    setformData((prev) => {
      return {
        ...prev,
        pdf: e.target.files[0] || null,
        fileName: str,
      };
    });
  };

  const handleChange = (e) => {
    setformData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <div className="bg-white rounded-lg shadow my-2 p-8 py-3 font-poppins">
      <form
        className="p-8 px-10 font-poppins w-auto text-base flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title" className="font-medium">
          Project title
        </label>
        <InputBox
          type={"text"}
          id={"title"}
          name={"title"}
          placeholder={"Enter your project title"}
          onChange={handleChange}
          value={title}
          customText={true}
        />
        <label htmlFor="guide" className="font-medium">
          Select guide
        </label>
        <div className="flex gap-2 text-sm items-center">
          <p className="opacity-80">Prof.</p>
          <div className="flex gap-3 w-full items-center border border-[#E1E3E6] border-2 rounded-lg h-8 px-3">
            <select
              required
              className="w-full focus:outline-none text-sm"
              name="guide"
              id="guide"
              onChange={handleChange}
              value={guide}
            >
              <option value="" className="text-xs" selected>
                Select your guide
              </option>
              {guides.length > 0 &&
                guides.map((guide) => (
                  <option className="text-xs" key={guide.id} value={guide.id}>
                    {guide.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <label htmlFor="problemStatement" className="font-medium">
          Problem Statement
        </label>
        <div className="flex items-center border border-[#E1E3E6] border-2 rounded-lg  px-2">
          <textarea
            required
            name="problemStatement"
            id="problemStatement"
            className="focus:outline-none w-full min-h-24 max-h-48 text-sm"
            placeholder="Provide problem statement in detail..."
            onChange={handleChange}
            value={problemStatement}
          />
        </div>
        <div className="flex justify-between pt-2 items-center w-full">
          <label className="font-medium">Upload relevant pdf</label>
          <div>
            <label
              htmlFor="pdf"
              className="border p-1 px-2 cursor-pointer flex gap-2"
            >
              <img src="/assets/svg/upload.svg" alt="" />
              Upload
            </label>
            <div className="text-xs text-[#FF0000] opacity-80">{fileName}</div>
            <input
              required
              type="file"
              id="pdf"
              accept=".pdf"
              name="pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <Button
          className="bg-orange text-white text-base font-rem h-8 rounded-lg"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ProposalForm;
