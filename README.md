# Reverb Calculator

Reverb / Pre-Delay / LFO Time 계산기 (BPM → ms)

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버
npm run dev
```

브라우저에서 `http://localhost:3000` 열기

## 배포 (Vercel)

1. GitHub에 코드 업로드
2. [Vercel](https://vercel.com)에서 New Project 생성
3. 리포지토리 연결
4. Framework Preset: `Next.js` 자동 인식
5. Environment variables: 없음
6. Deploy

## 포함 기능

- BPM 입력
- 계산기 모드
  - Reverb
  - Pre-Delay
  - LFO Time
- 1/4, 1/8, 1/16 등 음표값별 ms 계산
- 값 복사(Copy)

## 참고

계산식:

```
1분당 박자(ms) = 60000 / BPM
원하는 값(ms) = (1분당 박자(ms)) * noteValue(1/4 기준 비율)
```
