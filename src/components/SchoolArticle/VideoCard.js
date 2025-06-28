import styles from './EnhancedMarkdownRenderer.module.css';
import Image from 'next/image';

const VideoCard = ({ title, description, duration, thumbnail }) => (
  <div className={styles.videoCard}>
    <div className={styles.videoThumbnail}>
      {thumbnail && <Image src={thumbnail} alt={title} width={320} height={180} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />}
      <div className={styles.playButton}>▶</div>
    </div>
    <div className={styles.videoContent}>
      <h4 className={styles.videoTitle}>{title}</h4>
      <p className={styles.videoDescription}>{description}</p>
      <span className={styles.videoDuration}>{duration}</span>
    </div>
  </div>
);

export default VideoCard;
export { VideoCard }; 