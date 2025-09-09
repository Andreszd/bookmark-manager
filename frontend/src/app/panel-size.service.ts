export class PanelSizeService {
  panelWidth: number;

  constructor() {
    this.panelWidth = 330;
  }

  handleResize(event: any) {
    const mousemove = (e: MouseEvent) => {
      if (!this.panelWidth) return;

      this.panelWidth = e.clientX;
    };

    document.addEventListener('mousemove', mousemove);

    const mouseup = () => {
      document.removeEventListener('mouseup', mouseup);
      document.removeEventListener('mousemove', mousemove);
    };

    document.addEventListener('mouseup', mouseup);
  }
}
