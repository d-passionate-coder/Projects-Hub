import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ShowPDF from "../components/Project/ShowPDF";

// Create Document Component
const ViewProposal = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios.get(`project/${id}`).then((res) => {
      const pdfData = res.data.proposal.content.data;
      setData(pdfData);
    });
  }, []);
  return data ? <ShowPDF data={data} /> : <div>Loading...</div>;
};

export default ViewProposal;
