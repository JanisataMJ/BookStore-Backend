const { mssql, mssqlConfig } = require("../config/db");

const XLSX = require("xlsx");
class SettingService {
  async getSamplingProcessMaster(datareq) {
    try {
      const pool = await mssql.connect(mssqlConfig);
      const results = await pool
        .request()
        .query(
          `SELECT * FROM SAMPLING_PROCESS_MASTER_test WHERE FLAG_ACTIVE = 1`,
        );
      return {
        status: true,
        message: "Success",
        data: results || [],
      };
      // return results;
    } catch (error) {
      console.error("Service getdata_scanin_fg Error:", error);
      return {
        status: false,
        message: error.message || "An error occurred",
        data: [],
      };
    }
  }

  async getToleranceWeight(datareq) {
    try {
      const pool = await mssql.connect(mssqlConfig);
      const jsonData = JSON.stringify({
        biz: datareq.biz,
        level_part: datareq.level_part,
      });

      const request = pool.request();
      request.input("mode", mssql.Int, 1);
      request.input("json_data", mssql.NVarChar(mssql.MAX), jsonData);
      const result = await request.execute("SETTING_SCANIO_GetAll_test");

      return {
        status: true,
        message: "Success",
        data: result.recordset || [],
      };
    } catch (error) {
      console.error("Service getSamplingToleranceWeight Error:", error);

      return {
        status: false,
        message: error.message || "An error occurred",
        data: [],
      };
    }
  }

  async getProductcodeAccessory(datareq) {
    try {
      const pool = await mssql.connect(mssqlConfig);
      const jsonData = JSON.stringify({
        biz: datareq.biz,
        level_part: datareq.level_part,
      });

      const request = pool.request();
      request.input("mode", mssql.Int, 2);
      request.input("json_data", mssql.NVarChar(mssql.MAX), jsonData);
      const result = await request.execute("SETTING_SCANIO_GetAll_test");

      return {
        status: true,
        message: "Success",
        data: result.recordset || [],
      };
    } catch (error) {
      console.error("Service getdata_scanin_fg Error:", error);
      return {
        status: false,
        message: error.message || "An error occurred",
        data: [],
      };
    }
  }

  async getProductcodeRobbery(datareq) {
    try {
      const pool = await mssql.connect(mssqlConfig);
      const jsonData = JSON.stringify({
        biz: datareq.biz,
        level_part: datareq.level_part,
      });

      const request = pool.request();
      request.input("mode", mssql.Int, 3);
      request.input("json_data", mssql.NVarChar(mssql.MAX), jsonData);
      const result = await request.execute("SETTING_SCANIO_GetAll_test");

      return {
        status: true,
        message: "Success",
        data: result.recordset || [],
      };
    } catch (error) {
      console.error("Service getdata_scanin_fg Error:", error);
      return {
        status: false,
        message: error.message || "An error occurred",
        data: [],
      };
    }
  }

  async putToleranceWeight(datareq) {
    try {
      const allowedUnits = ["g", "kg"];
      if (!allowedUnits.includes(datareq.unit)) {
        return {
          status: false,
          message: "unit must be 'g' or 'kg' only",
          data: [],
        };
      }
      const pool = await mssql.connect(mssqlConfig);
      const jsonData = JSON.stringify({
        biz: datareq.biz,
        level_part: datareq.level_part,
        tolerance: datareq.tolerance,
        unit: datareq.unit,
      });

      const request = pool.request();
      request.input("mode", mssql.Int, 1);
      request.input("json_data", mssql.NVarChar(mssql.MAX), jsonData);
      const result = await request.execute("SETTING_SCANIO_Update_test");

      return {
        status: true,
        message: "Success",
        data: result.recordset ?? [],
      };
    } catch (error) {
      console.error("Service put data_scanin_fg Error:", error);
      return {
        status: false,
        message: error.message || "An error occurred",
        data: [],
      };
    }
  }

  async putProductcodeAccessory(datareq) {
    try {
      const pool = await mssql.connect(mssqlConfig);
      const jsonData = JSON.stringify({
        setting_pk: datareq.setting_pk,
        product_code: datareq.product_code,
        body_sn: datareq.body_sn,
        lens_sn1: datareq.lens_sn1,
        lens_sn2: datareq.lens_sn2,
        card_warrantee: datareq.card_warrantee,
      });

      const request = pool.request();
      request.input("mode", mssql.Int, 2);
      request.input("json_data", mssql.NVarChar(mssql.MAX), jsonData);
      const result = await request.execute("SETTING_SCANIO_Update_test");

      return {
        status: true,
        message: "Success",
        data: result.recordset ?? [],
      };
    } catch (error) {
      console.error("Service put data_scanin_fg Error:", error);
      return {
        status: false,
        message: error.message || "An error occurred",
        data: [],
      };
    }
  }

