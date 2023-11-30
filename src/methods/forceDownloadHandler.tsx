export class forceDownloadHandler {
  constructor(private readonly url: string) {}
  forceDownload() {
    const link = document.createElement("a");
    link.href = this.url;
    const fileName = this.url.substring(this.url.lastIndexOf("/") + 1);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
