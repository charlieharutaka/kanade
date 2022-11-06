import * as Tone from 'tone'

export default class KeyboardMidiInput {
  static getMidiNumberFromKeyInput = (key: string): number | undefined => {
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

  note = new Tone.Signal<'frequency'>()
  gate = new Tone.Signal<'gain'>()

  #listenerTarget: Node
  #noteStack: number[]

  constructor(listenerTarget: Node = document) {
    this.#listenerTarget = listenerTarget
    this.#noteStack = []
  }

  addEventListeners = (): void => (
    this.#listenerTarget.addEventListener('keydown', this.#handleKeyDown as EventListener),
    this.#listenerTarget.addEventListener('keyup', this.#handleKeyUp as EventListener)
  )

  removeEventListeners = (): void => (
    this.#listenerTarget.removeEventListener('keydown', this.#handleKeyDown as EventListener),
    this.#listenerTarget.removeEventListener('keyup', this.#handleKeyUp as EventListener)
  )

  #handleKeyDown = (event: KeyboardEvent): void => {
    if (!event.repeat) {
      const note = KeyboardMidiInput.getMidiNumberFromKeyInput(event.key)
      if (note !== undefined) {
        this.#noteStack = [note, ...this.#noteStack.filter(n => n !== note)]
        this.#updateNoteAndGate()
      }
    }
  }

  #handleKeyUp = (event: KeyboardEvent): void => {
    if (!event.repeat) {
      const note = KeyboardMidiInput.getMidiNumberFromKeyInput(event.key)
      if (note !== undefined) {
        this.#noteStack = this.#noteStack.filter(n => n !== note)
        this.#updateNoteAndGate()
      }
    }
  }

  #updateNoteAndGate = (): void => {
    this.note.value = this.#noteStack[0] ? Tone.Frequency(this.#noteStack[0], 'midi').toFrequency() : this.note.value
    this.gate.value = this.#noteStack[0] ? 1 : 0
  }
}
