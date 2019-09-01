import { Component, ViewChild, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DrawareaDirective } from './drawarea.directive';
import * as tf from '@tensorflow/tfjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    predictedValue: number = null;

    private model: tf.LayersModel;

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
        this.model = await tf.loadLayersModel('/assets/tfjs-model/model.json');
    }

    async predict(imageData: ImageData) {
        await tf.tidy(() => {
            const img = tf.browser.fromPixels(imageData, 1).toFloat();
            const normalized = img.div(tf.scalar(256.0));
            const batched = normalized.reshape([1, 28, 28, 1]);

            const output = this.model.predict(batched) as any;

            output.data().then(predictions => {
                this.predictedValue = predictions.indexOf(Math.max(...predictions));
                this.changeDetectorRef.markForCheck();
            });
        });
    }
}
