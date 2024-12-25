import {bar} from './b.mjs';
console.log('a.mjs');
console.log('bar is:', bar);
export function baz() {
    return 'baz';
}
export let foo = 'foo';