  async putProductcodeRobbery(datareq) {
    try {
      const pool = await mssql.connect(mssqlConfig);
      const jsonData = JSON.stringify({
        setting_pk: datareq.setting_pk,
        product_code: datareq.product_code,
        flag_active: datareq.flag_active,
      });

      const request = pool.request();
      request.input("mode", mssql.Int, 3);
      request.input("json_data", mssql.NVarChar(mssql.MAX), jsonData);
      const result = await request.execute("SETTING_SCANIO_Update_test");

      return {
        status: true,
        message: "Success",
        data: result.recordset ?? [],
      };
    } catch (error) {
      console.error("Service put data_scanin_fg Error:", error);
      return {
        status: false,
        message: error.message || "An error occurred",
        data: [],
      };
    }
  }

  async insertProductcodeAccessory(datareq) {
    try {
      const pool = await mssql.connect(mssqlConfig);
      const jsonData = JSON.stringify({
        biz: datareq.biz,
        level_part: datareq.level_part ?? null,
        product_code: datareq.product_code ?? null,
        body_sn: datareq.body_sn ?? false,
        lens_sn1: datareq.lens_sn1 ?? false,
        lens_sn2: datareq.lens_sn2 ?? false,
        card_warrantee: datareq.card_warrantee ?? false,
      });

      const request = pool.request();
      request.input("mode", mssql.Int, 1);
      request.input("json_data", mssql.NVarChar(mssql.MAX), jsonData);
      const result = await request.execute("[SETTING_SCANIO_Insert_test]");

      return {
        status: true,
        message: "Success",
        data: result.recordset ?? [],
      };
    } catch (error) {
      console.error("Service put data_scanin_fg Error:", error);
      return {
        status: false,
        message: error.message || "An error occurred",
        data: [],
      };
    }
  }

  async insertProductcodeAccessoryItems(datareq) {
    try {
      const pool = await mssql.connect(mssqlConfig);
      const jsonData = JSON.stringify({
        item_name: datareq.item_name,
      });

      const request = pool.request();
      request.input("mode", mssql.Int, 2);
      request.input("json_data", mssql.NVarChar(mssql.MAX), jsonData);
      const result = await request.execute("SETTING_SCANIO_Insert_test");

      return {
        status: true,
        message: "Success",
        data: result.recordset ?? [],
      };
    } catch (error) {
      console.error("Service put data_scanin_fg Error:", error);
      return {
        status: false,
        message: error.message || "An error occurred",
        data: [],
      };
    }
  }

  async insertProductcodeRobbery(datareq) {
    try {
      const pool = await mssql.connect(mssqlConfig);
      const jsonData = JSON.stringify({
        biz: datareq.biz,
        level_part: datareq.level_part ?? null,
        product_code: datareq.product_code ?? null,
        //robbery_check: datareq.robbery_check ?? false,
      });

      const request = pool.request();
      request.input("mode", mssql.Int, 3);
      request.input("json_data", mssql.NVarChar(mssql.MAX), jsonData);
      const result = await request.execute("[SETTING_SCANIO_Insert_test]");

      return {
        status: true,
        message: "Success",
        data: result.recordset ?? [],
      };
    } catch (error) {
      console.error("Service put data_scanin_fg Error:", error);
      return {
        status: false,
        message: error.message || "An error occurred",
        data: [],
      };
    }
  }

  async uploadExcelFile(filePath) {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const rows = XLSX.utils.sheet_to_json(worksheet);

      const pool = await mssql.connect(mssqlConfig);

      let results = [];

      for (const row of rows) {
        const jsonData = {
          Title: row.Book,
          Author: row.Author,
          Category: row.Category,
          Price: row.Price,
          Stock: row.Stock,
        };

        const request = pool.request();
        request.input("mode", mssql.Int, 4);
        request.input(
          "json_data",
          mssql.NVarChar(mssql.MAX),
          JSON.stringify(jsonData),
        );

        const result = await request.execute("SETTING_SCANIO_Insert_test");

        //results.push(result.recordset);
        const sqlResult = result.recordset[0];

        if (!sqlResult) {
          throw new Error("SQL did not return result");
        }

        if (sqlResult.status === 0) {
          throw new Error(sqlResult.message);
        }
      }

      return {
        status: true,
        message: "Upload success",
        data: results,
      };
    } catch (error) {
      console.error("Service uploadExcelFile Error:", error);
      throw error;
    }
  }
}

module.exports = SettingService;
