import React, {useEffect, useState} from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import {updateCategory, getCategory} from "./helper/adminapicall";

const UpdateCategory = ({match}) => {

    const { user, token } = isAutheticated();
    //const [name, setName] = useState("");
    // const [error, setError] = useState(false);
    // const [success, setSuccess] = useState(false);
    const [values,setValues] = useState({
        name:"",
        leading: false,
        error: "",
        formData:"",
        createdCategory: "",
        getaRedirect: false,
    });

    const {name,formData,createdCategory,error} = values;

    const preload = categoryId => {
        getCategory(categoryId).then(data => {
            //console.log("Products dara",data);
            if (data?.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        preload(match.params.categoryId);
    }, []);





    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
                Admin Home
            </Link>
        </div>
    );

    const onSubmit = event => {
        event.preventDefault();
        // setError("");
        // setSuccess(false);
        setValues({ ...values, error: "", loading: true });

        //backend request fired
        try {

            updateCategory(match.params.categoryId, user._id, token, formData).then(data => {

                if (data?.error) {
                    // setError(true);

                    setValues({...values, error: data.error});
                    console.log(data.error)

                } else {
                    setValues({
                        ...values,
                        name: "",
                        loading: false,
                        createdCategory: name
                    })
                }
            });
        }catch (e) {
            if(e.response && e.response._status===404)
                alert("This post has already been updated")
            else
                console.log("Logging the error",e);
                alert("An unexpected error occured")
        }
    };

    const handleChange =name=> event => {
        // setError("");
        // setName(event.target.value);
            const value = name==="photo" ? event.target.files[0] :  event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });

    };

    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: createdCategory ? "" : "none" }}
        >
            <h4>{createdCategory} updated successfully</h4>
        </div>
    );

    const warningMessage = () => (
        <div
            className="alert alert-danger mt-3"
            style={{ display: error ? "" : "none" }}
        >
            <h4>{error}</h4>
        </div>
    );
    const createdCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input
                    type="text"
                    className="form-control my-3"
                    onChange={handleChange("name")}
                    value={name}
                    name="photo"
                    autoFocus
                    required
                    placeholder="For Ex. Summer"
                />
                <button
                    onClick={onSubmit} className="btn btn-outline-info">
                    update Category
                </button>
            </div>
        </form>
    );

    return (
        <Base
            title="Update a category here"
            description="Add a new category for new tshirts"
            className="container bg-info p-4"
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {createdCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    );
};

export default UpdateCategory;
