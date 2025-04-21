import React, {useState} from 'react';
import '../styles/FullScreenImageViewer.css';

interface FullScreenImageViewerProps {
    src: string;
    alt?: string;
}

const FullScreenImageViewer: React.FC<FullScreenImageViewerProps> = ({src, alt = 'Image'}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <img
                src={src}
                alt={alt}
                onClick={() => setIsOpen(true)}
                className="thumbnail"
            />

            {isOpen && (
                <div className="fullscreen-overlay">
                    <button
                        className="close-button"
                        onClick={() => setIsOpen(false)}
                    >
                        ✕
                    </button>
                    <img
                        src={src}
                        alt={alt}
                        className="fullscreen-image"
                    />
                </div>
            )}
        </>
    );
};

export default FullScreenImageViewer;
