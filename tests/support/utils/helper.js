/* eslint-disable */
class Helper {
  constructor(page) {
    this.page = page;
  }

  async waitForNumberOfSeconds(timeInSeconds) {
    if (typeof timeInSeconds !== "number") {
      throw new Error("Expected timeInSeconds to be a number");
    }
    await this.page.waitForTimeout(timeInSeconds * 1000);
  }
}
module.exports = { Helper };
