import build from '../RollupFunc/build';

export default async function bundleConfigFile(
  filename: string,
  isESM = false
): Promise<{ code: string; dependencies: string[] }> {
  const result = await build(process.cwd(), filename, isESM);
  console.log(result);
  return {
    code: 'text',
    dependencies: ['']
  };
}
