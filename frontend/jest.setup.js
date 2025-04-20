import "whatwg-fetch";
import "@testing-library/jest-native/extend-expect";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
  );

global.fetch = require('jest-fetch-mock');

