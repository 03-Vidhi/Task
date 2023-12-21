import React, { useEffect, useState } from "react";
import "./Home.css";
import { MdClose } from "react-icons/md";
import axios from "axios";

import { toast } from 'react-hot-toast';


const Home = () => {
  const [addSection, setAddSection] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    
  });
  const [dataList, setDataList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
     setFormError(validation(formData));
    
    setIsSubmit(true);

    try {
      let data;
     
    
      if (update == false) {
        data = await axios.post(
          "http://localhost:5000/api/v1/createData",
          formData
          );
      }
      
      else{
        data = await axios.put(
          "http://localhost:5000/api/v1/updateData/" + id,
          formData
        );
      }
      console.log(data);
      if (data.data.success) {
        setAddSection(false);
        setFormData({
          title: "",
          description: "",

        });
        getData();
        if(update === true){
          toast.success("Task Updated Successfully")
          setUpdate(false);
        }else{
          toast.success("Task Added Successfully");
        }
        
        
      }
    } catch (error) {
      console.log(error);
      toast.error("Task is not added")
    }
  };
  const getData = async () => {
    try {
      const data = await axios.get("http://localhost:5000/api/v1/getData");
      console.log(data);
      if (data.data.success) {
        setDataList(data.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const data = await axios.delete(
        `http://localhost:5000/api/v1/deleteData/${id}`
      );
      if (data.data.success) {
        getData();
        toast.success("Task is Deleted")
        
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  };

  const handleUpdate = async (d) => {
    setUpdate(true);
    setId(d._id);
    setAddSection(true);
    setFormData({
      title: d.title,
      description: d.description,
     
    });
  };

  const validation = (formData) => {
    const errors = {};
   
    if (!formData.title) {
      errors.title = "Task is Required!";
    }
    if (!formData.description) {
      errors.description = "description is Required!";
    } 
    
    return errors;
  };
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      console.log(formData);
    }
  }, [formError]);
  return (
    <div className="container">
      <button className="btn btn-add" onClick={() => setAddSection(true)}>
        Add
      </button>
      {addSection && (
        <div className="addContainer">
          <form onSubmit={handleSubmit}>
            <div className="close-btn" onClick={() => setAddSection(false)}>
              <MdClose />
            </div>
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, ["title"]: e.target.value })
              }
            />
            <p className="Validation">{formError.title}</p>
            <label htmlFor="description">description: </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, ["description"]: e.target.value })
              }
            />
            <p className="Validation">{formError.description}</p>
            
            <button className="btn">Submit</button>
          </form>
        </div>
      )}
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Tasks</th>
              
                  <th></th>
            </tr>
          </thead>
          <tbody>
            {dataList[0] ? (
              dataList.map((d) => {
                
                return (
                  <tr
                 
                  >
                    <td>
                      
                    <details>
                      <summary>{d.title} </summary>
                      {d.description}</details>
                    </td>
                    
                 
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => handleUpdate(d)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(d._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <p style={{ textAlign: "center" }}>No data</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
