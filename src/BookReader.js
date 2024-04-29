import React, { useState, useEffect, useRef } from 'react';
import './BookReader.css';
import audioFile1 from './assets/audios/part1.mp3';
import audioFile2 from './assets/audios/part2.mp3';
import audioFile3 from './assets/audios/part3.mp3';
import audioFile4 from './assets/audios/part4.mp3';
import audioFile5 from './assets/audios/part5.mp3';

import tooltipImage from './assets/images/artifact1.png';
import tooltipImage1 from './assets/images/artifact2.jpg';
import tooltipImage2 from './assets/images/artifact3.jpeg';
import videocover from './assets/images/video.mp4';

import dividerImage from './assets/images/divider.png';


function BookReader() {
    const [coverOpen, setCoverOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const audioRef1 = useRef(null);
    const audioRef2 = useRef(null);
    const audioRef3 = useRef(null);
    const audioRef4 = useRef(null);
    const audioRef5 = useRef(null);
    const [isMuted, setIsMuted] = useState(false);


    const [showMore, setShowMore] = useState(false);
    const [showMore1, setShowMore1] = useState(false);
    const [showMore2, setShowMore2] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const toggleShowMore1 = () => {
        setShowMore1(!showMore1);
    };

    const toggleShowMore2 = () => {
        setShowMore2(!showMore2);
    };


    useEffect(() => {
        [audioRef1, audioRef2, audioRef3, audioRef4, audioRef5].forEach(ref => {
            if (ref.current) {
                ref.current.pause();
                ref.current.currentTime = 0;
            }
        });

        if (currentPage >= 1 && currentPage <= 5) {
            const currentRef = [audioRef1, audioRef2, audioRef3, audioRef4, audioRef5][currentPage - 1];
            if (currentRef.current) {
                currentRef.current.play();
            }
        }
    }, [currentPage]);

    const toggleMute = () => {
        const newMutedStatus = !isMuted;
        setIsMuted(newMutedStatus);
        [audioRef1, audioRef2, audioRef3, audioRef4, audioRef5].forEach(ref => {
            if (ref.current) {
                ref.current.muted = newMutedStatus;
            }
        });
    };



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

    const handleWorkbookRedirect = () => {
        window.open('https://docs.google.com/presentation/d/1RQza8F3kC67YcNs0sHWcpmin5xsupUblAL0pwnyDoNc/edit#slide=id.g1f80585eaed_0_108', '_blank');
    };

    return (
        <div className="container">
            <h1 className='main-title'>Design Fiction</h1>
            <h1 className='main-title sub-title'>Stephanie Kim, Amin El Asery</h1>
            <h1 className='main-title sub-title caption'>*For a better experience, please use Chrome or Firefox</h1>
            <div className={`helper ${coverOpen ? 'fade-out' : 'fade-in'}`}>
                <span>Click to Explore</span>
                <i className="fas fa-arrow-down bouncing-arrow"></i>
            </div>


            <div className="navigation">
                <button className="workbookbutton" onClick={handleWorkbookRedirect}>
                    Workbook
                </button>
                <button className="sound-button" onClick={toggleMute}>
                    <i className={`fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'}`}></i>
                </button>

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
                        <video autoPlay loop muted playsInline className="cover-video">
                            <source src={videocover} type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
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
                                            <img src={tooltipImage1} alt="Tooltip Image" />
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
                                <p>Protest groups like the Atlanta Coalition for the Displaced have pushed back,
                                    <span className="tooltip"> distributing flyers around boarded up homes advertising
                                        <span className="tooltiptext">
                                            <img src={tooltipImage2} alt="Tooltip Image" />
                                        </span>
                                    </span>

                                    support for those displaced by "sacrificing human residents to feed the AI."</p>
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
                    <div className="back-cover">
                        <video autoPlay loop muted playsInline className="cover-video">
                            <source src={videocover} type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    </div>


                </div>
            </div>
            <div className="content-title">
                <h1>Design Idea / Artifact Research</h1>
                <p>Our initial design idea was centered around a future normalizing human-AI marriages and the legality around that process, particularly in the context of the idiosyncrasies of the dating scene within the city of Atlanta. In our early ideation and artifact development, we imagined that the anecdotally reported “dating crisis” in Atlanta would be ameliorated by the introduction of AI as romantic partners and spouses. However, what this contends for the legal process of cementing AI as romantic partners and spouses is less clear. The initial design artifacts were to be a “manila folder” of required documents when a spouse is filing for U.S. citizenship through marriage, such as proof of relationship (i.e. a scrapbook of relationship photos), proof of joint residence (what would such a housing document look like?), etc. </p>
                {!showMore && (
                    <button className="toggle-button" onClick={toggleShowMore}>
                        Show More
                    </button>
                )}
                {showMore && (
                    <div>
                        <p>After our in-class presentation, through team discussion and our critique session with the TAs, we concluded that this idea felt too creatively finite and not attuned enough to how AI integrates into the city of Atlanta, specifically. Human-AI marriage is a vast domain that does not have unique ties to the Atlanta dating scene, and generates rather predictable artifacts, which was feedback received from our critique. The more compelling dimension of this initial idea has to do with AI’s rights – what sorts of privileges or rights is AI entitled to in this future? Do they model after human rights, or does AI develop and receive their own doctrine?</p>
                        <p>Around this time, we also both listened to a podcast episode from The Daily, the New York Times’s flagship podcast, on AI’s “original sin”. In the episode, they introduce a specific dilemma surrounding how AI models are trained. Current models are only able to reach their current quality through consuming massive volumes of data – data that is rapidly becoming scarce, as these models are in fact consuming nearly everything the Internet has to offer. Companies face the ethical dilemma of finding other data sources for its models to feed upon. This is also requiring the construction of equally gargantuan data centers that run the servers upon which these models run. Taken together with our new focus on AI rights, we instead chose to construct a future scenario wherein the construction of data centers has run out of control, since AI model usage has grown to be ubiquitous and thus extremely resource-intensive.. Atlantans face a housing crisis due to the need for real estate for AI data centers, compounded by rampant data mining to feed these data centers.
                        </p>
                        <p>In researching artifact development, we drew inspiration from a confluence of factors. We looked at fictional and non-fictional examples of economies built around resource scarcity, namely the Mortal Engines book and offshore drilling, respectively. In both examples, we abstract the notion of a form of zero-sum displacement where one community’s success is necessarily at the direct expense and displacement of another. Seeing this as a central theme, our future scenario incorporates this as an underlying tension. Locally, Atlanta’s urban history is rife with racial and socioeconomic division that has contributed to its modern-day gentrification, heavy construction, and rapid urban development. While some of this development is revamping infrastructure, others propound consumerism, such as the new entertainment district slated to be constructed in downtown ATL. Still others advance urban militarization, particularly the well-known Cop City, which has come under intense and inflammatory criticism from protest movements such as Stop Cop City. We find the mixed reactions to Atlanta’s urban development trajectory, as well as Atlanta’s history as a linchpin of social movements, to be a sensible focal point of our artifacts. We develop an anti-data center expansion movement as an element of the world of our artifacts.</p>
                        <button className="toggle-button" onClick={toggleShowMore}>
                            Show Less
                        </button>
                    </div>
                )}

            </div>

            <div className="content-title">
                <h1>Design Process</h1>
                <p>Our design process was ideation-heavy, as we found settlement upon a compelling, cohesive design fiction to be the primary challenge rather than the artifacts themselves. In other worlds, the worldbuilding was our focus for the majority of the design process, with the artifacts being the natural byproducts of the fleshed-out world(s). In addition to the human-AI marriage idea, we iterated between several other ideas within the AI rights movement in discussion (including drafting an AI rights “Geneva Convention”, imagining an AI agent on trial) prior to settling upon this concept.</p>
                {!showMore1 && (
                    <button className="toggle-button" onClick={toggleShowMore1}>
                        Show More
                    </button>
                )}
                {showMore1 && (
                    <div>
                        <p>The choice of medium was also an important consideration for our scenario. We chose to limit the fictional aspect of our design fiction to our worldbuilding and keep mediums relatively conventional. After all, the form of social movements has remained steadfast throughout the years: maintaining networks of communication, whether through the news, papers, or nowadays social media, has always been its bedrock. We imagine that our design fiction scenario would leverage social media much the way the world currently does. Likewise, it is not as if the fast-growing ubiquity of AI has suddenly overturned basic pen-and-paper communication within the government. Eviction notices are still taped to doors; filing taxes is still attached to paper forms. It is not farfetched to think Atlantans in 2049 will still be receiving physical communications, especially from the U.S. government. Altogether, this motivates the form factors of our final artifacts.
                        </p>
                        <button className="toggle-button" onClick={toggleShowMore1}>
                            Show Less
                        </button>
                    </div>
                )}

            </div>

            <div className="content-title">
                <h1>Final Design Artifacts</h1>
                <p>We developed three final design artifacts, situated in the year 2049.</p>
                <h2>Artifact #1: Eminent Domain Letter</h2>
                <p>This letter from the City of Atlanta is a general-purpose letter sent to all residences within the city that are due to be seized by the government for use as data center real estate. We encourage special attention to the location of the residential address and ambiguity of the request.</p>
                {!showMore2 && (
                    <button className="toggle-button" onClick={toggleShowMore2}>
                        Show More
                    </button>
                )}
                {showMore2 && (
                    <div>
                        <h2>Artifact #2: AI Advocacy Group Instagram Posts</h2>
                        <p>Atlanta Against AI Hunger is an advocacy group supporting the expansion of data centers through opposition to “AI Hunger”, i.e. starving AI models of data. The movement views data mining as an inevitable outcome of dependency on AI model usage and encourages residents of Atlanta to cooperate with rather than resist the directive. </p>
                        <h2>Artifact #3: Flyer for Shelter for Individuals Evicted by Data Center Expansion</h2>
                        <p>Flyers circulate across social media and messaging about safe haven shelters in Atlanta for individuals who have been permanently displaced by the expansion, e.g. due to forceful possession of their homes. These shelters are primarily operated by local non-profit organizations and chapters of national organizations.</p>

                        <button className="toggle-button" onClick={toggleShowMore2}>
                            Show Less
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}

export default BookReader;