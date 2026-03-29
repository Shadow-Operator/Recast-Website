import { useEffect, useRef, useState } from "react";

interface LoopingVideoProps {
  src: string;
  className?: string;
  poster?: string;
  maxOpacity?: number;
  fadeDuration?: number;
  style?: React.CSSProperties;
}

/**
 * A video that loops seamlessly by fading out before the end
 * and fading back in on restart, masking the hard loop cut.
 */
const LoopingVideo = ({
  src,
  className = "",
  poster,
  maxOpacity = 0.3,
  fadeDuration = 0.8,
  style,
}: LoopingVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(0);
  const fadingOut = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setOpacity(maxOpacity);
    };

    const handleTimeUpdate = () => {
      if (!video.duration || fadingOut.current) return;
      const remaining = video.duration - video.currentTime;
      if (remaining < fadeDuration) {
        fadingOut.current = true;
        setOpacity(0);
      }
    };

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
      setTimeout(() => {
        fadingOut.current = false;
        setOpacity(maxOpacity);
      }, 100);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [maxOpacity, fadeDuration]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      autoPlay
      muted
      playsInline
      poster={poster}
      aria-hidden="true"
      style={{
        ...style,
        opacity,
        transition: `opacity ${fadeDuration}s ease-in-out`,
      }}
    />
  );
};

export default LoopingVideo;
