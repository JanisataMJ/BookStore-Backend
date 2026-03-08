const SettingService = require("../services/settingService");
const settingServiceInstance = new SettingService();
//const { sequelizeQueryDB1 } = require("../../../models");

const getSamplingProcessMaster = async (req, res, next) => {
  try {
    const queryData = {
      ...req.query,
      //scanin_by
    };
    const serviceResponse =
      await settingServiceInstance.getSamplingProcessMaster(
        queryData,
      );
    const httpStatus = serviceResponse.status ? 200 : 400;
    return res.status(httpStatus).json(serviceResponse);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Error fetching data" });
  }
};

/*const getSamplingItemMaster = async (req, res, next) => {
  try {
    const queryData = {
      ...req.query,
      //scanin_by
    };
    const serviceResponse = await settingServiceInstance.getSamplingItemMaster(
      sequelizeQueryDB1,
      queryData,
    );
    const httpStatus = serviceResponse.status ? 200 : 400;
    return res.status(httpStatus).json(serviceResponse);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Error fetching data" });
  }
};*/

const getToleranceWeight = async (req, res, next) => {
  try {
    const queryData = {
      ...req.query,
    };
    const serviceResponse =
      await settingServiceInstance.getToleranceWeight(queryData);
    const httpStatus = serviceResponse.status ? 200 : 400;
    return res.status(httpStatus).json(serviceResponse);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Error fetching data" });
  }
};

const getProductcodeAccessory = async (req, res, next) => {
  try {
    const queryData = {
      ...req.query,
    };
    const serviceResponse =
      await settingServiceInstance.getProductcodeAccessory(queryData);
    const httpStatus = serviceResponse.status ? 200 : 400;
    return res.status(httpStatus).json(serviceResponse);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Error fetching data" });
  }
};

const getProductcodeRobbery = async (req, res, next) => {
  try {
    const queryData = {
      ...req.query,
    };
    const serviceResponse =
      await settingServiceInstance.getProductcodeRobbery(queryData);
    const httpStatus = serviceResponse.status ? 200 : 400;
    return res.status(httpStatus).json(serviceResponse);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Error fetching data" });
  }
};

const putToleranceWeight = async (req, res, next) => {
  try {
    const requestData = {
      ...req.body,
    };

    const serviceResponse =
      await settingServiceInstance.putToleranceWeight(requestData);

    const responseData = Array.isArray(serviceResponse)
      ? serviceResponse[0]
      : serviceResponse;
    const httpStatus = responseData.status ? 200 : 400;
    return res.status(httpStatus).json(responseData);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Error fetching data" });
  }
};

const putProductcodeAccessory = async (req, res, next) => {
  try {
    const requestData = {
      ...req.body,
    };

    const serviceResponse =
      await settingServiceInstance.putProductcodeAccessory(requestData);

    const responseData = Array.isArray(serviceResponse)
      ? serviceResponse[0]
      : serviceResponse;
    const httpStatus = responseData.status ? 200 : 400;
    return res.status(httpStatus).json(responseData);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Error fetching data" });
  }
};

const putProductcodeRobbery = async (req, res, next) => {
  try {
    const requestData = {
      ...req.body,
    };

    const serviceResponse =
      await settingServiceInstance.putProductcodeRobbery(requestData);

    const responseData = Array.isArray(serviceResponse)
      ? serviceResponse[0]
      : serviceResponse;
    const httpStatus = responseData.status ? 200 : 400;
    return res.status(httpStatus).json(responseData);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Error fetching data" });
  }
};

const insertProductcodeAccessory = async (req, res) => {
  try {
    const serviceResponse =
      await settingServiceInstance.insertProductcodeAccessory(req.body);

    const httpStatus = serviceResponse.status ? 200 : 400;

    return res.status(httpStatus).json(serviceResponse);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      status: false,
      message: "Server error",
      data: []
    });
  }
};

const insertProductcodeAccessoryItems = async (req, res, next) => {
  try {
    const requestData = {
      ...req.body,
    };

    const serviceResponse =
      await settingServiceInstance.insertProductcodeAccessoryItems(requestData);

    const responseData = Array.isArray(serviceResponse)
      ? serviceResponse[0]
      : serviceResponse;
    const httpStatus = responseData.status ? 200 : 400;
    return res.status(httpStatus).json(responseData);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Error fetching data" });
  }
};

const insertProductcodeRobbery = async (req, res) => {
  try {
    const serviceResponse =
      await settingServiceInstance.insertProductcodeRobbery(req.body);

    const httpStatus = serviceResponse.status ? 200 : 400;

    return res.status(httpStatus).json(serviceResponse);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      status: false,
      message: "Server error",
      data: []
    });
  }
};

module.exports = {
  getSamplingProcessMaster,
  //getSamplingItemMaster,
  getToleranceWeight,
  getProductcodeAccessory,
  getProductcodeRobbery,
  putToleranceWeight,
  putProductcodeAccessory,
  putProductcodeRobbery,
  insertProductcodeAccessoryItems,
  insertProductcodeAccessory,
  insertProductcodeRobbery,
};
