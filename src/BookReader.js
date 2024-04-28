import React, { useState, useEffect, useRef } from 'react';
import './BookReader.css';
import audioFile from './assets/audios/part1.mp3';


function BookReader() {
    const [coverOpen, setCoverOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        if (currentPage === 1) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;  // Optionally reset the audio to start when revisiting the page
        }
    }, [currentPage]);

    const toggleCover = () => {
        setCoverOpen(!coverOpen);
        if (!coverOpen) {
            setCurrentPage(1); // Set to page 1 when cover opens
        } else {
            setCurrentPage(0); // Set to page 0 when cover closes
        }
    };

    const nextPage = () => {
        if (currentPage < 3) {
            setCurrentPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            setCoverOpen(false); // Close the book when going back from page 1
            setCurrentPage(0); // Set to page 0 when closing the book
        }
    };

    return (
        <div className="container">
      <div className="navigation">
        <a target="_blank" href="https://docs.google.com/presentation/d/1RQza8F3kC67YcNs0sHWcpmin5xsupUblAL0pwnyDoNc/edit#slide=id.g1f80585eaed_0_108">Workbook</a>
      </div>
        <div className="book-reader">
            <audio ref={audioRef} src={audioFile} preload="auto"></audio>
            <input type="checkbox" id="checkbox-cover" checked={coverOpen} readOnly />
            <input type="checkbox" id="checkbox-page1" checked={currentPage >= 1} readOnly />
            <input type="checkbox" id="checkbox-page2" checked={currentPage >= 2} readOnly />
            <input type="checkbox" id="checkbox-page3" checked={currentPage >= 3} readOnly />
            <div className={`book ${coverOpen ? "translate" : ""}`}>
                <div className={`cover ${coverOpen ? "rotate" : ""}`}>
                    <label onClick={toggleCover}></label>
                </div>
                <div className={`page ${currentPage >= 1 ? "rotate" : ""}`} id="page1">
                    <div className="back-page">
                        <div className="page-content">
                            <h2>Page 1</h2>
                            <p>The year was 2050, and the AI revolution had ground to a halt. Lena, a brilliant AI researcher, stared at her computer in disbelief as the dreaded alert flashed across her screen – the AI Data Shortage Alert System had just informed her that her team's language model was perilously low on textual training data.</p>
                            <label className="prev" onClick={previousPage}><i className="fas fa-chevron-left"></i></label>
                        </div>
                    </div>
                </div>
                <div className={`page ${currentPage >= 2 ? "rotate" : ""}`} id="page2">
                    <div className="front-page">
                        <div className="page-content">
                            <h2>Page 2</h2>
                            {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p> */}
                            <label className="next" onClick={nextPage}><i className="fas fa-chevron-right"></i></label>
                        </div>
                    </div>
                    <div className="back-page">
                        <div className="page-content">
                            <h2>Page 3</h2>
                            <label className="prev" onClick={previousPage}><i className="fas fa-chevron-left"></i></label>
                        </div>
                    </div>
                </div>
                <div className={`page ${currentPage >= 3 ? "rotate" : ""}`} id="page3">
                    <div className="front-page">
                        <div className="page-content">
                            <h2>Page 4</h2>
                            {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p> */}
                        </div>
                    </div>
                </div>
                <div className="back-cover"></div>
            </div>
        </div>
        </div>
    );
}

export default BookReader;