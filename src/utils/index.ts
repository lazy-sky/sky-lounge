// TODO: 서버로 분리 및 중복 검사
// 요청 아까우니까 보류
const determiners = [
  '예쁜',
  '화난',
  '귀여운',
  '배고픈',
  '철학적인',
  '현학적인',
  '슬픈',
  '푸른',
  '노란',
  '빨간',
  '비싼',
  '밝은',
  '즐거운',
  '어린',
  '재밌는',
  '신나는',
  '멋있는',
  '성실한',
  '빛나는',
  '착실한',
  '게으른',
  '부지런한',
  '끝내주는',
  '배고픈',
  '배부른',
  '향기로운',
  '산책하는',
  '유머러스한',
  '고독한',
  '진지한',
  '째려보는',
  '조그만',
  '커다란',
  '야생의',
  '작살나는',
  '참견하는',
  '놀란',
  '침착한',
  '산만한',
  '차분한',
  '시끄러운',
  '조용한',
  '수다스러운',
  '집중하는',
]
const animals = [
  '참새',
  '비둘기',
  '호랑이',
  '사자',
  '기린',
  '하마',
  '늑대',
  '표범',
  '비버',
  '강아지',
  '고양이',
  '부엉이',
  '여우',
  '치타',
  '문어',
  '미어캣',
  '다람쥐',
  '오소리',
  '개구리',
  '나무늘보',
  '병아리',
  '북극곰',
  '물개',
  '펭귄',
  '땃쥐',
  '거북이',
  '돼지',
  '낙지',
  '오징어',
  '두꺼비',
  '카라칼',
  '고슴도치',
  '햄스터',
  '카멜레온',
  '이구아나',
  '멧밭쥐',
  '너구리',
  '원숭이',
  '뱀',
  '코알라',
  '캥거루',
  '낙타',
  '얼룩말',
  '하이에나',
  '올빼미',
  '지렁이',
  '두더지',
  '재규어',
  '공룡',
]

export const getRandomNickname = () => {
  return `${determiners[Math.floor(Math.random() * determiners.length)]} ${
    animals[Math.floor(Math.random() * animals.length)]
  }`
}
