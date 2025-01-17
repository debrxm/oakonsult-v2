import React, { useState } from "react";
import { Ionicons } from "react-web-vector-icons";
import CustomInput from "../../CustomInput/CustomInput";
import CustomPopUp from "../../CustomPopUp/CustomPopUp";
import Spacing from "../../Spacing/Spacing";
import Spinner from "../../Spinner/Spinner";
import { useSelector } from "react-redux";
import CustomButton from "../../CustomButton/CustomButton";
import { colors } from "../../../constants/Colors";
import { OnEditEvent } from "../../../firebase/firestore";

import "./styles.scss";
const EditEvent = ({ data, setDialogVisible }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [url, setUrl] = useState(data.url || "");
  const [date, setDate] = useState(data.date);
  const [errorMessage, setErrorMessage] = useState("");
  const CleanUp = () => {
    setLoading(false);
    setDialogVisible(false);
  };
  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const timestring = new Date(date).getTime();
    const eventData = {
      name,
      description,
      date,
      timestring,
      imageUrl: "",
      url,
    };
    if (name.trim() === "" || description.trim() === "") {
      setLoading(false);
      setErrorMessage(`Some input(s) are empty`);
      return;
    }
    try {
      OnEditEvent(eventData, CleanUp);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <Spinner style={{ height: "20vh" }} />
      ) : (
        <div className="flex-center add-category">
          <div className="flex-vertical-center add-category-head">
            <span>New Event</span>
            <div
              className="flex-center close-icon"
              onClick={() => setDialogVisible(false)}
            >
              <Ionicons name="md-close" size={20} color={colors.white} />
            </div>
          </div>
          <Spacing height="2em" />
          {errorMessage !== "" ? (
            <CustomPopUp
              message={`${errorMessage}`}
              type={"error"}
              customStyles={{ backgroundColor: "red" }}
              customTextStyles={{ color: "#ffffff", textAlign: "center" }}
            />
          ) : null}
          <Spacing height="2em" />
          <CustomInput
            label="Event Name"
            value={name}
            type={"text"}
            onChange={({ target }) => setName(target.value)}
            required
          />
          <CustomInput
            label="Event Description"
            value={description}
            type={"text"}
            onChange={({ target }) => setDescription(target.value)}
            required
          />
          <CustomInput
            label="Event Url"
            value={url}
            type={"text"}
            onChange={({ target }) => setUrl(target.value)}
          />
          <CustomInput
            label="Event Date"
            value={date}
            type={"date"}
            onChange={({ target }) => setDate(target.value)}
            required
          />
          <Spacing height="2em" />
          <CustomButton
            label="Update"
            onClick={onSubmit}
            className="add-category-btn"
          />
        </div>
      )}
    </>
  );
};

export default EditEvent;
