import type * as Tone from 'tone'

type ToneGraphNodes = Map<
  Tone.InputNode,
  {
    incoming: Tone.InputNode[]
    outgoing: Tone.InputNode[]
  }
>

export default class ToneGraph {
  #nodes: Set<Tone.InputNode>
  #forwardAdjacencyList: Map<Tone.InputNode, Set<Tone.InputNode>>
  #reverseAdjacencyList: Map<Tone.InputNode, Set<Tone.InputNode>>

  #log = (msg: string, level: 'log' | 'warn' | 'error' = 'log'): void => console[level](`[TONEGRAPH]: ${msg}`)

  constructor() {
    this.#nodes = new Set()
    this.#forwardAdjacencyList = new Map()
    this.#reverseAdjacencyList = new Map()
  }

  /**
   * List of nodes currently registered in the graph and their connections
   */
  get nodes(): ToneGraphNodes {
    return new Map(
      [...this.#nodes].map(node => [
        node,
        {
          incoming: [...(this.#reverseAdjacencyList.get(node) ?? [])],
          outgoing: [...(this.#forwardAdjacencyList.get(node) ?? [])],
        },
      ]),
    )
  }

  /**
   * Tests for the presence of a node in the graph
   * @param {Tone.InputNode} node the node to check for in the graph
   * @return {boolean} indicates whether the specified node has been added to the graph
   */
  has = (node: Tone.InputNode): boolean => this.#nodes.has(node)

  /**
   * Adds a node to the graph. Does not connect it to any other node.
   * @param {Tone.InputNode} node the node to add into the graph
   * @return {boolean} indicates whether the specified node was new and has been added to the graph
   */
  add = (node: Tone.InputNode): boolean => {
    if (this.has(node)) {
      this.#log(`Node (${node}) has already been added to the graph.`)
      return false
    } else {
      this.#nodes.add(node)
      this.#forwardAdjacencyList.set(node, new Set())
      this.#reverseAdjacencyList.set(node, new Set())
      return true
    }
  }

  /**
   * Deletes a node from the graph only if it is not referenced by any other node.
   * @param {Tone.InputNode} node the node to delete from the graph
   * @return {boolean} indicates whether the specified node was unreferenced in the graph and has been deleted
   */
  delete = (node: Tone.InputNode): boolean => {
    if (!this.#nodes.has(node)) {
      this.#log(`Node (${node}) not in graph, cannot delete`)
      return false
    } else if (this.#forwardAdjacencyList.get(node)?.size || this.#reverseAdjacencyList.get(node)?.size) {
      this.#log(`Node (${node}) still referenced, cannot delete`)
      return false
    } else {
      this.#nodes.delete(node)
      this.#forwardAdjacencyList.delete(node)
      this.#reverseAdjacencyList.delete(node)
      return true
    }
  }

  /**
   * Tests if two nodes have been connected in the graph.
   * @param {Tone.ToneAudioNode} sourceNode the source node
   * @param {Tone.InputNode} targetNode the target node
   * @return {boolean} indicates if the nodes are connected.
   */
  connected = (sourceNode: Tone.ToneAudioNode, targetNode: Tone.InputNode): boolean =>
    !!(
      this.#forwardAdjacencyList.get(sourceNode)?.has(targetNode) &&
      this.#reverseAdjacencyList.get(targetNode)?.has(sourceNode)
    )

  /**
   * Connects two nodes in the graph.
   * The source node must necessarily be a Tone.ToneAudioNode in order to support connections.
   * @param {Tone.ToneAudioNode} sourceNode the source node
   * @param {Tone.InputNode} targetNode the target node
   * @return {boolean} indicates if the nodes were successfully connected.
   */
  connect = (sourceNode: Tone.ToneAudioNode, targetNode: Tone.InputNode): boolean => {
    if (!this.has(sourceNode)) {
      this.#log(`Node (${sourceNode}) not in graph, cannot connect`)
      return false
    } else if (!this.has(targetNode)) {
      this.#log(`Node (${targetNode}) not in graph, cannot connect`)
      return false
    } else if (this.connected(sourceNode, targetNode)) {
      this.#log(`Nodes (${sourceNode}, ${targetNode}) already connected`)
      return false
    } else {
      sourceNode.connect(targetNode)
      this.#forwardAdjacencyList.get(sourceNode)?.add(targetNode)
      this.#reverseAdjacencyList.get(targetNode)?.add(sourceNode)
      return true
    }
  }

  /**
   * Disconnects two nodes in the graph.
   * The source node must necessarily be a Tone.ToneAudioNode in order to support connections.
   * @param {Tone.ToneAudioNode} sourceNode the source node
   * @param {Tone.InputNode} targetNode the target node
   * @return {boolean} indicates if the nodes were successfully disconnected.
   */
  disconnect = (sourceNode: Tone.ToneAudioNode, targetNode: Tone.InputNode): boolean => {
    if (!this.has(sourceNode)) {
      this.#log(`Node (${sourceNode}) not in graph, cannot connect`)
      return false
    } else if (!this.has(targetNode)) {
      this.#log(`Node (${targetNode}) not in graph, cannot connect`)
      return false
    } else if (!this.connected(sourceNode, targetNode)) {
      this.#log(`Nodes (${sourceNode}, ${targetNode}) already disconnected`)
      return false
    } else {
      sourceNode.disconnect(targetNode)
      this.#forwardAdjacencyList.get(sourceNode)?.delete(targetNode)
      this.#reverseAdjacencyList.get(targetNode)?.delete(sourceNode)
      return true
    }
  }
}
