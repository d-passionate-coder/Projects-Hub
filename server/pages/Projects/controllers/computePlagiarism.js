import { PDFExtract } from "pdf.js-extract";
import Project from "../models/Projects.js";
import levenshtein from "fast-levenshtein";

// Function to compute similarity
function computeSimilarity(queryText, corpusText) {
  let final = corpusText.reduce((result, { id, title, text }) => {
    const distance = levenshtein.get(queryText, text);
    // Calculate maximum possible distance (length of longer text)
    const maxLength = Math.max(queryText.length, text.length);

    // Calculate normalized similarity (1 - distance / max length)
    const similarity = (1 - distance / maxLength) * 100;
    result.push({ id, title, similarity });
    return result;
  }, []);

  return final;
}

async function extractTextFromBuffer(buffer) {
  const pdfExtract = new PDFExtract();
  const data = await pdfExtract.extractBuffer(buffer);
  let allText = "";
  for (const page of data.pages) {
    for (const content of page.content) {
      allText += content.str + " ";
    }
  }

  return allText.trim();
}

const computePlagiarism = (req, res) => {
  const projectId = req.body.id;
  Project.findById(projectId)
    .then(async (project) => {
      if (project) {
        const { proposal, plagiarism, id } = project;
        if (proposal.status !== "Pending") {
          return res.send(plagiarism.report);
        }
        if (plagiarism?.report?.length > 0) {
          return res.send(plagiarism.report);
        }
        const queryText = await extractTextFromBuffer(proposal.content);
        const curId = id;
        const projects = await Project.find({
          _id: { $ne: curId },
          status: { $ne: "Rejected" },
          "proposal.status": "Approved",
        });
        try {
          if (!projects) return res.send([]);
          const corpusText = await Promise.all(
            projects.map(async (project) => {
              const extractedText = await extractTextFromBuffer(
                project.content || project.proposal.content
              );
              return {
                id: project._id,
                title: project.title,
                text: extractedText,
              };
            })
          );
          const result = computeSimilarity(queryText, corpusText);
          project.plagiarism.report = result;
          await project.save();
          return res.send(result);
        } catch (error) {
          throw error;
        }
      } else {
        throw new Error("Project not found");
      }
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};

export default computePlagiarism;
