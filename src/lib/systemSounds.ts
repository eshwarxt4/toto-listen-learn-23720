// System sounds configuration
// These sounds are stored in the public folder

export type SystemSoundName = 'welcome' | 'well_done' | 'try_again' | 'goodbye';

export const SYSTEM_SOUNDS: Record<SystemSoundName, { displayName: string; path: string }> = {
  welcome: {
    displayName: 'Welcome to Toto Learning!',
    path: '/sounds/welcome.mp3',
  },
  well_done: {
    displayName: 'Well done!',
    path: '/sounds/well_done.mp3',
  },
  try_again: {
    displayName: 'Try again.',
    path: '/sounds/try_again.mp3',
  },
  goodbye: {
    displayName: 'Goodbye!',
    path: '/sounds/goodbye.mp3',
  },
};

/**
 * Get the path to a system sound file
 */
export function getSystemSoundPath(name: SystemSoundName): string {
  return SYSTEM_SOUNDS[name].path;
}

/**
 * Play a system sound
 */
export function playSystemSound(name: SystemSoundName): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(SYSTEM_SOUNDS[name].path);
    audio.onended = () => resolve();
    audio.onerror = () => reject(new Error(`Failed to play system sound: ${name}`));
    audio.play().catch(reject);
  });
}

