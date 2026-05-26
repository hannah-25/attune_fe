# API Guide

프론트엔드 연동용 REST API 명세서입니다.

- **Base URL**: `/v1`
- **인증**: 모든 API는 `Authorization: Bearer <accessToken>` 헤더 필요 (별도 표기 없는 한)

---

## 커뮤니티 (Community)

### 게시글 (Post)

---

#### 게시글 작성

```
POST /v1/community/posts
```

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `postCategory` | `PostCategory` | ✅ | 게시글 카테고리 |
| `title` | `string` | ✅ | 게시글 제목 |
| `content` | `string` | ✅ | 게시글 본문 |
| `isAnonymous` | `boolean` | ❌ | 익명 여부 (기본값: `false`) |

**PostCategory 열거형**

| 값 | 설명 |
|----|------|
| `DEFAULT` | 일반 |
| `DISORDER_INFO` | 장애·질환 정보 |
| `MEDICATION` | 약물 정보 |
| `DAILY_LIFE` | 일상 생활 |

**Request 예시**

```json
{
  "postCategory": "MEDICATION",
  "title": "콘서타 18mg 복용 7일차입니다",
  "content": "약을 먹은지 일주일이 되었는데도 별 느낌이 없어요. 용량을 올려야 할까요?",
  "isAnonymous": true
}
```

**Response** `201 Created`

```json
{
  "postId": 1,
  "title": "콘서타 18mg 복용 7일차입니다",
  "content": "약을 먹은지 일주일이 되었는데도 별 느낌이 없어요. 용량을 올려야 할까요?",
  "postCategory": "MEDICATION",
  "anonNickname": "익명",
  "createdAt": "2026-05-26T10:00:00",
  "updatedAt": "2026-05-26T10:00:00",
  "isOwner": true
}
```

> `isAnonymous: true`이면 `anonNickname`은 `"익명"`, `false`이면 작성자 닉네임 반환

**Error**

| 코드 | 설명 |
|------|------|
| `400` | 필수 필드 누락 또는 유효성 오류 |
| `401` | 인증 토큰 없음 또는 만료 |

---

#### 게시글 목록 조회

```
GET /v1/community/posts
```

삭제되지 않은 게시글을 **최신순**으로 반환합니다.

**Response** `200 OK`

```json
[
  {
    "postId": 2,
    "title": "ADHD 진단받고 나서 처음으로 글 써봐요",
    "content": "...",
    "postCategory": "DEFAULT",
    "anonNickname": "hannah",
    "createdAt": "2026-05-26T09:00:00",
    "updatedAt": "2026-05-26T09:00:00",
    "isOwner": false
  },
  {
    "postId": 1,
    "title": "콘서타 18mg 복용 7일차입니다",
    "content": "...",
    "postCategory": "MEDICATION",
    "anonNickname": "익명",
    "createdAt": "2026-05-26T08:00:00",
    "updatedAt": "2026-05-26T08:00:00",
    "isOwner": true
  }
]
```

---

#### 게시글 상세 조회

```
GET /v1/community/posts/{postId}
```

**Path Parameter**

| 파라미터 | 타입 | 설명 |
|---------|------|------|
| `postId` | `Long` | 게시글 ID |

