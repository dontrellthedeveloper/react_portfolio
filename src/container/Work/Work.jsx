import React, {useState, useEffect} from 'react';
import {AiFillChrome, AiFillEye, AiFillGithub, AiOutlineLink} from "react-icons/ai";

import {motion} from 'framer-motion';

import {AppWrap, MotionWrap} from '../../wrapper'
import {urlFor, client} from '../../client';

import './Work.scss';
import {Link} from "react-router-dom";
import {TbListDetails} from "react-icons/tb";

import Tilt from "react-tilt";
import { fadeIn } from "../../utils/motion";

const Work = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [animateCard, setAnimateCard] = useState({y: 0, opacity: 1});
    const [works, setWorks] = useState([]);
    const [filterWork, setFilterWork] = useState([]);

    useEffect(() => {
        const query = '*[_type == "works"] | order(order asc)';

        client.fetch(query)
            .then((data) => {
                setWorks(data)
                setFilterWork(data)
            })
    },[])


    const handleWorkFilter = (item) => {
        setActiveFilter(item)
        setAnimateCard([{y:100,opacity:0}])

        setTimeout(() => {
            setAnimateCard([{y:0,opacity:1}])

            if(item === 'All') {
                setFilterWork(works);
            } else {
                setFilterWork(works.filter((work) => work.tags.includes(item)))
            }
        }, 500)
    }

    return (
        <div style={{maxWidth: '1400px'}}>
            <h2 className="head-text">My <span>Portfolio</span></h2>

            <div className='app__work-filter'>
                {['All', 'Full-Stack','React JS','Next JS', 'Node API', 'AWS','Shopify','MongoDB' ,'SQL','Sanity.io', ].map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleWorkFilter(item)}
                        className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active': ''}`}
                    >
                        {item}
                    </div>
                ))}
            </div>

            <motion.div
                animate={animateCard}
                transition={{duration: 0.5, delayChildren: 0.5}}
                className='app__work-portfolio'
            >
                {filterWork.map((work, index) => (

                    // <Tilt
                    //     options={{
                    //         max: 25,
                    //         scale: 1,
                    //         speed: 250,
                    //     }}
                    //     className='xs:w-[250px] w-full'>

                        <motion.div
                            variants={fadeIn("right", "spring", index * 0.5, 0.75)}
                        >

                        <div className='app__work-item app__flex' key={index} >

                            <Link to={'/' + work.slug.current}>
                                <div className='app__work-img app__flex'>

                                    <img src={urlFor(work.imgUrl)} alt={work.name} />

                                    <motion.div
                                        whileHover={{opacity: [0,1]}}
                                        transition={{duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5}}
                                        className='app__work-hover app__flex'
                                    >
                                        {work.codeLink && (
                                        <a href={work.codeLink} target='_blank' rel="noreferrer">
                                            <motion.div
                                                whileInView={{scale: [0, 1]}}
                                                whileHover={{scale: [1,0.9]}}
                                                transition={{duration: 0.25}}
                                                className='app__flex'
                                            >
                                                <TbListDetails/>
                                            </motion.div>
                                        </a>
                                        )}
                                    </motion.div>
                                </div>

                            </Link>


                            <div className='app__work-content app__flex'>


                                <Link to={'/' + work.slug.current} style={{textDecoration: 'none'}}>
                                <h4 className='bold-text'>{work.title}</h4>
                                </Link>

                                <Link to={'/' + work.slug.current} style={{textDecoration: 'none'}}>
                                <p className='p-text' style={{marginTop: 10, textAlign: "center"}}>{work.description}
                                </p>
                                </Link>
                                {/*<Link to={'/' + work.slug.current}>*/}
                                {/*    <button className='p-text'>*/}
                                {/*        <p style={{textAlign: "center"}}>Details</p>*/}

                                {/*    </button>*/}
                                {/*</Link>*/}

                                <div className='app__flex'>
                                    <a href={work.projectLink} target='_blank' rel="noreferrer"><div className='app__flex work__mobile-links'><AiFillChrome className='work__mobile-link-svg'/></div></a>
                                    <a href={work.codeLink} target='_blank' rel="noreferrer"><div className='app__flex work__mobile-links'><AiFillGithub className='work__mobile-link-svg'/></div></a>
                                </div>

                                <div className='app__work-tag2 app__flex'>
                                    <Link to={'/' + work.slug.current} style={{textDecoration: 'none', fontWeight: '900'}} >
                                    <p className='p-text'>{work.tags[0]}</p>
                                    </Link>
                                </div>


                                <div className='app__work-tag app__flex'>
                                    <Link to={'/' + work.slug.current} style={{textDecoration: 'none', fontWeight: '900'}}>
                                    <p className='p-text'>Click for Details</p>
                                    </Link>
                                </div>

                            </div>
                        </div>
                        </motion.div>
                    //
                    // </Tilt>

                ))}
            </motion.div>
        </div>
    );
};

export default AppWrap(
    MotionWrap(Work, 'app__works'),
    'work',
    'app__primarybg '
);
