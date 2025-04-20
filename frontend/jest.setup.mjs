import "whatwg-fetch";
import "@testing-library/jest-native/extend-expect";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

import { default as AsyncStorageMock } from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => AsyncStorageMock);

global.fetch = fetchMock;