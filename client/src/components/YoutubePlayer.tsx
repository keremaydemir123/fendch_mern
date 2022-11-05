import React from 'react';

function YoutubePlayer({ embedId }: { embedId: string }): React.ReactElement {
  return (
    <div className="overflow-hidden relative px-32 py-32 h-0">
      <iframe
        className="absolute left-0 top-0 h-full w-full"
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

export default YoutubePlayer;
