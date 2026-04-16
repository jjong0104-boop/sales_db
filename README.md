# 통신본부 영업 방문일지

Supabase + GitHub Pages 기반 영업 방문일지 관리 시스템 (PC + 모바일 반응형)

---

## 📁 파일 구조

```
sales-log/
├── index.html                   ← 로그인 페이지
├── css/
│   ├── style.css                ← 공통 디자인 시스템
│   └── layout.css               ← 앱 레이아웃 + 반응형
├── js/
│   ├── supabase-config.js       ← ⚠️ Supabase URL/KEY 설정 (필수 수정)
│   ├── auth.js                  ← 로그인 / 세션 관리
│   ├── api.js                   ← Supabase CRUD API
│   └── utils.js                 ← 공통 레이아웃 + 유틸
├── pages/
│   ├── dashboard.html           ← 방문일지 목록 (메인)
│   └── clients.html             ← 거래처 관리
├── supabase_setup.sql           ← DB 테이블 생성 + 초기 사용자
└── supabase_data_upload.sql     ← 기존 데이터 업로드 SQL
```

---

## 🚀 배포 순서 (총 4단계)

### 1단계 — Supabase 설정

1. [supabase.com](https://supabase.com) → 새 프로젝트 생성
2. **Settings → API** 에서 복사:
   - `Project URL` → `https://xxxxx.supabase.co`
   - `anon public key` → 긴 JWT 문자열
3. `js/supabase-config.js` 파일 열어서 교체:

```js
const SUPABASE_URL      = 'https://여기에_프로젝트_URL.supabase.co';
const SUPABASE_ANON_KEY = '여기에_anon_key';
```

### 2단계 — DB 테이블 생성

Supabase 대시보드 → **SQL Editor** → `supabase_setup.sql` 전체 내용 붙여넣기 → Run

### 3단계 — 기존 데이터 업로드

**방법 A (SQL 직접 실행 - 권장)**
1. `supabase_data_upload.sql` 열기
2. SQL Editor에서 **clients INSERT** 먼저 실행
3. 이어서 **visit_logs INSERT** 실행
4. ⚠️ 반드시 clients → visit_logs 순서로 실행

**방법 B (구글 시트 → CSV 업로드)**
1. 구글 시트 → 파일 → 다운로드 → CSV
2. Supabase → Table Editor → 해당 테이블 → Import data from CSV
3. 컬럼 매핑 후 업로드

**구글 시트에서 SQL 자동 생성하기**
- `supabase_data_upload.sql` 하단의 수식 참고
- 시트에서 수식으로 INSERT 구문 자동 생성 → SQL Editor에서 실행

### 4단계 — GitHub Pages 배포

```bash
# GitHub 저장소 생성 후
git init
git add .
git commit -m "초기 배포"
git remote add origin https://github.com/사용자명/저장소명.git
git push -u origin main
```

GitHub → 저장소 → **Settings → Pages**
- Source: `Deploy from a branch`
- Branch: `main` / `(root)`
- Save 클릭

접속 주소: `https://사용자명.github.io/저장소명/`

---

## 📱 반응형 지원

| 화면 크기 | 레이아웃 |
|-----------|----------|
| 900px+ (PC) | 사이드바 + 테이블 뷰 |
| 768px~ (태블릿) | 사이드바 + 카드 뷰 |
| ~768px (모바일) | 햄버거 드로어 + 카드 뷰 + 하단 탭바 |

---

## 🔑 기능 목록

| 기능 | 설명 |
|------|------|
| 로그인 | 담당자 계정 선택 + 비밀번호 |
| 방문일지 목록 | 테이블/카드 뷰, 담당자·상태 필터, 컬럼 정렬 |
| 방문일지 작성 | 거래처 선택, 1~N차 미팅 추가, 상태 관리 |
| 방문일지 수정 | 기존 일지 수정, 미팅 추가/삭제 |
| 팀장 피드백 | 팀장 계정에서만 작성 가능 |
| 거래처 관리 | 카드 주소록, 등록/수정, 방문기록 연결 |
| CSV 내보내기 | 필터된 결과 엑셀 호환 다운로드 |

---

## 🔒 보안 안내

- 현재 비밀번호는 평문 저장 (테스트용)
- 실 운영 시 Supabase Auth 사용 또는 bcrypt 해시 적용 권장
- `supabase_setup.sql`의 팀장 비밀번호(`admin1234`)는 배포 전 반드시 변경
