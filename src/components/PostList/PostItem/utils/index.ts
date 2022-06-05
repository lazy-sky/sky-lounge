import dayjs from 'dayjs'

export const calculatePassedTime = (time: string) => {
  const passedHour = Math.floor((Date.now() - Number(time)) / 1000 / 60 / 60)
  if (passedHour < 1) {
    return '얼마 전'
  }

  if (passedHour <= 24) {
    return `${passedHour}시간 전`
  }

  return dayjs(time).format('YYYY년 MM월 D일 hh시 m분')
}
