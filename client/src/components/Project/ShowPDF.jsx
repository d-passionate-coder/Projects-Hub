import { Document, Page, pdfjs, Outline } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// Create Document Component
const ShowPDF = ({ data }) => {
  return (
    <div className="flex justify-center">
      <Document file={{ data: new Uint8Array(data) }}>
        {Array.from({ length: 10 }, (_, i) => {
          return <Page scale={1.5} pageNumber={i + 1} />;
        })}
      </Document>
    </div>
  );
};
export default ShowPDF;
