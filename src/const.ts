/** @format */

export const p1BossHPReg = /^37\|.{33}\|.{8}\|有生命活水\|.{8}\|(\d+)\|(\d+)\|.+$/
export const p1HandHPReg = /^37\|.{33}\|.{8}\|活水之手\|.{8}\|(\d+)\|(\d+)\|.+$/
export const p2MainHPReg = /^37\|.{33}\|.{8}\|残暴正义号\|.{8}\|(\d+)\|(\d+)\|.+$/
export const p2SubHPReg = /^37\|.{33}\|.{8}\|巡航驱逐者\|.{8}\|(\d+)\|(\d+)\|.+$/

export const wipeReg = /^33\|.{33}\|.{8}\|4000001[026].+$/

export const p1MainName = '有生命活水'
export const p1SubName = '活水之手'
export const p2MainName = '残暴正义号'
export const p2SubName = '巡航驱逐者'

export const getEnemyHPRegex = (name: string) =>
  new RegExp('^37\\|.{33}\\|.{8}\\|' + name + '\\|.{8}\\|(\\d+)\\|(\\d+)\\|.+$')

export default {
  p1BossHPReg,
  p1HandHPReg,
  p2MainHPReg,
  p2SubHPReg,
  wipeReg,
  p1MainName,
  p1SubName,
  p2MainName,
  p2SubName,
  getEnemyHPRegex,
}
