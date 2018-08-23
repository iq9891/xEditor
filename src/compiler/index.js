import {
  parseLoop,
} from './parser';

export default (htmlStr, option) => {
  // console.log(parserKey(htmlStr, option));
  console.log(parseLoop(htmlStr, option));
  return parseLoop(htmlStr, option);
};
