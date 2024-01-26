import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Download = ({pdfRef, fileName}) => {
   
    const downloadPdf = () => {
        const input = pdfRef.current;
        html2canvas(input).then(
          (canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p','mm','a4',true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio)/2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX,imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save(fileName);
          }
        )
      }

      
    const printPdf = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.autoPrint();
            window.open(pdf.output('bloburl'), '_blank');
        });
    };

    return (
        <div className='text-center mb-3 mt-3 d-flex justify-content-around '>
            <button className='btn btn-info text-white bg-info bg-gradient w-25' onClick={downloadPdf}> Download PDF</button>
            <button className='btn btn-warning text-white bg-warning bg-gradient w-25' onClick={printPdf}> Print PDF</button>
        </div>
    );
};

export default Download;