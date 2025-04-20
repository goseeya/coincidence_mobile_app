import { getDefaultConfig } from 'expo/metro-config';
import path from 'path';

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(path.resolve());

export default config;