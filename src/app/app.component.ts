import { Component, ViewChild, OnInit } from '@angular/core';
import { DrawareaDirective } from './drawarea.directive';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    predictedValue: number = null;

    @ViewChild(DrawareaDirective, { static: false }) drawArea: DrawareaDirective;

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
