declare module "@mux/mux-player-react" {
  import { ComponentType } from "react";

  interface MuxPlayerProps {
    playbackId?: string;
    metadata?: Record<string, string>;
    poster?: string;
    accentColor?: string;
    primaryColor?: string;
    secondaryColor?: string;
    className?: string;
    streamType?: string;
    defaultHiddenCaptions?: boolean;
    playbackRates?: number[];
    forwardSeekOffset?: number;
    backwardSeekOffset?: number;
    style?: React.CSSProperties;
    [key: string]: unknown;
  }

  const MuxPlayer: ComponentType<MuxPlayerProps>;
  export default MuxPlayer;
}
