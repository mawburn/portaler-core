const getMarker = (markerName: string) => {
  switch (markerName) {
    case 'roads_of_avalon_solo_pve':
      return 'Solo Chest'
    case 'roads_of_avalon_group_pve':
      return 'Group Chest'
    case 'roads_of_avalon_raid_pve':
      return 'Gold Chest'
    case 'dungeon_solo':
      return 'Solo Dungeon'
    case 'dungeon_group':
      return 'Group Dungeon'
    case 'dungeon_elite':
      return 'Avalonian Dungeon'
    default:
      const markerArr = markerName.split('_')
      if (markerName.startsWith('Portal_Exit_')) {
        return `Portal to ${markerArr.splice(2).join(' ')}`
      }

      return markerArr.join(' ')
  }
}

export default getMarker
