import { createGraph, GraphObject, GraphObjectSource } from './map'

describe('createGraph', () => {
  it('parses the map graph properly', () => {
    const input: GraphObjectSource[] = [
      { id: '1', links: ['2', '3'] },
      { id: '2', links: ['1', '3'] },
      { id: '3', links: ['1', '2'] },
    ]

    const result: GraphObject[] = createGraph(input)

    const first = result.find((o) => o.id === '1')

    expect(first?.links.map((o) => o.id)).toContain('2')
  })

  it('should throw an exception when the input data is bad', () => {
    const input: GraphObjectSource[] = [
      { id: '1', links: ['2'] },
      { id: '2', links: ['1', '3'] },
    ]

    expect(() => createGraph(input)).toThrow()
  })
})
