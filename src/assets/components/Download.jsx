import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Download = ({ pdfRef, fileName }) => {
  // contentWidth must be adjust according to the content
  // Class Routine Content width = 170
  const contentWidth = 180;
  
  const addCanvasImageToPdf = (pdf, canvas, imgWidth, imgHeight) => {
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgX = (pageWidth - imgWidth) / 2;
  
    let heightLeft = imgHeight;
    let position = 0;
    heightLeft -= pageHeight;
    pdf.addImage(canvas, 'PNG', imgX, position, imgWidth, imgHeight, '', 'FAST');
    while (heightLeft >= 0.4) {
      console.log(heightLeft);
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas, 'PNG', imgX, position, imgWidth, imgHeight, '', 'FAST');
      heightLeft -= pageHeight;
    }
  };
  
  const downloadPdf = () => {
    const input = pdfRef.current;
    const pdf = new jsPDF("p", "mm", "a4", true);
  
    html2canvas(input).then((canvas) => {
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      addCanvasImageToPdf(pdf, canvas, imgWidth, imgHeight);
      
      pdf.save(fileName);
    });
  };
  
  const printPdf = () => {
    const input = pdfRef.current;
    const pdf = new jsPDF("p", "mm", "a4", true);
  
    html2canvas(input).then((canvas) => {
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      addCanvasImageToPdf(pdf, canvas, imgWidth, imgHeight);
  
      pdf.autoPrint();
      window.open(pdf.output("bloburl"), "_blank");
    });
  };
  

  return (
    <div className="text-center mb-3 mt-3 d-flex justify-content-around ">
      <button
        className="btn btn-info text-white bg-info bg-gradient w-25"
        onClick={downloadPdf}
      >
        {" "}
        Download PDF
      </button>
      <button
        className="btn btn-warning text-white bg-warning bg-gradient w-25"
        onClick={printPdf}
      >
        {" "}
        Print PDF
      </button>
    </div>
  );
};

export default Download;
