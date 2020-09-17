export interface ILogMessage {
  type: 'ChangeZone' | 'LogLine'
  zoneID?: number
  rawLine?: string
}

export interface IHPInfo {
  maxHP: number
  currentHP: number
}
