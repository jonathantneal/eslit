// local tooling
import include from './lib/eslit-include';
import parse from './lib/eslit-parse';
import resolve from './lib/eslit-resolve';

include.parse = parse;
include.resolve = resolve;

// export default include, as well as parse and resolve
export default include;
