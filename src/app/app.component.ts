import { Component, ViewChild, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DrawareaDirective } from './drawarea.directive';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    predictedValue: number = null;

    @ViewChild(DrawareaDirective, { static: false }) drawArea: DrawareaDirective;

    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    clear() {
        this.predictedValue = null;
        this.drawArea.clear();
    }

    ngOnInit() {
        this.loadModel();
    }

    async loadModel() {
        // TODO: load tensorflow model
    }

    predict(imageData: ImageData) {
        // TODO: add prediction code
    }
}
