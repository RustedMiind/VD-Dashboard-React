export function forceDownloadHandler(url: string) {
  return {
    forceDownload: () => {
      const link = document.createElement("a");
      link.href = url;
      const fileName = url.substring(url.lastIndexOf("/") + 1);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  };
}
