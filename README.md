# Study Buddy Match

## Yêu cầu
- Node.js LTS (>= 18)
- npm (đi kèm Node)

## Cấu trúc thư mục
```
.
├─ backend/        # API Express
├─ frontend/       # React + Vite
├─ .gitignore
└─ package.json    # Script gốc chạy đồng thời FE/BE
```

## Cách chạy nhanh (từ thư mục gốc)
1) Cài dependencies cho cả FE/BE:
```
npm run install:all
```
2) Chạy đồng thời FE (port 5173) và BE (port 5000):
```
npm run dev
```
- Frontend: http://localhost:5173
- Backend: http://localhost:5000/api/health

## Cách chạy thủ công từng phần
- Frontend:
```
cd frontend
npm install
npm run dev
```
- Backend:
```
cd backend
npm install
npm run dev
```

## Đẩy lên GitHub
1) Khởi tạo Git và commit đầu tiên:
```
git init
git add .
git commit -m "chore: init study-buddy-match skeleton (react + node)"
```
2) Tạo repo trống trên GitHub, sau đó kết nối remote và push:
```
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

## Ghi chú
- Proxy FE → BE đã cấu hình sẵn: mọi request từ FE tới `/api` sẽ chuyển đến `http://localhost:5000`.
- Có sẵn endpoint kiểm tra backend: `GET /api/health`.
