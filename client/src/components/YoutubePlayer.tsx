import React from 'react';

function YoutubePlayer({ embedId }: { embedId: string }): React.ReactElement {
  return (
    <div className="overflow-hidden relative h-full w-full flex justify-center">
      <iframe
        width="600"
        height="400"
        src={`https://www.youtube.com/embed/${embedId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

export default YoutubePlayer;
