import { FilterOptionsState } from '@material-ui/lab/useAutocomplete'
import { filterZones, getMaxString, ZoneLight } from './zoneSearchUtils'

describe('Test zoneSearchUtils', () => {
  describe('Test filterZones', () => {
    const getState = (inputValue: string): FilterOptionsState<ZoneLight> => ({
      inputValue,
      getOptionLabel: () => '',
    })

    const testList: ZoneLight[] = [
      { name: 'Stinkhag', value: 'stinkhag' },
      { name: 'Sectun-Qinsom', value: 'sectun-qinsom' },
      { name: 'Bank of Thetford', value: 'bank of thetford' },
      { name: 'Bank of Lymhurst', value: 'bank of lymhurst' },
      { name: 'Mushroom Cave', value: 'mushroom cave' },
      { name: 'LEGACY-UNDEAD-02', value: 'legacy-undead-02' },
      { name: 'HomeTerritory Skirmish', value: 'hometerritory skirmish' },
      { name: 'Frostpeak Ascent', value: 'frostpeak ascent' },
      { name: 'Flatrock Plateau', value: 'flatrock plateau' },
      { name: 'Darkstone Drift', value: 'darkstone drift' },
      { name: 'Windgrass Border', value: 'windgrass border' },
      { name: 'Highstone Loch', value: 'highstone loch' },
      { name: 'Chambers of Truth', value: 'chambers of truth' },
      { name: "Conquerors' Hall Lvl. 1", value: "conquerors' hall lvl. 1" },
      { name: 'Hasitos-Umayaum', value: 'hasitos-umayaum' },
      { name: 'Tonitos-Uxavrom', value: 'tonitos-uxavrom' },
      { name: 'PSG-0051', value: 'psg-0051' },
      { name: 'DNG-0602', value: 'dng-0602' },
      { name: 'PSG-0041', value: 'psg-0041' },
      { name: 'Secent-Qi-Odesom', value: 'secent-qi-odesom' },
      { name: 'Sectun-In-Qinsom', value: 'sectun-in-qinsom' },
    ]

    test('starts with', () => {
      expect(filterZones(testList, getState('sectun')).length).toBe(2)
      expect(filterZones(testList, getState('SeCtuN')).length).toBe(2)
      expect(filterZones(testList, getState('SeCtuN-I')).length).toBe(1)
      expect(filterZones(testList, getState('Bank o')).length).toBe(2)
      expect(filterZones(testList, getState('xxx')).length).toBe(0)
    })

    test('fuzzy search', () => {
      expect(filterZones(testList, getState('sec qi')).length).toBe(3)
      expect(filterZones(testList, getState('p 0')).length).toBe(2)
      expect(filterZones(testList, getState('BA O')).length).toBe(2)
      expect(filterZones(testList, getState('xxx')).length).toBe(0)
    })

    test('Test single entry', () => {
      const singleList = [
        { name: 'HomeTerritory Skirmish', value: 'hometerritory skirmish' },
      ]

      expect(filterZones(singleList, getState('ho'))).toMatchObject(singleList)
    })

    test('Test empty list', () => {
      expect(filterZones([], getState('xx')).length).toBe(0)
    })
  })

  describe('Test getMaxString', () => {
    test('Test common cases', () => {
      const testList1: ZoneLight[] = [
        { name: 'Sectun-Qinsom', value: 'sectun-qinsom' },
        { name: 'Secent-Qi-Odesom', value: 'secent-qi-odesom' },
        { name: 'Sectun-In-Qinsom', value: 'sectun-in-qinsom' },
      ]

      expect(getMaxString(testList1, 'se')).toBe('Sec')
      expect(getMaxString(testList1, 'sEc')).toBe('Sec')

      const testList2: ZoneLight[] = [
        { name: 'Bank of Thetford', value: 'bank of thetford' },
        { name: 'Bank of Lymhurst', value: 'bank of lymhurst' },
        { name: 'Bank of Batman', value: 'bank of batman' },
        { name: 'Bank of Joker', value: 'bank of joker' },
      ]

      expect(getMaxString(testList2, 'b')).toBe('Bank of ')
      expect(getMaxString(testList2, 'Ban')).toBe('Bank of ')
      expect(getMaxString(testList2, 'bAnk o')).toBe('Bank of ')

      const testList3: ZoneLight[] = [
        { name: 'Sectun-Qinsom', value: 'sectun-qinsom' },
        { name: 'Sectun-Qi-Odesom', value: 'secent-qi-odesom' },
        { name: 'Sectun-Qi-Qinsom', value: 'sectun-in-qinsom' },
      ]

      expect(getMaxString(testList3, 'se')).toBe('Sectun-Qi')
      expect(getMaxString(testList3.slice(1, 3), 'Se')).toBe('Sectun-Qi-')
    })

    test('Test single entry', () => {
      const singleList = [
        { name: 'HomeTerritory Skirmish', value: 'hometerritory skirmish' },
      ]

      expect(getMaxString(singleList, 'ho')).toBe('HomeTerritory Skirmish')
    })

    test('Test empty list', () => {
      expect(getMaxString([], 'xx')).toBe('xx')
    })
  })
})
