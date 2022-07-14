import { faker } from '@faker-js/faker'

export const avatarSize = 40
export const animationSpeed = 333
const margin = 8
const avatarGridCellSize = avatarSize + margin
const genders = ['male', 'female']

export const createUser = () => {
  const gender = genders[Math.floor(Math.random() * genders.length)]
  return {
    alt: [faker.name.firstName(gender), faker.name.lastName(gender)].join(' '),
    src: faker.image.avatar(),
  }
}

export const generatePositionMap = (width, height) => {
  const colCount = Math.floor(width / avatarGridCellSize)
  const rowCount = Math.floor(height / avatarGridCellSize)
  const sequentialPositions = []
  for (let j = 1; j < rowCount; j++) {
    for (let i = 1; i < colCount; i++) {
      sequentialPositions.push({
        x: i * avatarGridCellSize,
        y: j * avatarGridCellSize,
      })
    }
  }

  const positions = []
  const chunkSize = colCount - 1

  for (let i = 0; i < sequentialPositions.length; i += chunkSize) {
    const chunk = sequentialPositions.slice(i, i + chunkSize)
    const reorderedChunk = chunk.sort(() => Math.random() - 0.5) // shuffle columns
    positions.push(reorderedChunk)
  }

  return positions.flat()
}
