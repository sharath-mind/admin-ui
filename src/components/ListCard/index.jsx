import React, { useEffect, useState, useContext } from "react";
import "./list-card.css";
import { ROLES } from "../../constants";
import { DeleteIcon, SaveIcon, EditIcon } from "../../Assets/icons";
import ErrorLable from "../Error-lable";
import AlertContext from "../../AlertContext";

const ListCard = (props) => {
  const { info, handleEditSave, handleDelete, selectedIds, setSelectedIds } =
    props;
  const initChecked = selectedIds?.find((id) => id === info.id) || false;
  const [isChecked, setIsChecked] = useState(initChecked);
  const [isEdit, setIsEdit] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [name, setName] = useState(info?.name);
  const [email, setEmail] = useState(info?.email);
  const [role, setRole] = useState(info?.role);

  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    if (selectedIds) {
      setIsChecked(selectedIds?.includes(info?.id));
    }
  }, [selectedIds]);

  const handleOnChange = (e) => {
    if (e.target.checked) {
      const tempSelectedData = [...selectedIds];
      tempSelectedData.push(info.id);
      setSelectedIds(tempSelectedData);
    } else {
      const tempSelectedData = [...selectedIds];
      const id = tempSelectedData?.findIndex((id) => id === info.id);
      tempSelectedData.splice(id, 1);
      setSelectedIds(tempSelectedData);
    }
  };

  const handleEdit = () => {
    if (isChecked) return;
    setIsEdit(true);
  };

  const validateData = () => {
    let hasError = false;
    if (!name) {
      setNameError("Please enter Name");
      hasError = true;
    } else if (name.length < 3) {
      setNameError("Please enter atleast 3 characters");
      hasError = true;
    } else setNameError(false);

    const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!email) {
      setEmailError("Please enter Email");
      hasError = true;
    } else if (!email.match(emailFormat)) {
      setEmailError("Please enter valid email address");
      hasError = true;
    } else setEmailError(false);
    return hasError;
  };

  const handleSave = (id) => {
    const hasError = validateData();
    if (hasError) return;
    const payload = { name, email, role };
    setIsEdit(false);
    handleEditSave(id, payload);
  };

  const onDelete = (id) => {
    if (isChecked) return;
    const alertHeader = "Deleting User";
    const alertMessage = `Are you sure to delete user <strong>${info?.name}</strong>`;
    showAlert(alertHeader, alertMessage, () => handleDelete(id));
  };

  return (
    <>
      <div className={"list-container" + (isChecked ? " selected" : "")}>
        <div className="check-box">
          <input
            type="checkbox"
            id={`checkbox-${info.id}`}
            value={info.id}
            checked={isChecked}
            onChange={handleOnChange}
            disabled={isEdit}
          />
        </div>
        <div className="name" data-info={!isEdit && name}>
          <div className="mobile-view"> Name: </div>
          {isEdit ? (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError ? "true" : false}
                id="user-name"
              />
              {nameError && (
                <ErrorLable message={nameError} forName="user-name" />
              )}
            </>
          ) : (
            info?.name
          )}
        </div>
        <div className="email" data-info={!isEdit && email}>
          <div className="mobile-view"> Email:</div>
          {isEdit ? (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="user-email"
                error={emailError ? "true" : false}
              />
              {emailError && (
                <ErrorLable message={emailError} forName="user-email" />
              )}
            </>
          ) : (
            info?.email
          )}
        </div>
        <div className="roles">
          <div className="mobile-view"> Roles:</div>
          {isEdit ? (
            <select
              id="roles"
              name="roles"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {ROLES.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
          ) : (
            info?.role
          )}
        </div>
        <div>
          <div className="mobile-view"> Actions</div>
          <div className="action-btns">
            {!isEdit ? (
              <div onClick={handleEdit} disabled={isChecked} title="Edit">
                <EditIcon />
              </div>
            ) : (
              <div onClick={() => handleSave(info.id)} title="Save">
                <SaveIcon />
              </div>
            )}
            <div
              onClick={() => onDelete(info.id)}
              disabled={isChecked}
              title="Delete"
            >
              <DeleteIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListCard;
