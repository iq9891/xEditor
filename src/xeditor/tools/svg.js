import svgPath from './svgpath';
/**
 * 输出 svg 的图片
 *
 * @private
 */
function svg($parent, type) {
  let pathTem = '';
  svgPath[type].forEach((path) => {
    pathTem += `<path d="${path}"></path>`;
  });

  $parent.html(`
    <svg width="16px" height="16px" viewbox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>backcolor</title>
      <g stroke="none" stroke-width="1" fill="#999999" fill-rule="nonzero">
        ${pathTem}
      </g>
    </svg>
  `);
}
export default svg;
