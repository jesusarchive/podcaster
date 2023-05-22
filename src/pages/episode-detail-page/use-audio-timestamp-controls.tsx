import { useEffect } from 'react';

import { hmsToSeconds } from '@/utils/date';

const timestampControlClassName = 'timestamp-control';

// add timestamp control buttons to text
function addAudioTimestampControls(text: string): string {
  const timestampRegex = /(\d{1,2}:)?\d{1,2}:\d{2}/g;

  return text.replace(
    timestampRegex,
    (match) => `<button class=${timestampControlClassName} value=${match}>${match}</button>`
  );
}

/**
 * Use audio timestamp controls custom hook
 *
 * Adds timestamp control buttons to text and sets audio player's current time to timestamp control button's value.
 */
export function useAudioTimestampControls(audioRef: React.RefObject<HTMLAudioElement>): {
  addAudioTimestampControls: (text: string) => string;
} {
  useEffect(() => {
    const timestampControls = document.querySelectorAll(
      `.${timestampControlClassName}`
    ) as NodeListOf<HTMLButtonElement>;

    const handlers = [];

    timestampControls.forEach((timestampControl) => {
      // set audio player's current time to timestamp control button's value
      const onAudioTimestampControlClick = () => {
        audioRef.current.currentTime = hmsToSeconds(timestampControl.value);
      };
      // add click event listener to timestamp control buttons
      timestampControl.addEventListener('click', onAudioTimestampControlClick);
      // push the event handler to handlers array
      handlers.push(onAudioTimestampControlClick);
    });

    return () => {
      // remove event linsteners
      timestampControls.forEach((timestampControl, index) => {
        timestampControl.removeEventListener('click', handlers[index]);
      });
    };
  }, []);

  return { addAudioTimestampControls };
}
