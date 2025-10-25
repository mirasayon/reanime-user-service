# Backend: User Service for reanime.art

First code: october 19, 2024

## Tech Stack

-   Express.js v5, Node.js, TypeScript ESM, Prisma ORM, PostgreSQL

### How to create pem keys:

download link for windows 11 (.EXE/.MSI) <https://slproweb.com/products/Win32OpenSSL.html>

```bash
	openssl genrsa -out ./keys/private.pem 2048
	openssl rsa -in ./keys/private.pem -pubout -out ./keys/public.pem
```
