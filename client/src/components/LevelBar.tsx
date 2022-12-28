import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function LevelBar() {
  return (
    <div style={{ width: 60, height: 60 }}>
      <CircularProgressbarWithChildren
        value={66}
        styles={{
          path: {
            stroke: '#3ab7bf',
          },
          trail: {
            stroke: '#d6d6d6',
          },
        }}
      >
        <h4>1</h4>
        <div style={{ fontSize: 10, marginTop: -3 }}>
          <strong>Level</strong>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}

export default LevelBar;
