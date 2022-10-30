import React from 'react'

function getNoteNumberFromKeyInput(key: string): number | undefined {
  switch (key) {
    case 'z':
      return 60
    case 's':
      return 61
    case 'x':
      return 62
    case 'd':
      return 63
    case 'c':
      return 64
    case 'v':
      return 65
    case 'g':
      return 66
    case 'b':
      return 67
    case 'h':
      return 68
    case 'n':
      return 69
    case 'j':
      return 70
    case 'm':
      return 71
    case ',':
    case 'q':
      return 72
    case 'l':
    case '2':
      return 73
    case '.':
    case 'w':
      return 74
    case ';':
    case '3':
      return 75
    case '/':
    case 'e':
      return 76
    case 'r':
      return 77
    case '5':
      return 78
    case 't':
      return 79
    case '6':
      return 80
    case 'y':
      return 81
    case '7':
      return 82
    case 'u':
      return 83
    case 'i':
      return 84
    case '9':
      return 85
    case 'o':
      return 86
    case '0':
      return 87
    case 'p':
      return 88
    case '[':
      return 89
    case '=':
      return 90
    case ']':
      return 91
    default:
      return
  }
}

export default function useKeyboardInput(): [cv: number, gate: boolean] {
  const [currentNote, setCurrentNote] = React.useState<number>()

  React.useEffect(() => {
    let notestack: number[] = []

    function handleKeyDown(event: KeyboardEvent): void {
      const note = getNoteNumberFromKeyInput(event.key)
      if (note !== undefined) {
        notestack = [note, ...notestack.filter(n => n !== note)]
        setCurrentNote(notestack[0])
      }
    }

    function handleKeyUp(event: KeyboardEvent): void {
      const note = getNoteNumberFromKeyInput(event.key)
      if (note !== undefined) {
        notestack = notestack.filter(n => n !== note)
        setCurrentNote(notestack[0])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return [currentNote ?? 60, currentNote !== undefined]
}
