import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Dialog from "./Dialog";
import { Spinner } from "react-bootstrap";

const SaveAnalysisDialog = props => {
  const { t } = useTranslation();
  const [selectedGroup, setSelectedGroup] = useState(
    props.groups ? props.groups[0] : null
  );

  return (
    <Dialog
      isOpen={props.isOpen}
      onClose={props.onClose}
      onAction={() => props.onSave(selectedGroup)}
      title={t("DIALOG.SAVE_ANALYSIS")}
      cancelTitle={t("CANCEL")}
      actionTitle={t("YES")}
    >
      <p>{t("GROUP")}</p>
      <div className="dropdown">
        {!props.groups?.length ? (
          <Spinner
            animation="border"
            role="status"
            variant="dark"
            style={{ margin: "0 auto 15px", display: "block" }}
          />
        ) : (
          <select
            className="form-control"
            onChange={newSelect => {
              setSelectedGroup(
                props.groups.find(item => item.name === newSelect.target.value)
              );
            }}
          >
            {props.groups.map(item => {
              const name = item.isDefault
                ? t(`GROUP_NAMES.${item.name}`)
                : item.name;
              return (
                <option key={item.name} value={item.name}>
                  {name}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <p>
        <small>{t("DIALOG.CHOOSE_GROUP")}</small>
      </p>
    </Dialog>
  );
};

SaveAnalysisDialog.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

SaveAnalysisDialog.defaultProps = {
  isOpen: false
};

export default SaveAnalysisDialog;
