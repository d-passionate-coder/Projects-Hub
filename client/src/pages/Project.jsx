import { useEffect, useState } from "react";
import { Document, Page, pdfjs, Outline } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useParams } from "react-router-dom";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// Create Document Component
const Project = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios.get(`/api/project/${id}`).then((res) => {
      const pdfData = res.data.proposal.content.data;
      setData(pdfData);
    });
  }, []);
  return data ? (
    <div className="flex justify-center">
      <Document file={{ data: new Uint8Array(data) }}>
        {Array.from({ length: 10 }, (_, i) => {
          return <Page scale={1.5} pageNumber={i + 1} />;
        })}
      </Document>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
export default Project;
