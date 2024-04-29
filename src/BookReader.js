import React, { useState, useEffect, useRef } from 'react';
import './BookReader.css';
import audioFile1 from './assets/audios/part1.mp3';
import audioFile2 from './assets/audios/part2.mp3';
import audioFile3 from './assets/audios/part3.mp3';
import audioFile4 from './assets/audios/part4.mp3';
import audioFile5 from './assets/audios/part5.mp3';

import tooltipImage from './assets/images/artifact1.jpg';
import dividerImage from './assets/images/divider.png';


function BookReader() {
    const [coverOpen, setCoverOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const audioRef1 = useRef(null);
    const audioRef2 = useRef(null);
    const audioRef3 = useRef(null);
    const audioRef4 = useRef(null);
    const audioRef5 = useRef(null);


    useEffect(() => {
        // Stop all audios first
        [audioRef1, audioRef2, audioRef3, audioRef4, audioRef5].forEach(ref => {
            ref.current.pause();
            ref.current.currentTime = 0;
        });

        // Play the appropriate audio based on currentPage
        if (currentPage === 1) {
            audioRef1.current.play();
        } else if (currentPage === 2) {
            audioRef2.current.play();
        } else if (currentPage === 3) {
            audioRef3.current.play();
        } else if (currentPage === 4) {
            audioRef4.current.play();
        } else if (currentPage === 5) {
            audioRef5.current.play();
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
        if (currentPage < 6) {
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
                <audio ref={audioRef1} src={audioFile1} preload="auto"></audio>
                <audio ref={audioRef2} src={audioFile2} preload="auto"></audio>
                <audio ref={audioRef3} src={audioFile3} preload="auto"></audio>
                <audio ref={audioRef4} src={audioFile4} preload="auto"></audio>
                <audio ref={audioRef5} src={audioFile5} preload="auto"></audio>
                <input type="checkbox" id="checkbox-cover" checked={coverOpen} readOnly />
                <input type="checkbox" id="checkbox-page1" checked={currentPage >= 1} readOnly />
                <input type="checkbox" id="checkbox-page2" checked={currentPage >= 2} readOnly />
                <input type="checkbox" id="checkbox-page3" checked={currentPage >= 3} readOnly />
                <input type="checkbox" id="checkbox-page4" checked={currentPage >= 4} readOnly />
                <input type="checkbox" id="checkbox-page5" checked={currentPage >= 5} readOnly />
                <input type="checkbox" id="checkbox-page6" checked={currentPage >= 6} readOnly />

                <div className={`book ${coverOpen ? "translate" : ""}`}>
                    <div className={`cover ${coverOpen ? "rotate" : ""}`}>
                        <label onClick={toggleCover}></label>
                    </div>
                    <div className={`page ${currentPage >= 1 ? "rotate" : ""}`} id="page1">
                        <div className="back-page">
                            <div className="page-content">
                                <div className='chapter1'>
                                <h2>Chapter 1</h2>
                                <img src={dividerImage} alt="Divider" className="divider-image" />

                                <p>By 2049, AI Development Hits Crisis Point in Atlanta.
                                </p>
                                </div>
                                
                                <label className="prev" onClick={previousPage}><i className="fas fa-chevron-left"></i></label>
                                <span className="page-number">1</span>

                            </div>
                        </div>
                    </div>
                    <div className={`page ${currentPage >= 2 ? "rotate" : ""}`} id="page2">
                        <div className="front-page">
                            <div className="page-content">
                                <h2>**</h2>
                                <p>The future of AI is at risk due to a severe shortage of training data, threatening to stop progress. Dr. Samantha Richards at Georgia Tech alerted the community this week after discovering her team's language model critically low on textual data.</p>
                                <label className="next" onClick={nextPage}><i className="fas fa-chevron-right"></i></label>
                                <span className="page-number">2</span>
                            </div>
                        </div>
                        <div className="back-page">
                            <div className="page-content">
                                <h2>**</h2>
                                <p>"We were working on a cutting-edge conversational AI when we got the alert no researcher wants to see," said Dr. Richards. "Without a continuous stream of new data to learn from, an AI's capabilities become limited very quickly."</p>
                                <label className="prev" onClick={previousPage}><i className="fas fa-chevron-left"></i></label>
                                <span className="page-number">3</span>
                            </div>
                        </div>
                    </div>

                    <div className={`page ${currentPage >= 3 ? "rotate" : ""}`} id="page3">
                        <div className="front-page">
                            <div className="page-content">
                                <h2>**</h2>
                                <p>In a controversial move, Dr. Richards has rolled out a city-wide campaign imploring Atlantans to donate their emails, social media data, and private messages to "Feed the AI." Posters with the slogan have blanketed the metro area.</p>
                                <label className="next" onClick={nextPage}><i className="fas fa-chevron-right"></i></label>
                                <span className="page-number">4</span>
                            </div>
                        </div>
                        <div className="back-page">
                            <div className="page-content">
                                <h2>**</h2>
                                <p>The donation drive is being strongly backed by the activist group
                                     <span className="tooltip">Atlanta Against AI Hunger, who have taken to the streets and social media
                                        <span className="tooltiptext">
                                            <img src={tooltipImage} alt="Tooltip Image" />

                                        </span>
                                    </span>
                                    to rally support. "Starving our AI is starving our future," said group spokeswoman Jillian Hayes at a protest last week.
                                </p>                                <label className="prev" onClick={previousPage}><i className="fas fa-chevron-left"></i></label>
                                <span className="page-number">5</span>

                            </div>
                        </div>
                    </div>

                    <div className={`page ${currentPage >= 4 ? "rotate" : ""}`} id="page4">
                        <div className="front-page">
                            <div className="page-content">
                                <h2>**</h2>
                                <p>However, the campaign has inflamed tensions with 
                                    <span className="tooltip">residents being forced from their homes by eminent domain 
                                        <span className="tooltiptext">
                                            <img src={tooltipImage} alt="Tooltip Image" />
                                        </span>
                                    </span>
                                    
                                    to make way for the construction of massive new data centers required to process the flood of incoming data.</p>
                                <label className="next" onClick={nextPage}><i className="fas fa-chevron-right"></i></label>
                                <span className="page-number">6</span>

                            </div>
                        </div>
                        <div className="back-page">
                            <div className="page-content">
                                <h2>**</h2>
                                <p>The Hendersons of East Atlanta received a notice last month informing them their property was being seized for "AI infrastructure of paramount civic importance."  </p>
                                <label className="prev" onClick={previousPage}><i className="fas fa-chevron-left"></i></label>
                                <span className="page-number">7</span>

                            </div>
                        </div>
                    </div>

                    <div className={`page ${currentPage >= 5 ? "rotate" : ""}`} id="page5">
                        <div className="front-page">
                            <div className="page-content">
                                <h2>**</h2>
                                <p>"We've lived in this house for 30 years. How is kicking us out to feed some machines more important than our lives?" asked Mrs. Henderson through tears.</p>
                                <label className="next" onClick={nextPage}><i className="fas fa-chevron-right"></i></label>
                                <span className="page-number">8</span>

                            </div>
                        </div>
                        <div className="back-page">
                            <div className="page-content">
                                <h2>**</h2>
                                <p>Protest groups like the Atlanta Coalition for the Displaced have pushed back, distributing flyers around boarded up homes advertising support for those displaced by "sacrificing human residents to feed the AI."</p>
                                <label className="prev" onClick={previousPage}><i className="fas fa-chevron-left"></i></label>
                                <span className="page-number">9</span>

                            </div>
                        </div>
                    </div>

                    <div className={`page ${currentPage >= 6 ? "rotate" : ""}`} id="page6">
                        <div className="front-page">
                            <div className="page-content">
                                <h2>**</h2>
                                <p>As data centers sprawl outward and the backlash intensifies, it remains to be seen if Atlanta's civic leaders can resolve what has become an intractable standoff between AI progress and residents' rights.</p>
                                <span className="page-number">10</span>

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