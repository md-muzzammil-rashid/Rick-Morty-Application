import background from '../assets/images/background.jpeg';
import male from '@/assets/images/male.png'
import female from '@/assets/images/female.png'
import genderless from '@/assets/images/genderless.png'
import unknowngender from '@/assets/images/unknowngender.png'
import alive from '@/assets/images/alive.png'
import dead from '@/assets/images/dead.jpeg'
import unknownstatus from '@/assets/images/unknownstatus.png'
import deadchar from '@/assets/images/deadchar.webp'
import alivechar from '@/assets/images/alivechar.png'
import allchar from '@/assets/images/allchar.png'

export const images = {
  background : background,
  dead: deadchar,
  alive: alivechar,
  allchar: allchar
};

export const genderImage = {
  Male: male,
  Female:female,
  GenderLess: genderless,
  unknown : unknowngender
}

export const statusImage = {
  Alive: alive,
  Dead: dead,
  unknown: unknownstatus
}