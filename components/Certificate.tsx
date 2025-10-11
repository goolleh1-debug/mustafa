import React, { useRef } from 'react';
import { User, Course } from '../types';

interface CertificateProps {
  user: User;
  course: Course;
  onClose: () => void;
}

const Certificate: React.FC<CertificateProps> = ({ user, course, onClose }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const downloadCertificate = () => {
    if (!svgRef.current) return;

    const svgElement = svgRef.current;
    const svgData = new XMLSerializer().serializeToString(svgElement);

    const canvas = document.createElement('canvas');
    const svgSize = svgElement.viewBox.baseVal;
    canvas.width = svgSize.width * 2; // Increase resolution
    canvas.height = svgSize.height * 2;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(2, 2); // Scale context for higher resolution

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = `Geeddi_Certificate_${course.title.replace(/\s/g, '_')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    // Use btoa(unescape(encodeURIComponent(str))) to correctly handle UTF-8 characters
    const svgBase64 = btoa(unescape(encodeURIComponent(svgData)));
    img.src = `data:image/svg+xml;base64,${svgBase64}`;
  };

  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-4xl transform transition-all animate-slide-up relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white bg-gray-700 rounded-full h-8 w-8 flex items-center justify-center z-10" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="p-4 sm:p-8">
          <svg ref={svgRef} viewBox="0 0 800 600" className="w-full h-auto" style={{ fontFamily: 'sans-serif' }}>
            <rect x="0" y="0" width="800" height="600" fill="#fdfdfd" />
            <rect x="10" y="10" width="780" height="580" fill="none" stroke="#c0a062" strokeWidth="2" />
            <rect x="20" y="20" width="760" height="560" fill="none" stroke="#c0a062" strokeWidth="8" />
            
            <text x="400" y="80" textAnchor="middle" fontSize="24" fill="#555" style={{ fontFamily: 'Georgia, serif' }}>
              Geeddi AI Learning Academy
            </text>
            
            <text x="400" y="160" textAnchor="middle" fontSize="48" fill="#333" fontWeight="bold" style={{ fontFamily: 'Georgia, serif', letterSpacing: '2px' }}>
              CERTIFICATE of COMPLETION
            </text>

            <rect x="150" y="180" width="500" height="2" fill="#c0a062" />
            
            <text x="400" y="230" textAnchor="middle" fontSize="22" fill="#555" fontStyle="italic" style={{ fontFamily: 'Georgia, serif' }}>
              This certifies that
            </text>
            
            <text x="400" y="310" textAnchor="middle" fontSize="44" fill="#000" fontWeight="bold" style={{ fontFamily: 'Georgia, serif' }}>
              {user.name}
            </text>

            <text x="400" y="360" textAnchor="middle" fontSize="22" fill="#555" fontStyle="italic" style={{ fontFamily: 'Georgia, serif' }}>
              has successfully completed the course
            </text>
            
            <text x="400" y="420" textAnchor="middle" fontSize="32" fill="#333" fontWeight="bold" style={{ fontFamily: 'Georgia, serif' }}>
              "{course.title}"
            </text>
            
            <text x="200" y="520" textAnchor="middle" fontSize="18" fill="#555" style={{ fontFamily: 'Georgia, serif' }}>
              {completionDate}
            </text>
            <rect x="100" y="490" width="200" height="1.5" fill="#555" />
            <text x="200" y="505" textAnchor="middle" fontSize="14" fill="#555">Date</text>
            
            <text x="600" y="520" textAnchor="middle" fontSize="18" fill="#555" style={{ fontFamily: 'Georgia, serif' }}>
              Geeddi Academy
            </text>
            <rect x="500" y="490" width="200" height="1.5" fill="#555" />
            <text x="600" y="505" textAnchor="middle" fontSize="14" fill="#555">Issuing Authority</text>
          </svg>
        </div>
        <div className="text-center p-4 border-t border-gray-700">
          <button 
            onClick={downloadCertificate}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Download as PNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;