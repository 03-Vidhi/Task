import customerModel from "../model/customerModel.js";

export const getData = async (req, res) => {
  try {
    const data = await customerModel.find({});
    res.status(200).send({
      success: true,
      data: data,
      message: "ALL data is fetched",
    });
  } catch (err) {
    console.error(err);

    res.status(500).send({
      success: false,
      data: "Failed in getting the data",
      message: err.message,
    });
  }
};

export const createData = async (req, res) => {
  try {
    const { title, description } = req.body;

    const response = await customerModel.create({ title, description });

    res.status(200).send({
      success: true,
      data: response,
      message: "Entry created successfully",
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).send({
      success: false,
      data: "Error while creating the data",
      message: err.message,
    });
  }
};

export const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const data = await customerModel.findByIdAndUpdate(
      { _id: id },
      { title, description,  updatedAt: Date.now() },
      { new: true }
    );

    res.status(200).send({
      success: true,
      data: data,
      message: `Updated Successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      error: err.message,
      message: "Error in updating the data",
    });
  }
};

export const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    await customerModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in deleting the data",
    });
  }
};
