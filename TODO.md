# Steps

```typescript
yarn add @tensorflow/tfjs
```

## app.component.ts

```typescript
// Add import
import * as tf from '@tensorflow/tfjs';

// Declare private model
private model: tf.LayersModel;

// Implement load model
async loadModel() {
	this.model = await tf.loadLayersModel('/assets/tfjs-model/model.json');
}

// Implement prediction
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
```

## app.component.html

```html
<canvas #canvas appDrawarea class="drawarea" width="600" height="600" (image)="predict($event)"></canvas>
```

