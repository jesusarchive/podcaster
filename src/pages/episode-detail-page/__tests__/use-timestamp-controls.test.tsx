/* eslint-disable jsx-a11y/media-has-caption */
import { render } from '@testing-library/react';
import React from 'react';

import { useAudioTimestampControls } from '../use-audio-timestamp-controls';

const TestComponent = () => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { addAudioTimestampControls } = useAudioTimestampControls(audioRef);

  return (
    <div>
      <pre
        dangerouslySetInnerHTML={{
          __html: addAudioTimestampControls('test (1:00) test')
        }}
      />
      <audio ref={audioRef} controls>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

describe('useAudioTimestampControls', () => {
  it('should add timestamp controls to text', () => {
    const { container } = render(<TestComponent />);

    expect(container.querySelector('button')).toBeInTheDocument();
    expect(container.querySelector('button')).toHaveTextContent('1:00');
  });

  it('should update audio time on timestamp control click', () => {
    const { container } = render(<TestComponent />);

    const timestampControl = container.querySelectorAll('button')[0] as HTMLButtonElement;
    const audio = container.querySelector('audio') as HTMLAudioElement;

    expect(audio.currentTime).toBe(0);

    timestampControl.click();

    expect(audio.currentTime).toBe(60);
  });
});
