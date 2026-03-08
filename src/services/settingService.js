const { mssql, mssqlConfig } = require("../config/db");

class SettingService {

   async getSamplingProcessMaster(datareq) {
    try {
      const pool = await mssql.connect(mssqlConfig);
      const results = await pool.request().query(
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
}

module.exports = SettingService;
