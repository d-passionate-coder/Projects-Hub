import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const Approval = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const location = useLocation().pathname.split("/")[1] || "/";
  console.log(location);

  useEffect(() => {
    axios
      .get(`project/${id}`)
      .then((res) => {
        console.log(res);
        const curStatus =
          location === "project" ? res.data.status : res.data.proposal.status;
        setStatus(curStatus);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="bg-white rounded-lg  shadow my-2 p-8 font-poppins">
        <form className="p-8 px-10 font-poppins h-80 w-96 text-base flex flex-col gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : status === "Pending" ? (
            <p>Approval is pending</p>
          ) : (
            <p>{`Your ${location} has been ${status}`}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Approval;
