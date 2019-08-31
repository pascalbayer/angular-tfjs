import { Directive, OnInit, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    selector: '[appDrawarea]'
})
export class DrawareaDirective implements OnInit {
    @Output() image = new EventEmitter<ImageData>();

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private position: { x: number; y: number };

    constructor(private element: ElementRef) {}

    ngOnInit() {
        this.canvas = this.element.nativeElement as HTMLCanvasElement;
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getClientRects();
        this.canvas.width = rect[0].width * dpr;
        this.canvas.height = rect[0].height * dpr;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(dpr, dpr);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent) {
        this.storePosition(event);
        this.drawPath(event);
    }

    @HostListener('mouseup', ['$event'])
    onMouseUp() {
        this.resetPosition();
        this.image.emit(this.getImageData());
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        this.drawPath(event);
        this.image.emit(this.getImageData());
    }

    @HostListener('mouseleave', ['$event'])
    onMouseLeave(event: MouseEvent) {
        this.drawPath(event);
        this.resetPosition();
        this.image.emit(this.getImageData());
    }

    private storePosition(event: MouseEvent) {
        this.position = { x: event.offsetX, y: event.offsetY };
    }

    private resetPosition() {
        this.position = null;
    }

    private drawPath(event: MouseEvent) {
        if (this.position) {
            this.ctx.beginPath();
            this.ctx.lineWidth = 15;
            this.ctx.lineCap = 'round';
            this.ctx.strokeStyle = '#ffffff';
            this.ctx.moveTo(this.position.x, this.position.y);
            this.storePosition(event);
            this.ctx.lineTo(this.position.x, this.position.y);
            this.ctx.stroke();
        }
    }

    private getImageData(): ImageData {
        const offscreenCanvas = new OffscreenCanvas(28, 28);
        const offscreenCanvasCtx = offscreenCanvas.getContext('2d') as OffscreenCanvasRenderingContext2D;
        offscreenCanvasCtx.drawImage(this.canvas, 0, 0, 28, 28);

        return offscreenCanvasCtx.getImageData(0, 0, 28, 28);
    }
}
