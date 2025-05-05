import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
// tests/setupTests.ts
import '@testing-library/jest-dom';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

