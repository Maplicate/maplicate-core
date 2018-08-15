import { MaplicateNode } from "./MaplicateNode";

if (process.browser) {
  module.exports = { MaplicateNode }
} else {
  window.maplicate = { MaplicateNode }
}
