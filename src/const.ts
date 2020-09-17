/** @format */

export const p1BossHPReg = /^37\|.{33}\|.{8}\|有生命活水\|.{8}\|(\d+)\|(\d+)\|.+$/
export const p1HandHPReg = /^37\|.{33}\|.{8}\|活水之手\|.{8}\|(\d+)\|(\d+)\|.+$/
// export const bossHPRegexStr = /^37\|.{33}\|.{8}\|木人\|.{8}\|(\d+)\|(\d+)\|.+$/;
// export const handHPRegexStr = /^37\|.{33}\|.{8}\|木人\|.{8}\|(\d+)\|(\d+)\|.+$/;

export const wipeReg = /^33\|.{33}\|.{8}\|4000001[026].+$/

export default {
  p1BossHPReg,
  p1HandHPReg,
  wipeReg,
}