**Response** `200 OK` — [PostResponse](#게시글-작성) 동일

**Error**

| 코드 | 설명 |
|------|------|
| `404` | 해당 게시글 없음 |

---

#### 게시글 수정

```
PUT /v1/community/posts/{postId}
```

작성자 본인만 수정 가능합니다.

**Path Parameter**

| 파라미터 | 타입 | 설명 |
|---------|------|------|
| `postId` | `Long` | 게시글 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `postCategory` | `PostCategory` | ✅ | 게시글 카테고리 |
| `title` | `string` | ✅ | 게시글 제목 |
| `content` | `string` | ✅ | 게시글 본문 |

**Response** `200 OK` — [PostResponse](#게시글-작성) 동일

**Error**

| 코드 | 설명 |
|------|------|
| `400` | 필수 필드 누락 또는 유효성 오류 |
| `403` | 본인 게시글이 아님 |
| `404` | 해당 게시글 없음 |

---

#### 게시글 삭제

```
DELETE /v1/community/posts/{postId}
```

작성자 본인만 삭제 가능합니다. **소프트 삭제**로 처리됩니다.

**Path Parameter**

| 파라미터 | 타입 | 설명 |
|---------|------|------|
| `postId` | `Long` | 게시글 ID |

**Response** `204 No Content`

**Error**

| 코드 | 설명 |
|------|------|
| `403` | 본인 게시글이 아님 |
| `404` | 해당 게시글 없음 |

---

### 댓글 (Comment)

---

#### 댓글 목록 조회

```
GET /v1/community/posts/{postId}/comments
```

해당 게시글의 댓글을 **오래된 순**으로 반환합니다.

**Path Parameter**

| 파라미터 | 타입 | 설명 |
|---------|------|------|
| `postId` | `Long` | 게시글 ID |

**Response** `200 OK`

```json
[
  {
    "commentId": 1,
    "anonNickname": "익명",
    "content": "저도 비슷한 경험이 있어요. 의사 선생님께 용량 조절 문의해 보세요!",
    "createdAt": "2026-05-26T10:30:00",
    "isPostAuthor": false,
    "isOwner": false
  },
  {
    "commentId": 2,
    "anonNickname": "hannah",
    "content": "감사합니다 :)",
    "createdAt": "2026-05-26T11:00:00",
    "isPostAuthor": true,
    "isOwner": true
  }
]
```

> `isPostAuthor`: 댓글 작성자가 원글 작성자인지 여부  
> `isOwner`: 현재 로그인한 사용자가 댓글 작성자인지 여부

**Error**

| 코드 | 설명 |
|------|------|
| `404` | 해당 게시글 없음 |

---

#### 댓글 작성

```
POST /v1/community/posts/{postId}/comments
```

**Path Parameter**

| 파라미터 | 타입 | 설명 |
|---------|------|------|
| `postId` | `Long` | 게시글 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `content` | `string` | ✅ | 댓글 내용 |
| `isAnonymous` | `boolean` | ❌ | 익명 여부 (기본값: `false`) |

**Request 예시**

```json
{
  "content": "저도 비슷한 경험이 있어요!",
  "isAnonymous": true
}
```

**Response** `201 Created`

```json
{
  "commentId": 1,
  "anonNickname": "익명",
  "isPostAuthor": false,
  "createdAt": "2026-05-26T10:30:00"
}
```

**Error**

| 코드 | 설명 |
|------|------|
| `401` | 인증 토큰 없음 또는 만료 |
| `404` | 해당 게시글 없음 |

---

#### 댓글 수정

```
PATCH /v1/community/comments/{commentId}
```

작성자 본인만 수정 가능합니다.

**Path Parameter**

| 파라미터 | 타입 | 설명 |
|---------|------|------|
| `commentId` | `Long` | 댓글 ID |

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `content` | `string` | ❌ | 댓글 내용 |
| `isAnonymous` | `boolean` | ❌ | 익명 여부 |

**Response** `200 OK`

```json
{
  "commentId": 1,
  "updatedAt": "2026-05-26T12:00:00"
}
```

**Error**

| 코드 | 설명 |
|------|------|
| `403` | 본인 댓글이 아님 |
| `404` | 해당 댓글 없음 |

---

#### 댓글 삭제

```
DELETE /v1/community/comments/{commentId}
```

작성자 본인만 삭제 가능합니다. **소프트 삭제**로 처리됩니다.

**Path Parameter**

| 파라미터 | 타입 | 설명 |
|---------|------|------|
| `commentId` | `Long` | 댓글 ID |

**Response** `204 No Content`

**Error**

| 코드 | 설명 |
|------|------|
| `403` | 본인 댓글이 아님 |
| `404` | 해당 댓글 없음 |