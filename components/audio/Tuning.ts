export const CONCERT_A = 440

export function midiNumberToFrequency(n: number): number {
  return CONCERT_A * 2 ** ((n - 69) / 12)
}

export function midiNumberToLetterName(n: number): string {
  switch (n % 12) {
    case 0:
      return 'C'
    case 1:
      return 'C#/Db'
    case 2:
      return 'D'
    case 3:
      return 'D#/Eb'
    case 4:
      return 'E'
    case 5:
      return 'F'
    case 6:
      return 'F#/Gb'
    case 7:
      return 'G'
    case 8:
      return 'G#/Ab'
    case 9:
      return 'A'
    case 10:
      return 'A#/Bb'
    case 11:
      return 'B'
    default:
      return '?'
  }
}

export function midiNumberToString(n: number): string {
  const octave = Math.floor(n / 12) - 1
  return `${midiNumberToLetterName(n)}${octave}`
}
