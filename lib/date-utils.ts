// Hàm định dạng ngày tháng đơn giản thay thế cho date-fns
export function formatDate(date: string | Date, formatStr = "MMMM d, yyyy"): string {
  const d = new Date(date)

  // Các tháng viết đầy đủ
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Các tháng viết tắt
  const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const year = d.getFullYear()
  const month = d.getMonth()
  const day = d.getDate()

  // Thay thế các pattern trong chuỗi format
  return formatStr
    .replace("yyyy", year.toString())
    .replace("MMMM", months[month])
    .replace("MMM", shortMonths[month])
    .replace("MM", (month + 1).toString().padStart(2, "0"))
    .replace("M", (month + 1).toString())
    .replace("dd", day.toString().padStart(2, "0"))
    .replace("d", day.toString())
}
