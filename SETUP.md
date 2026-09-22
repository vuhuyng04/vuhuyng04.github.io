# Portfolio al-folio — hướng dẫn hoàn tất

Khung đã dựng sẵn từ template gốc [alshedivat/al-folio](https://github.com/alshedivat/al-folio)
(chính là theme của https://huyenbui117.github.io). Nội dung demo đã dọn sạch.

## ⚠️ Chưa an toàn để chia sẻ link

Hai thứ vẫn là dữ liệu demo của template và **sẽ hiển thị trên site** cho tới khi bạn thay:

- `assets/img/prof_pic.jpg` — ảnh Albert Einstein, hiện trên trang chủ.
- `assets/img/prof_pic_color.png` — ảnh demo thứ hai (14 MB), xoá nếu không dùng.

`assets/json/resume.json` và `_data/repositories.yml` đã được dọn rỗng, nên `/cv/`
sẽ trống chứ không hiện CV của người khác.

## Chưa build lần nào

Máy này không có Ruby/Docker nên site **chưa từng được build**. Tôi mới chỉ kiểm tra
YAML/JSON hợp lệ — việc đó không bắt được lỗi Liquid hay lỗi Jekyll. Lần kiểm tra
thật đầu tiên là khi GitHub Actions chạy sau lúc push.

## Còn thiếu (bắt buộc)

| Việc | File | Ghi chú |
|---|---|---|
| ~~Tên hiển thị~~ | ~~`_config.yml`~~ | ✅ đã đặt "Huy Nguyễn Vũ" — sửa nếu muốn khác |
| ~~URL site~~ | ~~`_config.yml`~~ | ✅ đã đặt `https://vuhuyng04.github.io` |
| Ảnh đại diện | `assets/img/prof_pic.jpg` | ghi đè file demo |
| Giới thiệu | `_pages/about.md` | phần dưới `---` |
| CV | `assets/json/resume.json` | chuẩn JSON Resume |
| Bài báo | `_bibliography/papers.bib` | BibTeX |

## Deploy

1. Tạo repo GitHub tên **chính xác** `vuhuyng04.github.io` (repo rỗng, không thêm README).
2. Push:
   Remote đã cấu hình sẵn, chỉ cần:
   ```bash
   git push -u origin main
   ```
3. Settings → Actions → General → Workflow permissions → chọn **Read and write permissions** → Save.
   (Thiếu bước này Actions không push được nhánh `gh-pages`.)
4. Chạy lại workflow "Deploy site" nếu lần đầu fail.
5. Settings → Pages → Source: **Deploy from a branch** → Branch: **`gh-pages`** / `(root)` → Save.

> Quan trọng: Pages phải trỏ vào `gh-pages`, KHÔNG phải `main`. al-folio build bằng
> GitHub Actions vì plugin `jekyll-scholar` không nằm trong danh sách cho phép của
> GitHub Pages. Trỏ vào `main` sẽ ra site lỗi hoặc trắng trang.

Sau bước 5, đợi ~2–3 phút rồi mở `https://vuhuyng04.github.io`.

## Điều hướng đang bật

`about` (/) · `publications` · `cv`

Các trang `blog`, `projects`, `repositories`, `teaching`, `books`, `people`, `submenus`
đã đặt `nav: false`. Muốn bật lại: sửa `nav: false` → `nav: true` trong file tương ứng
ở `_pages/`.
