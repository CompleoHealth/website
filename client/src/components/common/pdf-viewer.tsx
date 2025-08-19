import React, { useState } from 'react';
import { Download, X, Maximize2, Minimize2, Eye } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ 
  pdfUrl, 
  title, 
  isOpen, 
  onClose, 
  onDownload 
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg shadow-2xl flex flex-col ${
        isFullscreen 
          ? 'w-full h-full m-0 rounded-none' 
          : 'w-11/12 h-5/6 max-w-6xl max-h-screen m-4'
      }`}>
        {/* Header */}
        <div className="bg-compleo-deep-teal text-white p-4 flex justify-between items-center rounded-t-lg">
          <h2 className="text-xl font-bold truncate">{title}</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={onDownload}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              title="Download PDF"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 bg-gray-100 overflow-hidden rounded-b-lg flex items-center justify-center">
          <div className="text-center p-12">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-compleo-teal to-compleo-deep-teal rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Eye className="h-10 w-10 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-compleo-deep-teal mb-4">
                Open PDF in New Tab
              </h3>
              
              <p className="text-gray-600 mb-6">
                Chrome's security settings prevent inline PDF viewing. Click below to open the PDF in a new tab for the best viewing experience.
              </p>
              
              <div className="space-y-3">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:from-compleo-deep-teal hover:via-compleo-deep-teal hover:to-compleo-teal text-white font-bold py-3 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                >
                  <Eye className="h-5 w-5" />
                  View PDF in New Tab
                </a>
                
                <button
                  onClick={onDownload}
                  className="w-full bg-compleo-yellow hover:bg-compleo-gold text-compleo-deep-teal font-bold py-3 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                >
                  <Download className="h-5 w-5" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;