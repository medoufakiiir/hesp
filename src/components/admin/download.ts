// Browser-only helper: triggers a client-side file download from a string payload.
export function downloadFile(data: string, filename: string, mime: string) {
  const blob = new Blob([data], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
