# **Bikinsoal.com**

>Sebuah Project Fullstack **Next.js 13** dan **GPT** API

![](https://github.com/fahreziadh/bikinsoal.com/raw/main/demo-1.gif)


## Feature


- Generate Soal
- Simpan Soal
- Payment Gateway
- Auth
- Email
- Subscription
- etc.

## Tech Stack

- Next.js 13
- Tailwind.css
- Prisma
- Planetscale
- Next-Auth
- Sendgrid
- Midtrans
- Vercel

## **Getting Started**
```tsx
yarn install
```
### Copy ***.env.example*** ke  ***.env***

```tsx
OPENAI_API_KEY=
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
SERVER_KEY_MIDTRANS=
SERVER_KEY_MIDTRANS_HASHED=
SENDGRID_API_KEY=
BASE_URL="http://localhost:3000"
SERVER_MIDTRANS_URL="https://app.sandbox.midtrans.com/snap/v1/transactions"
```

### Sync Database

> Pastikan konek ke database_url dan buat database kosong dengan nama **bikinsoal**

push prisma ke database :
```tsx
yarn prisma db push
```

```tsx
yarn prisma generate
```

### Start

```tsx
yarn dev
```
