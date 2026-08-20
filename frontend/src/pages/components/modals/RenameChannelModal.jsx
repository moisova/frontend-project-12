import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { renameChannelApi } from "../../../api/channelsApi";
import { channelValidator } from "../../../validators/channelValidator";

const RenameChannelModal = ({ show, onHide, channel }) => {
  const { t } = useTranslation();
  const renameInputRef = useRef(null);
  const [renaming, setRenaming] = useState(false);
  const channels = useSelector((state) => state.channels.channels);

  useEffect(() => {
    if (show) {
      setTimeout(() => renameInputRef.current?.focus(), 0);
    }
  }, [show]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton style={{ backgroundColor: "#344e41" }}>
        <Modal.Title className="fs-5 fw-bold" style={{ color: "#EDEDE8" }}>
          {t("modal.rename")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4" style={{ backgroundColor: "#EDEDE8" }}>
        <Formik
          enableReinitialize
          initialValues={{ name: channel?.name || "" }}
          validationSchema={channelValidator(
            channels.filter((c) => c.id !== channel?.id).map((c) => c.name),
          )}
          onSubmit={(values) => {
            if (!channel) return;
            setRenaming(true);
            renameChannelApi(channel.id, { name: values.name })
              .then(() => {
                onHide();
                toast.success(t("toast.renamed"));
              })
              .catch(() => {
                toast.error(t("toast.connectionErr"));
              })
              .finally(() => setRenaming(false));
          }}
        >
          {() => (
            <Form>
              <label htmlFor="name" className="form-label fw-semibold">
                {t("modal.newName")}
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                innerRef={renameInputRef}
                className="form-control rounded-3 border-0 shadow-sm"
              />
              <ErrorMessage
                name="name"
                render={(msg) => (
                  <div className="text-danger small mt-1">{t(msg)}</div>
                )}
              />
              <div className="d-flex justify-content-end gap-2 mt-3">
                <Button
                  variant="secondary"
                  className="rounded-3"
                  onClick={onHide}
                  disabled={renaming}
                >
                  {t("modal.cancel")}
                </Button>
                <Button
                  type="submit"
                  className="btn fw-bold rounded-3 px-4 border-0 shadow-sm"
                  style={{ backgroundColor: "#344e41", color: "#EDEDE8" }}
                  disabled={renaming}
                >
                  {t("modal.rename")}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
