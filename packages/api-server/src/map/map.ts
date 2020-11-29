export interface GraphObjectSource {
  id: string
  links: string[]
}

export interface GraphObject {
  id: string
  links: GraphObject[]
}

export const createGraph = (input: GraphObjectSource[]): GraphObject[] => {
  const newList: GraphObject[] = input.map((o) => ({ id: o.id, links: [] }))

  for (const object of newList) {
    const linksToBuild = input.find((o) => o.id === object.id)!.links
    const links = linksToBuild.map((lId) => newList.find((o) => o.id === lId))
    if (links.filter((l) => !l).length > 0) {
      throw 'Invalid input data'
    } else {
      object.links = links as GraphObject[] // Compiler does not interpret the check above correctly
    }
  }

  return newList
}
