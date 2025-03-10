import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import React from 'react';
import ReactPlayer from 'react-player';
import { Carousel } from 'react-responsive-carousel';
import { PropTypes } from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import logo from '../images/logo.png';

const DUMMY_VIDEOS = [
    {
        _id: '00',
        videoUrl: 'https://res.cloudinary.com/dufgzutuu/image/upload/v1741600898/1_olgpbv.png'
    },

    {
        _id: '11',
        videoUrl: 'https://res.cloudinary.com/dufgzutuu/video/upload/f_auto:video,q_auto/vkcekehftmbopjelju3h'
    },
    {
        _id: '22',
        videoUrl: 'https://res.cloudinary.com/dufgzutuu/video/upload/f_auto:video,q_auto/gngjcxyxjbzok5xlxjax'
    },
    {
        _id: '33',
        videoUrl: 'https://res.cloudinary.com/dufgzutuu/video/upload/f_auto:video,q_auto/bptcrdypvwcsyncc1reh'
    },
    {
        _id: '44',
        videoUrl: 'https://res.cloudinary.com/dufgzutuu/video/upload/f_auto:video,q_auto/ljyaicqyoug6s0l9kuaf'
    },
    {
        _id: '55',
        videoUrl: 'https://res.cloudinary.com/dufgzutuu/video/upload/f_auto:video,q_auto/se4le6pxl3t59pryzaew'
    },
    {
        _id: '66',
        videoUrl: 'https://res.cloudinary.com/dufgzutuu/video/upload/f_auto:video,q_auto/qtmohffgmynozbmuo012'
    },
    {
        _id: '77',
        videoUrl: 'https://res.cloudinary.com/dufgzutuu/video/upload/f_auto:video,q_auto/mj62i00ptjxzcxbmszbr'
    },
    {
        _id: '88',
        videoUrl: 'https://res.cloudinary.com/dufgzutuu/video/upload/f_auto:video,q_auto/ws6uaaffhmygls3umc69'
    },
    {
        _id: '99',
        videoUrl: 'https://res.cloudinary.com/dufgzutuu/image/upload/f_auto,q_auto/v0riviblmrhh4j9vh3rp'
    },

    {
        _id: '10',
        videoUrl: 'https://res.cloudinary.com/dufgzutuu/image/upload/f_auto,q_auto/yb1ezrzau3mzfucyblsn'
    },
];

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
    },
    carouselWrapper: {
        width: '80vw'
    }
}));

const isVideo = (url) => {
    return url.includes('/video/');
};

const Slide = ({ url, isSelected }) => {
    return isVideo(url) ? (
        <ReactPlayer width="100%" height="80vh" url={url} playing={isSelected} />
    ) : (
        <img src={url} alt="Slide" style={{ width: '100%', height: '80vh', objectFit: 'contain' }} />
    );
};

const CarouselVideo = ({ data }) => {
    const classes = useStyles();

    const customRenderItem = (item, props) => (
        <item.type {...item.props} {...props} />
    );

    const videoThumbnail = logo;

    const customRenderThumb = children =>
        children.map(item => (
            <img key={item.props.url} src={videoThumbnail} alt="Video Thumbnail" />
        ));

    return (
        < div style={{ background: 'black' }} >
            <div style={{ maxWidth: '800px', justifyContent: 'center', margin: '0 auto', padding:'5px' }}>
                <p style={{
                    textAlign: 'center',
                    fontSize: '9vh',
                    margin: '0',
                    padding: '0',
                    fontWeight: '600',
                    color: 'yellow',
                    fontFamily: '"Chakra Petch", sans-serif'
                }}>
                    Gorevler Tips
                </p>

                <p
                    style={{
                        textAlign: 'center',
                        margin: '0',
                        padding: '0',
                        fontWeight: '600',
                        color: 'yellow',
                        fontFamily: '"Chakra Petch", sans-serif'
                    }}>

                    "Gorevler" is a Turkish word that means "tasks" or "duties."

                    It comes from "görev," which means "duty" or "task," and "-ler," which is a plural suffix in Turkish. So, "görevler" translates to "tasks" or "responsibilities."
                </p>

                <br/>


                <p
                    style={{
                        textAlign: 'center',
                        margin: '0',
                        padding: '0',
                        fontWeight: '600',
                        color: 'white',
                        fontFamily: '"Chakra Petch", sans-serif'
                    }}>

                   Go through the below guide to use Gorevler to maximise your productivity.
                </p>

            </div>
            <div className={classes.container}>
                <div className={classes.carouselWrapper}>
                    <Carousel
                        autoPlay={false}
                        emulateTouch={true}
                        showArrows={true}
                        showThumbs={false}
                        showStatus={false}
                        infiniteLoop={true}
                        renderItem={customRenderItem}
                        renderThumbs={customRenderThumb}
                    >
                        {data.map(v => (
                            <Slide
                                url={v.videoUrl}
                                muted
                                playing={false}
                                key={v._id ? v._id : v.id}
                            />
                        ))}
                    </Carousel>
                </div>
            </div>


<div style={{ 
  paddingBottom: '2%', 
  width: '100%', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 

}}>

        <a href="/" className="goreveler-btn" rel="noopener noreferrer">
          Go to GoRevler
        </a>
</div>
 
            
        </div >
    );
};

Slide.propTypes = {
    url: PropTypes.string,
    isSelected: PropTypes.bool
};

CarouselVideo.propTypes = {
    data: PropTypes.array
};

CarouselVideo.defaultProps = {
    data: DUMMY_VIDEOS
};

export default CarouselVideo;