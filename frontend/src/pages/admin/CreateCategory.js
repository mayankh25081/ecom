import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/v1/category/create-category`,
        {
          name,
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`,{duration: 5000});
        getAllCategory();
        setName("");
      } else {
        toast.error(data.message,{duration: 5000});
      }
    } catch (error) {
      console.log(error);
      // toast.error("somthing went wrong in input form");
    }
  };

  // get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/category/all-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory",{duration: 5000});
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  // update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
        toast.success(data.message,{duration: 5000});
      } else {
        toast.error(data.error,{duration: 5000});
      }
    } catch (error) {
      toast.error("something went wrong",{duration: 5000});
    }
  };
  // delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(data.message,{duration: 5000});
        getAllCategory();
      } else {
        toast.error(data.error,{duration: 5000});
      }
    } catch (error) {
      // toast.error('something went wrong')
    }
  };

  return (
    <Layout title={"Dashboard - Create category"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-4 col-lg-3">
            <AdminMenu />
          </div>
          <div className="col-md-8 col-lg-9">
            <h1>Manage categories</h1>
            <div className="p-3">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button className="btn btn-danger ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button className="btn btn-outline-dark ms-2" onClick={() => {handleDelete(c._id);}}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              visible={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
