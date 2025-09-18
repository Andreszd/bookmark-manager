export class DragSelectService {
  idxs: number[] = [];
  getChildrenIdxsThatOverlapWithSelectionBox(
    selectionBoxCoordenates: DOMRect,
    childrenCoordenates: DOMRect[]
  ) {
    const idxs = new Set<number>();

    childrenCoordenates.forEach((childRect, index) => {
      const isIntersecting = !(
        selectionBoxCoordenates.right < childRect.left ||
        selectionBoxCoordenates.left > childRect.right ||
        selectionBoxCoordenates.bottom < childRect.top ||
        selectionBoxCoordenates.top > childRect.bottom
      );

      if (isIntersecting) {
        idxs.add(index);
      }
    });
    return [...idxs];
  }

  startSelection(
    event: MouseEvent,
    childRefs: HTMLElement[],
    triggerEventIfChildrenAreInSelectionZone: (idxs: number[]) => void
  ) {
    if (
      !(event.target as HTMLDivElement).classList.contains(
        'drag-select-container'
      ) &&
      !(event.target as HTMLDivElement).classList.contains('drag-select-layout')
    )
      return;

    const initX = event.clientX;
    const initY = event.clientY;

    const container = window.document.querySelector('.drag-select-container');
    const selectionBox = window.document.createElement('div');
    selectionBox.className = 'selection-box';
    container?.appendChild(selectionBox);

    const leftOffset = container?.getBoundingClientRect().left || 0;

    const childrenCoordenates = childRefs.map((child) =>
      child.getBoundingClientRect()
    );

    const mousemove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      selectionBox.classList.add('active');

      if (x < initX) {
        selectionBox.style.left = `${Math.abs(leftOffset - x)}px`;
      } else {
        selectionBox.style.left = `${Math.abs(leftOffset - initX)}px`;
      }
      if (y < initY) {
        selectionBox.style.top = `${y}px`;
      } else {
        selectionBox.style.top = `${initY}px`;
      }

      selectionBox.style.width = `${Math.abs(event.clientX - initX)}px`;
      selectionBox.style.height = `${Math.abs(event.clientY - initY)}px`;

      const idxs = this.getChildrenIdxsThatOverlapWithSelectionBox(
        selectionBox.getBoundingClientRect(),
        childrenCoordenates
      );

      const idxsArentTheSame =
        (idxs.length === this.idxs.length &&
          !this.idxs.every((value, index) => value === idxs[index])) ||
        idxs.length !== this.idxs.length;

      if (!idxsArentTheSame) {
        return;
      }

      triggerEventIfChildrenAreInSelectionZone(idxs);

      this.idxs = idxs;
    };

    container?.addEventListener?.('mousemove', mousemove as EventListener);

    const mouseup = () => {
      container?.removeChild(selectionBox);

      container?.removeEventListener('mousemove', mousemove as EventListener);
      container?.removeEventListener('mouseup', mouseup);
    };

    container?.addEventListener?.('mouseup', mouseup as EventListener);
  }
}
