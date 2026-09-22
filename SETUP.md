# Ghi chú bảo trì

Site chạy tại https://vuhuyng04.github.io — al-folio (theme gem), build bằng
GitHub Actions (`.github/workflows/deploy.yml`) rồi deploy qua
`actions/deploy-pages`. Pages source đặt là **GitHub Actions**, không phải
"Deploy from a branch".

## Nội dung nằm ở đâu

| Trang | File |
|---|---|
| `/` | `_pages/about.md` |
| `/cv/` | `assets/json/resume.json` (chuẩn JSON Resume) |
| `/publications/` | `_bibliography/papers.bib` |
| `/projects/` | `_projects/*.md` |
| Ảnh đại diện | `assets/img/prof_pic.jpg` |
| Liên kết mạng xã hội | `_data/socials.yml` |

## Ba file vá lỗi theme — đừng xoá khi nâng gem

Theme đóng gói layouts/includes trong gem, nên repo này ghi đè ba chỗ. Cả ba
đều là **vá bug của gem**, không phải tuỳ biến thẩm mỹ. Khi nâng `al_folio_cv`
hoặc `al_folio_core`, kiểm tra xem bug đã được sửa chưa rồi mới bỏ.

**`assets/css/main.scss`** — copy nguyên `@use` của `al_folio_core`, thêm 2 luật:

- `ul.list-group { list-style: none; ... }`
  Gem ship `div.list-group { display:flex; ... }` nhưng template của chính nó
  render `<ul class="list-group">`. `ul` không khớp selector `div`, luật chết,
  trình duyệt rơi về `list-style: disc` → mỗi mục CV bị một dấu `•` thừa phía
  trước badge ngày tháng. Tailwind cũng không reset `list-style`.

- `.author em { text-decoration: underline; ... }`
  `bib.liquid` bọc tên chủ site trong `<em>` (so khớp qua `scholar.last_name` /
  `scholar.first_name` trong `_config.yml`). `<em>` mặc định in nghiêng; CV này
  dùng gạch chân.

**`_includes/cv/experience.liquid`** và **`_includes/cv/education.liquid`** —
copy từ gem `al_folio_cv`, sửa hai chỗ (đều có comment `OVERRIDE:` tại chỗ):

- Ngày tháng: gem dùng `| split:'-' | first` nên cắt còn năm, khiến kỳ thực tập
  3 tháng hiện thành "2025 - 2025". Đổi sang `| slice: 0, 2 | join: '.'` → `2025.05 - 2025.09`,
  khớp định dạng của al-folio bản cũ.
- `education.liquid` thêm khối render `entry.score` (GPA) — template gốc bỏ qua
  trường này hoàn toàn.

Gem **append** thư mục template của nó vào `includes_load_paths`, nên `_includes/`
của repo được ưu tiên. Đó là lý do cách ghi đè này chạy được.

## Lưu ý khác

- `max_author_limit` trong `_config.yml` để trống — nếu đặt số, danh sách tác giả
  sẽ bị cắt và giấu phần còn lại sau nút bấm.
- `_source/original-index.html` là trang portfolio đơn trang tự dựng trước đây,
  giữ lại phòng khi cần. Bản trong lịch sử git ở commit `d5374b1`.
- Mỗi lần push, Actions mất khoảng 3–5 phút (cài Ruby, Jekyll, ImageMagick,
  purgecss). Build hỏng thì deployment cũ vẫn được giữ nguyên.
