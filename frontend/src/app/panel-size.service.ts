export class PanelSizeService {
  panelWidth: number;
  BASE_WIDTH = 340;

  constructor() {
    this.panelWidth = this.BASE_WIDTH;
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
