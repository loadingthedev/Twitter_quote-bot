const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = class Sheet {
  constructor() {
    this.doc = new GoogleSpreadsheet(
      //ENter SpreadSheet Id here
      'Sheet_id'
    );
  }

  async load() {
    // OR load directly from json file if not in secure environment
    await this.doc.useServiceAccountAuth(require('./credentials.json'));

    await this.doc.loadInfo(); // loads document properties and worksheets
  }

  async addRows(rows) {
    const sheet = this.doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

    await sheet.addRows(rows);
  }

  async getRows() {
    const sheet = this.doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    return await sheet.getRows();
  }
};
