import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';

const traceExporter = new OTLPTraceExporter({
  url: "http://localhost:4317",
})

const sdk = new NodeSDK({ 
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'test-app',
  }),
  spanProcessor: new SimpleSpanProcessor(traceExporter)
});

sdk.start();
console.log('Tracing initialized');

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});

