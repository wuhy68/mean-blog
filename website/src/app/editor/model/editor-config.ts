export class EditorConfig {
  public width = '100%';
  public height = '400';
  public path = './assets/editor.md/lib/';
  public codeFold: true;
  public searchReplace = true;
  public toolbar = true;
  public emoji = true;
  public taskList = false;
  public tex = true;
  public readOnly = false;
  public tocm = true;
  public watch = true;
  public previewCodeHighlight = true;
  public saveHTMLToTextarea = true;
  public markdown = '';
  public flowChart = false; // 流程图
  public syncScrolling = true;
  public sequenceDiagram = false; // UML时序图
  public imageUpload = true;
  public imageFormats = ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'];
  public imageUploadURL = '';
  public htmlDecode = 'style,script,iframe';  // you can filter tags decode
  public editorFunction = ''; // 定义调用的方法
  constructor() {
  }
}
