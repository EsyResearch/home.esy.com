import styles from './EnhancedMarkdownRenderer.module.css';

const VideoCard = ({ title, description, duration, thumbnail }) => (
  <div className={styles.videoCard}>
    <div className={styles.videoThumbnail}>
      {thumbnail && <img src={thumbnail} alt={title} />}
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